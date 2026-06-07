"use client";

import { useState } from "react";
import { ChevronRight, MoreVertical, Pencil, Plus, X } from "lucide-react";
import { MenuSearch } from "@/components/menu/shared";
import { customisationsList } from "@/lib/menu-data";
import { cn } from "@/lib/utils";

export default function CustomisationsPage() {
  const [selected, setSelected] = useState<string | null>(customisationsList[0]?.id ?? null);
  const [showModal, setShowModal] = useState(false);

  const selectedItem = customisationsList.find((item) => item.id === selected);

  return (
    <>
      <div className="flex min-h-[560px] overflow-hidden rounded-2xl border border-neutral-200 bg-white">
        <div className="w-full max-w-[420px] shrink-0 border-r border-neutral-100 p-5 lg:max-w-[38%]">
          <MenuSearch placeholder="Search customisations" pill />
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-black px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
          >
            <Plus className="size-4" />
            Create customisation
          </button>
          <div className="mt-3">
            {customisationsList.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelected(item.id)}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl px-3 py-4 text-left transition-colors",
                  selected === item.id
                    ? "bg-[#f6f6f6] ring-1 ring-inset ring-neutral-200"
                    : "hover:bg-[#fafafa]",
                )}
              >
                <div>
                  <p className="font-semibold text-black">{item.name}</p>
                  <p className="text-sm text-neutral-500">{item.options} options</p>
                </div>
                <ChevronRight className={cn("size-4", selected === item.id ? "text-black" : "text-neutral-400")} />
              </button>
            ))}
          </div>
        </div>

        <div className="hidden flex-1 lg:block">
          {selectedItem ? (
            <div className="space-y-6 p-8">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="rounded-full bg-[#f6f6f6] px-3 py-1.5 text-sm font-medium text-black hover:bg-[#eeeeee]"
                >
                  ← Back
                </button>
                <button type="button" className="rounded-full p-2 text-neutral-500 hover:bg-[#f6f6f6] hover:text-black">
                  <MoreVertical className="size-5" />
                </button>
              </div>

              <div>
                <h2 className="page-title-lg">Customisations</h2>
                <p className="mt-1 text-sm text-neutral-500">Manage options customers can add to items.</p>
              </div>

              <div className="rounded-2xl bg-[#f6f6f6] p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-black">Customer instructions</p>
                    <p className="mt-1 text-sm text-neutral-600">{selectedItem.name}</p>
                  </div>
                  <button type="button" className="rounded-lg p-2 text-neutral-500 hover:bg-white hover:text-black">
                    <Pencil className="size-4" />
                  </button>
                </div>
              </div>

              {[
                {
                  title: "Edit options",
                  desc: "Manage which options are available to customers in this set.",
                },
                { title: "Add to items", desc: null },
                { title: "Customisation rules", desc: "Set limits for customising items." },
              ].map((row) => (
                <button
                  key={row.title}
                  type="button"
                  className="flex w-full items-center justify-between rounded-xl border border-neutral-200 px-5 py-4 text-left transition-colors hover:bg-[#fafafa]"
                >
                  <div>
                    <p className="text-sm font-semibold text-black">{row.title}</p>
                    {row.desc ? <p className="mt-1 text-sm text-neutral-500">{row.desc}</p> : null}
                  </div>
                  <ChevronRight className="size-4 text-neutral-400" />
                </button>
              ))}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-neutral-500">Select a customisation to edit details</p>
            </div>
          )}
        </div>
      </div>

      {showModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-black">Create customisation</h2>
                <p className="mt-1 text-sm text-neutral-500">Create a set of options to add to items.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-full p-1.5 text-neutral-500 hover:bg-[#f6f6f6] hover:text-black"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="mt-6 space-y-5">
              <div>
                <label className="text-sm font-semibold text-black">Customer instructions</label>
                <input type="text" className="auth-input mt-2" placeholder="e.g. Add Sides" />
              </div>
              <div>
                <label className="text-sm font-semibold text-black">Notes</label>
                <textarea
                  rows={3}
                  placeholder="Enter notes"
                  className="mt-2 w-full resize-none rounded-xl bg-[#f6f6f6] px-4 py-3 text-sm outline-none focus:shadow-[0_0_0_1px_#cccccc]"
                />
                <p className="mt-2 text-xs text-neutral-500">Internal only — not visible to customers.</p>
              </div>
            </div>
            <div className="mt-8 flex justify-end gap-4">
              <button type="button" onClick={() => setShowModal(false)} className="text-sm font-medium text-black hover:underline">
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-full bg-black px-6 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
