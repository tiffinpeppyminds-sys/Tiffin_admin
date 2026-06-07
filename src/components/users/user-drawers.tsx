"use client";

import type { ReactNode } from "react";
import { ChevronDown, MoreVertical, X } from "lucide-react";
import type { ManagerUser } from "@/lib/users-data";
import { userRoles } from "@/lib/users-data";
import { cn } from "@/lib/utils";

type DrawerShellProps = {
  title?: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  wide?: boolean;
};

function DrawerShell({ title, onClose, children, footer, wide }: DrawerShellProps) {
  return (
    <>
      <button
        type="button"
        className="fixed inset-y-0 left-0 right-0 top-14 z-40 bg-black/20 lg:left-64"
        onClick={onClose}
        aria-label="Close drawer"
      />
      <aside
        className={cn(
          "fixed right-0 top-14 z-50 flex h-[calc(100vh-3.5rem)] w-full flex-col border-l border-neutral-200 bg-white shadow-[-8px_0_24px_rgba(0,0,0,0.08)]",
          wide ? "max-w-[480px]" : "max-w-[420px]",
        )}
      >
        {title ? (
          <div className="flex items-center justify-between px-6 py-5">
            <h2 className="text-xl font-bold text-black">{title}</h2>
            <button type="button" onClick={onClose} className="rounded-full p-1.5 hover:bg-neutral-100" aria-label="Close">
              <X className="size-5 text-black" />
            </button>
          </div>
        ) : null}
        <div className="flex-1 overflow-y-auto px-6 pb-6">{children}</div>
        {footer ? <div className="border-t border-neutral-200 px-6 py-4">{footer}</div> : null}
      </aside>
    </>
  );
}

function AccessDetailsForm({ role, scope, showPlaceholders }: { role: string; scope: string; showPlaceholders?: boolean }) {
  return (
    <div className="space-y-4 rounded-xl border border-neutral-200 p-4">
      <div>
        <label className="text-sm font-semibold text-black">Role</label>
        <div className="relative mt-2">
          <select
            defaultValue={role || ""}
            className="w-full appearance-none rounded-lg bg-[#f6f6f6] px-4 py-3 text-sm text-black outline-none"
          >
            <option value="">{showPlaceholders ? "Select role" : "Select role"}</option>
            {userRoles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-neutral-500" />
        </div>
      </div>
      <div>
        <label className="text-sm font-semibold text-black">Scope</label>
        <input
          type="text"
          readOnly
          defaultValue={scope}
          className="mt-2 w-full rounded-lg bg-[#f6f6f6] px-4 py-3 text-sm text-neutral-600 outline-none"
        />
      </div>
      <button type="button" className="rounded-full border border-neutral-300 px-4 py-1.5 text-sm font-medium text-black hover:bg-neutral-50">
        Remove
      </button>
    </div>
  );
}

export function UserDetailDrawer({
  user,
  onClose,
  onEdit,
}: {
  user: ManagerUser | null;
  onClose: () => void;
  onEdit: () => void;
}) {
  if (!user) return null;

  return (
    <DrawerShell onClose={onClose}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1 pt-1">
          <p className="text-[22px] font-bold leading-tight text-black">{user.name}</p>
          <p className="mt-1 text-sm text-neutral-600">{user.email}</p>
          <span className="mt-3 inline-block rounded-full bg-[#06c167] px-3 py-1 text-xs font-semibold text-white">
            Active
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={onEdit}
            className="rounded-full border border-neutral-300 px-4 py-1.5 text-sm font-medium text-black hover:bg-neutral-50"
          >
            Edit
          </button>
          <button type="button" className="rounded-full border border-neutral-300 p-2 text-neutral-500 hover:bg-neutral-50">
            <MoreVertical className="size-4" />
          </button>
          <button type="button" onClick={onClose} className="p-1.5 text-neutral-500 hover:text-black" aria-label="Close">
            <X className="size-5" />
          </button>
        </div>
      </div>

      <div className="mt-8 border-t border-neutral-200 pt-6">
        <h3 className="text-sm font-bold text-black">Access details</h3>
        <div className="mt-4 rounded-xl border border-neutral-200 p-4">
          <p className="font-semibold text-black">{user.role}</p>
          <span className="mt-2 inline-block rounded-full bg-[#f6f6f6] px-3 py-1 text-sm text-black">{user.scope}</span>
        </div>
      </div>
    </DrawerShell>
  );
}

export function EditUserDrawer({
  user,
  onClose,
  onSave,
}: {
  user: ManagerUser | null;
  onClose: () => void;
  onSave: () => void;
}) {
  if (!user) return null;

  return (
    <DrawerShell
      wide
      title="Edit User"
      onClose={onClose}
      footer={
        <div className="flex items-center justify-between">
          <button type="button" onClick={onClose} className="text-sm font-medium text-black hover:underline">
            Discard
          </button>
          <button
            type="button"
            onClick={onSave}
            className="rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white hover:bg-neutral-800"
          >
            Save
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        <div>
          <label className="text-sm font-semibold text-black">Email</label>
          <input
            type="text"
            readOnly
            defaultValue={user.email}
            className="mt-2 w-full rounded-lg bg-[#f6f6f6] px-4 py-3 text-sm text-neutral-600 outline-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-black">First name</label>
            <input
              type="text"
              defaultValue={user.firstName}
              className="mt-2 w-full rounded-lg bg-[#f6f6f6] px-4 py-3 text-sm text-black outline-none focus:ring-1 focus:ring-neutral-300"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-black">Last name</label>
            <input
              type="text"
              defaultValue={user.lastName}
              className="mt-2 w-full rounded-lg bg-[#f6f6f6] px-4 py-3 text-sm text-black outline-none focus:ring-1 focus:ring-neutral-300"
            />
          </div>
        </div>
        <div>
          <h3 className="text-sm font-bold text-black">Access details</h3>
          <div className="mt-3">
            <AccessDetailsForm role={user.role} scope={user.scope} />
          </div>
          <div className="mt-3 text-right">
            <button type="button" className="text-sm font-medium text-[#276ef1] hover:underline">
              Compare roles
            </button>
          </div>
        </div>
      </div>
    </DrawerShell>
  );
}

export function AddUserDrawer({
  open,
  scope,
  onClose,
}: {
  open: boolean;
  scope: string;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <DrawerShell
      wide
      title="Add user"
      onClose={onClose}
      footer={
        <div className="flex items-center justify-between">
          <button type="button" onClick={onClose} className="text-sm font-medium text-black hover:underline">
            Cancel
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white hover:bg-neutral-800"
          >
            Invite user
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        <div>
          <label className="text-sm font-semibold text-black">Email</label>
          <input
            type="email"
            placeholder="e.g. john@email.com"
            className="mt-2 w-full rounded-lg bg-[#f6f6f6] px-4 py-3 text-sm outline-none placeholder:text-neutral-500 focus:ring-1 focus:ring-neutral-300"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-black">First name</label>
            <input
              type="text"
              placeholder="e.g. John"
              className="mt-2 w-full rounded-lg bg-[#f6f6f6] px-4 py-3 text-sm outline-none placeholder:text-neutral-500 focus:ring-1 focus:ring-neutral-300"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-black">Last name</label>
            <input
              type="text"
              placeholder="e.g. Doe"
              className="mt-2 w-full rounded-lg bg-[#f6f6f6] px-4 py-3 text-sm outline-none placeholder:text-neutral-500 focus:ring-1 focus:ring-neutral-300"
            />
          </div>
        </div>
        <div>
          <h3 className="text-sm font-bold text-black">Access details</h3>
          <div className="mt-3">
            <AccessDetailsForm role="" scope={scope} showPlaceholders />
          </div>
          <div className="mt-3 text-right">
            <button type="button" className="text-sm font-medium text-[#276ef1] hover:underline">
              Compare roles
            </button>
          </div>
        </div>
      </div>
    </DrawerShell>
  );
}

export function RoleBadge({ role }: { role: string }) {
  return (
    <span className="inline-block rounded-md bg-[#f0f0f0] px-2.5 py-1 text-sm text-black">{role}</span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-block rounded-md px-2.5 py-1 text-sm font-medium",
        status === "Accepted" ? "bg-[#e6f7ef] text-[#06c167]" : "bg-amber-50 text-amber-700",
      )}
    >
      {status}
    </span>
  );
}
