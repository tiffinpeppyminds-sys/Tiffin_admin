"use client";

import { useEffect, useState } from "react";
import { FirebaseError } from "firebase/app";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SUPERADMIN_EMAIL, SUPERADMIN_PASSWORD } from "@/lib/auth/constants";
import { getFirebaseClient, isFirebaseConfigured } from "@/lib/firebase/client";

export default function LoginPage() {
  const firebaseConfigured = isFirebaseConfigured();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!firebaseConfigured) {
      return () => undefined;
    }

    const { auth } = getFirebaseClient();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/dashboard");
      }
    });
    return unsubscribe;
  }, [firebaseConfigured, router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError(null);
    setIsSubmitting(true);

    try {
      if (!firebaseConfigured) {
        setError("Firebase is not configured.");
        return;
      }

      const { auth } = getFirebaseClient();
      const credential = await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
      const token = await credential.user.getIdTokenResult(true);

      if (email.trim().toLowerCase() === SUPERADMIN_EMAIL && token.claims.role !== "super_admin") {
        setError("Super Admin account exists but missing role claim. Assign role: super_admin.");
        return;
      }

      router.replace("/dashboard");
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError("Invalid credentials or admin not granted by Super Admin.");
      } else {
        setError("Unable to sign in right now. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl items-center px-4 py-12">
      <Card className="w-full overflow-hidden border border-blue-100/70 shadow-xl dark:border-slate-700">
        <div className="grid lg:grid-cols-[1fr_1.1fr]">
          <section className="premium-gradient p-8 text-white lg:p-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em]">
              <ShieldCheck className="size-3.5" />
              Tiffin Finder Admin
            </div>
            <h1 className="heading-classic text-4xl font-semibold leading-tight">Secure operations, classic control.</h1>
            <p className="mt-3 text-sm text-blue-100">
              Sign in to manage providers, complaints, orders, reports, and platform governance from one dashboard.
            </p>
            <div className="mt-8 space-y-3 text-sm">
              <div className="rounded-xl border border-white/25 bg-white/10 p-3">
                - Super Admin access with centralized role governance
              </div>
              <div className="rounded-xl border border-white/25 bg-white/10 p-3">
                - Real-time operational visibility and quality controls
              </div>
              <div className="rounded-xl border border-white/25 bg-white/10 p-3">
                - Audit-ready workflow for support and compliance teams
              </div>
            </div>
          </section>

          <section className="bg-white p-7 dark:bg-slate-950 lg:p-10">
            <CardHeader className="flex-col items-start gap-2 px-0 pt-0">
              <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-blue-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300">
                <ShieldCheck className="size-4" />
                Secure Admin Login
              </div>
              <CardTitle className="text-3xl">Welcome back</CardTitle>
              <CardDescription>Only authorized admins can access platform controls.</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 px-0 pb-0">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-1.5">
                  <label htmlFor="admin-email" className="text-xs font-semibold uppercase tracking-[0.12em] text-black">
                    Admin Email
                  </label>
                  <Input
                    id="admin-email"
                    placeholder="name@tiffinfinder.com"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="admin-password" className="text-xs font-semibold uppercase tracking-[0.12em] text-black">
                    Password
                  </label>
                  <Input
                    id="admin-password"
                    placeholder="Enter your password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                </div>
                <Button className="w-full" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Signing in..." : "Sign In to Dashboard"}
                </Button>
              </form>

              {error ? (
                <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-center text-xs font-medium text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
                  {error}
                </p>
              ) : null}
              {!firebaseConfigured ? (
                <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-center text-xs font-medium text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
                  Firebase is not configured. Add NEXT_PUBLIC_FIREBASE_* values to `.env.local`.
                </p>
              ) : null}
              <p className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-center text-xs font-medium text-blue-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300">
                Super Admin default login: {SUPERADMIN_EMAIL} / {SUPERADMIN_PASSWORD}
              </p>
              <p className="text-center text-xs text-black dark:text-slate-400">
                Super Admin can create and manage additional admins from the Admins module.
              </p>
            </CardContent>
          </section>
        </div>
      </Card>
    </main>
  );
}
