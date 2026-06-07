"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, MoreVertical, Search } from "lucide-react";
import {
  AddUserDrawer,
  EditUserDrawer,
  RoleBadge,
  StatusBadge,
  UserDetailDrawer,
} from "@/components/users/user-drawers";
import { managerUsers, orderManagerCredentials, userShops, type ManagerUser } from "@/lib/users-data";
import { cn } from "@/lib/utils";

const tabs = ["Tiffin Finder Manager", "Tiffin Finder Order Manager"] as const;

export default function UsersPage() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Tiffin Finder Manager");
  const [shop, setShop] = useState<string>(userShops[0]);
  const [query, setQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState("10 rows");
  const [selectedUser, setSelectedUser] = useState<ManagerUser | null>(null);
  const [drawerMode, setDrawerMode] = useState<"detail" | "edit" | "add" | null>(null);

  const drawerOpen = drawerMode !== null;

  const filteredUsers = useMemo(() => {
    if (!query.trim()) return managerUsers;
    const q = query.toLowerCase();
    return managerUsers.filter(
      (user) => user.name.toLowerCase().includes(q) || user.email.toLowerCase().includes(q),
    );
  }, [query]);

  const openDetail = (user: ManagerUser) => {
    setSelectedUser(user);
    setDrawerMode("detail");
  };

  const closeDrawer = () => {
    setDrawerMode(null);
    setSelectedUser(null);
  };

  return (
    <div className="space-y-5">
      <h1 className="page-title-lg">Users</h1>

      <div className="border-b border-neutral-200">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setActiveTab(tab);
                closeDrawer();
              }}
              className={cn("tab-link", activeTab === tab && "tab-link-active")}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "Tiffin Finder Manager" ? (
        <>
          <div className="relative inline-block">
            <select
              value={shop}
              onChange={(e) => setShop(e.target.value)}
              className="cursor-pointer appearance-none rounded-full bg-[#f6f6f6] py-2.5 pl-4 pr-10 text-sm font-semibold text-black outline-none"
            >
              {userShops.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-black" />
          </div>

          <p className="max-w-3xl text-sm leading-relaxed text-neutral-600">
            These are people with access to the shop that you can view or manage. Add, remove or edit people&apos;s access
            and roles here.{" "}
            <button type="button" className="font-bold text-black hover:underline">
              Learn more about roles.
            </button>
          </p>

          <div className="flex items-center gap-4">
            <div className="relative min-w-0 flex-1">
              <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or email"
                className="w-full rounded-full bg-[#f6f6f6] py-3 pl-11 pr-4 text-sm outline-none placeholder:text-neutral-500 focus:ring-1 focus:ring-neutral-300"
              />
            </div>
            <button
              type="button"
              onClick={() => setDrawerMode("add")}
              className="shrink-0 rounded-lg bg-black px-5 py-3 text-sm font-medium text-white hover:bg-neutral-800"
            >
              + Add user
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="pb-3 pr-6 font-semibold text-black">Name</th>
                  <th className="pb-3 pr-6 font-semibold text-black">Email</th>
                  <th className="pb-3 pr-6 font-semibold text-black">Role</th>
                  {!drawerOpen ? (
                    <>
                      <th className="pb-3 pr-6 font-semibold text-black">Status</th>
                      <th className="pb-3 w-10" />
                    </>
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className={cn(
                      "cursor-pointer border-b border-neutral-200",
                      selectedUser?.id === user.id && drawerOpen ? "bg-neutral-50" : "hover:bg-neutral-50",
                    )}
                    onClick={() => openDetail(user)}
                  >
                    <td className="py-5 pr-6 font-medium text-black">{user.name}</td>
                    <td className="py-5 pr-6 text-black">{user.email}</td>
                    <td className="py-5 pr-6">
                      {drawerOpen ? (
                        <span className="text-black">{user.role}</span>
                      ) : (
                        <RoleBadge role={user.role} />
                      )}
                    </td>
                    {!drawerOpen ? (
                      <>
                        <td className="py-5 pr-6">
                          <StatusBadge status={user.status} />
                        </td>
                        <td className="py-5">
                          <button
                            type="button"
                            onClick={(e) => e.stopPropagation()}
                            className="rounded-full p-1.5 text-neutral-500 hover:bg-neutral-100"
                          >
                            <MoreVertical className="size-4" />
                          </button>
                        </td>
                      </>
                    ) : null}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between gap-4 pt-1">
            <div className="relative">
              <select
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(e.target.value)}
                className="cursor-pointer appearance-none rounded-lg border border-neutral-300 bg-white py-2 pl-3 pr-8 text-sm font-medium text-black outline-none"
              >
                <option>10 rows</option>
                <option>25 rows</option>
                <option>50 rows</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 size-4 -translate-y-1/2 text-neutral-500" />
            </div>
            <div className="flex items-center gap-6 text-sm font-medium">
              <button type="button" disabled className="inline-flex items-center gap-1 text-neutral-300">
                <ChevronLeft className="size-4" />
                Previous
              </button>
              <button type="button" className="inline-flex items-center gap-1 text-black hover:underline">
                Next
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="relative inline-block">
            <select
              value={shop}
              onChange={(e) => setShop(e.target.value)}
              className="cursor-pointer appearance-none rounded-full bg-[#f6f6f6] py-2.5 pl-4 pr-10 text-sm font-semibold text-black outline-none"
            >
              {userShops.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-black" />
          </div>

          <p className="max-w-3xl text-sm leading-relaxed text-neutral-600">
            View your username or update the password for your Tiffin Finder Order Manager app and tablet. Each store has
            its own login credentials; please switch stores to see the login info of a particular store.
          </p>

          <div className="max-w-4xl">
            <p className="border-b border-neutral-200 pb-3 text-sm font-semibold text-black">Username</p>
            <div className="flex items-center justify-between border-b border-neutral-200 py-5">
              <span className="text-sm text-black">{orderManagerCredentials[shop] ?? "—"}</span>
              <button type="button" className="text-sm font-medium text-[#06c167] hover:underline">
                Reset password
              </button>
            </div>
          </div>
        </>
      )}

      {drawerMode === "detail" ? (
        <UserDetailDrawer user={selectedUser} onClose={closeDrawer} onEdit={() => setDrawerMode("edit")} />
      ) : null}
      {drawerMode === "edit" ? (
        <EditUserDrawer user={selectedUser} onClose={closeDrawer} onSave={closeDrawer} />
      ) : null}
      <AddUserDrawer open={drawerMode === "add"} scope={shop} onClose={closeDrawer} />
    </div>
  );
}
