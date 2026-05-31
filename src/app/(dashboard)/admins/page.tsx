"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, KeyRound, ShieldCheck, UserRoundPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ModuleTable } from "@/components/ui/module-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseClient, isFirebaseConfigured } from "@/lib/firebase/client";

type AdminRow = {
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
  access: string;
};

function toRow(admin: AdminAccount): AdminRow {
  return {
    name: admin.name,
    email: admin.email,
    role: admin.roleLabel,
    status: admin.status,
    lastLogin: admin.lastLogin,
    access:
      admin.accessModules.length <= 3
        ? admin.accessModules.join(", ")
        : `${admin.accessModules.slice(0, 3).join(", ")} +${admin.accessModules.length - 3} more`,
  };
}

type AdminAccount = {
  id: string;
  name: string;
  email: string;
  roleLabel: string;
  status: "Active" | "On Leave";
  accessModules: string[];
  lastLogin: string;
};

const accessModules = [
  "Dashboard",
  "Admins",
  "Providers",
  "Customers",
  "Orders",
  "Complaints",
  "Reports",
  "Notifications",
  "App Feature Map",
] as const;

export default function AdminsPage() {
  const firebaseConfigured = isFirebaseConfigured();
  const [idToken, setIdToken] = useState<string | null>(null);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [admins, setAdmins] = useState<AdminRow[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("Ops Admin");
  const [error, setError] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState<string | null>(
    firebaseConfigured ? null : "Firebase is not configured.",
  );
  const [selectedAccess, setSelectedAccess] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(accessModules.map((module) => [module, module === "Dashboard"])),
  );

  const selectedModules = useMemo(
    () => accessModules.filter((module) => selectedAccess[module]),
    [selectedAccess],
  );

  const accessSummary = useMemo(() => {
    if (selectedModules.length === 0) return "No access selected";
    if (selectedModules.length <= 3) return selectedModules.join(", ");
    return `${selectedModules.slice(0, 3).join(", ")} +${selectedModules.length - 3} more`;
  }, [selectedModules]);

  const accessPercent = Math.round((selectedModules.length / accessModules.length) * 100);

  useEffect(() => {
    if (!firebaseConfigured) {
      return () => undefined;
    }

    const { auth } = getFirebaseClient();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;
      const tokenResult = await user.getIdTokenResult(true);
      setIdToken(tokenResult.token);
      setIsSuperAdmin(tokenResult.claims.role === "super_admin");
    });
    return unsubscribe;
  }, [firebaseConfigured]);

  useEffect(() => {
    const loadAdmins = async () => {
      if (!idToken) return;
      try {
        const response = await fetch("/api/admins", {
          headers: { Authorization: `Bearer ${idToken}` },
        });
        const payload = (await response.json()) as { admins?: AdminAccount[]; error?: string };

        if (!response.ok) {
          setError(payload.error ?? "Unable to load admin accounts.");
          return;
        }

        setAdmins((payload.admins ?? []).map(toRow));
        setSyncStatus("Synced with Firebase cloud.");
      } catch {
        setSyncStatus("Cloud sync unavailable.");
      }
    };

    loadAdmins();
  }, [idToken]);

  const handleCreateAdmin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSyncStatus(null);

    if (!isSuperAdmin) {
      setError("Only Super Admin can create admin accounts.");
      return;
    }
    if (!idToken) {
      setError("Missing auth session. Please login again.");
      return;
    }

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (selectedModules.length === 0) {
      setError("Select at least one module access.");
      return;
    }

    const displayName = fullName.trim() || email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

    try {
      const response = await fetch("/api/admins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          name: displayName,
          email: email.trim(),
          password,
          roleLabel: role,
          accessModules: selectedModules,
        }),
      });

      const payload = (await response.json()) as { admin?: AdminAccount; error?: string };
      if (!response.ok || !payload.admin) {
        setError(payload.error ?? "Unable to create admin account.");
        return;
      }

      setSyncStatus("Admin created and synced to Firebase cloud.");
      setAdmins((prev) => [toRow(payload.admin as AdminAccount), ...prev]);
      setFullName("");
      setEmail("");
      setPassword("");
      setRole("Ops Admin");
      setSelectedAccess(Object.fromEntries(accessModules.map((module) => [module, module === "Dashboard"])));
    } catch {
      setError("Unable to create admin account.");
    }
  };

  return (
    <div className="space-y-6">
      <Card className="animate-fade-in-up top-shine overflow-hidden">
        <CardHeader className="border-b border-slate-200 dark:border-slate-800">
          <CardTitle>Super Admin Creation Flow</CardTitle>
          <div className="mt-3 grid gap-2 md:grid-cols-3">
            <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-3 dark:border-blue-900 dark:bg-blue-950/30">
              <p className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.1em] text-black dark:text-slate-200">
                <UserRoundPlus className="size-3.5" />
                Step 1
              </p>
              <p className="mt-1 text-sm font-semibold text-black dark:text-slate-100">Create account credentials</p>
            </div>
            <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-3 dark:border-blue-900 dark:bg-blue-950/30">
              <p className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.1em] text-black dark:text-slate-200">
                <KeyRound className="size-3.5" />
                Step 2
              </p>
              <p className="mt-1 text-sm font-semibold text-black dark:text-slate-100">Assign module permissions</p>
            </div>
            <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-3 dark:border-blue-900 dark:bg-blue-950/30">
              <p className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.1em] text-black dark:text-slate-200">
                <ShieldCheck className="size-3.5" />
                Step 3
              </p>
              <p className="mt-1 text-sm font-semibold text-black dark:text-slate-100">Review and publish access</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          <form className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50/40 p-4 dark:border-slate-700 dark:bg-slate-900/30" onSubmit={handleCreateAdmin}>
            {!isSuperAdmin ? (
              <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-medium text-black dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
                You are logged in as Admin. Only Super Admin can create new admin credentials.
              </p>
            ) : null}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="admin-full-name" className="text-xs font-semibold uppercase tracking-[0.12em] text-black">
                  Full Name (Optional)
                </label>
                <Input
                  id="admin-full-name"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Admin full name"
                  disabled={!isSuperAdmin}
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="admin-role" className="text-xs font-semibold uppercase tracking-[0.12em] text-black">
                  Role
                </label>
                <select
                  id="admin-role"
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                  className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-black outline-none focus:border-blue-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  disabled={!isSuperAdmin}
                >
                  <option>Ops Admin</option>
                  <option>Support Admin</option>
                  <option>Compliance Admin</option>
                  <option>Growth Admin</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="admin-email" className="text-xs font-semibold uppercase tracking-[0.12em] text-black">
                  Email
                </label>
                <Input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="admin@tiffinfinder.com"
                  required
                  disabled={!isSuperAdmin}
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="admin-password" className="text-xs font-semibold uppercase tracking-[0.12em] text-black">
                  Password
                </label>
                <Input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Minimum 6 characters"
                  required
                  disabled={!isSuperAdmin}
                />
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-950/60">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-black dark:text-slate-200">
                Module Access
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {accessModules.map((module) => (
                  <label
                    key={module}
                    className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 text-sm transition-all ${
                      selectedAccess[module]
                        ? "border-blue-300 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/40"
                        : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-950"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedAccess[module]}
                      onChange={(event) =>
                        setSelectedAccess((prev) => ({
                          ...prev,
                          [module]: event.target.checked,
                        }))
                      }
                      className="h-4 w-4 rounded border-slate-300 accent-blue-700"
                      disabled={!isSuperAdmin}
                    />
                    <span className="text-black dark:text-slate-200">{module}</span>
                  </label>
                ))}
              </div>
            </div>

            {error ? (
              <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
                {error}
              </p>
            ) : null}
            {syncStatus ? (
              <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
                {syncStatus}
              </p>
            ) : null}

            <div className="flex flex-wrap gap-2 border-t border-slate-200 pt-3 dark:border-slate-700">
              <Button type="submit" disabled={!isSuperAdmin}>Create Admin</Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  setSelectedAccess(Object.fromEntries(accessModules.map((module) => [module, module !== "Admins"])))
                }
                disabled={!isSuperAdmin}
              >
                Grant Standard Access
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setSelectedAccess(Object.fromEntries(accessModules.map((module) => [module, false])))}
                disabled={!isSuperAdmin}
              >
                Clear Access
              </Button>
            </div>
          </form>

          <div className="flex h-full min-h-[420px] flex-col rounded-xl border border-blue-100 bg-gradient-to-b from-blue-50/70 to-white p-4 shadow-sm dark:border-blue-900/60 dark:from-blue-950/25 dark:to-slate-950/40">
            <p className="heading-classic text-lg font-semibold text-black dark:text-slate-100">Access Preview</p>
            <p className="text-sm text-black dark:text-slate-300">
              New admin will be created as <span className="font-semibold">{role}</span> with module permissions below.
            </p>
            <div className="mt-3 rounded-xl border border-blue-200 bg-white p-3 dark:border-blue-900 dark:bg-slate-950/60">
              <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.1em] text-black dark:text-slate-300">
                <span>Access Coverage</span>
                <span>{accessPercent}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800">
                <div className="h-2 rounded-full bg-gradient-to-r from-blue-700 to-blue-500" style={{ width: `${accessPercent}%` }} />
              </div>
              <p className="mt-2 text-xs text-black dark:text-slate-400">
                {selectedModules.length} of {accessModules.length} modules enabled
              </p>
            </div>
            <div className="mt-3 grid flex-1 grid-cols-2 gap-2">
              {accessModules.map((module) => {
                const enabled = selectedAccess[module];
                return (
                  <div
                    key={module}
                    className={`rounded-lg border px-2.5 py-2 text-xs font-semibold transition-all ${
                      enabled
                        ? "border-blue-200 bg-blue-100 text-blue-800 dark:border-blue-900 dark:bg-blue-950/60 dark:text-blue-200"
                        : "border-slate-200 bg-white text-black/70 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
                    }`}
                  >
                    {module}
                  </div>
                );
              })}
            </div>
            <div className="mt-3 rounded-lg border border-blue-200 bg-white/80 p-2.5 dark:border-blue-900 dark:bg-slate-950/60">
              <p className="text-xs text-black dark:text-slate-400">
                Permission summary: <span className="font-semibold">{accessSummary}</span>
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {selectedModules.map((module) => (
                  <Badge key={module} variant="default">
                    {module}
                  </Badge>
                ))}
              </div>
              {selectedModules.length > 0 ? (
                <p className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="size-3.5" />
                  Ready to create admin profile
                </p>
              ) : null}
            </div>
          </div>
        </CardContent>
      </Card>

      <ModuleTable
        title="Admin Access Management"
        description="Super Admin can add, suspend, and review admin account activity."
        data={admins}
        searchPlaceholder="Search admin by name, email, role..."
        filterOptions={[
          { label: "Active", value: "active", predicate: (admin) => admin.status === "Active" },
          { label: "On Leave", value: "on_leave", predicate: (admin) => admin.status === "On Leave" },
          { label: "Super Admin", value: "super_admin", predicate: (admin) => admin.role === "Super Admin" },
        ]}
        columns={[
          { key: "name", label: "Name", sortable: true, className: "min-w-44" },
          { key: "email", label: "Email", sortable: true, className: "min-w-64" },
          {
            key: "role",
            label: "Role",
            sortable: true,
            render: (admin) => <Badge variant={admin.role === "Super Admin" ? "default" : "muted"}>{admin.role}</Badge>,
          },
          {
            key: "status",
            label: "Status",
            sortable: true,
            render: (admin) => <Badge variant={admin.status === "Active" ? "success" : "warning"}>{admin.status}</Badge>,
          },
          { key: "access", label: "Access", sortable: true, className: "min-w-64" },
          { key: "lastLogin", label: "Last Login", sortable: true },
        ]}
      />
    </div>
  );
}
