"use client";

import { useState } from "react";
import { ChevronRight, MoreVertical, Pencil, Search, X } from "lucide-react";
import { customisationsList } from "@/lib/menu-data";
import { cn } from "@/lib/utils";

export default function CustomisationsPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const selectedItem = customisationsList.find((item) => item.id === selected);

  return (
    <>
      <div className="flex min-h-[560px]">
        <div className="w-full max-w-[58%] shrink-0 border-r border-neutral-200 pr-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search customisations"
              className="w-full rounded-full bg-[#f6f6f6] py-3 pl-10 pr-4 text-sm outline-none placeholder:text-neutral-500"
            />
          </div>
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="mt-4 rounded-full border border-neutral-300 bg-[#f6f6f6] px-4 py-2 text-sm font-medium text-black hover:bg-neutral-100"
          >
            + Create customisation
          </button>
          <div className="mt-2">
            {customisationsList.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelected(item.id)}
                className={cn(
                  "flex w-full items-center justify-between border-b border-neutral-100 py-4 text-left last:border-0",
                  selected === item.id && "bg-[#f6f6f6]",
                )}
              >
                <div>
                  <p className="font-semibold text-black">{item.name}</p>
                  <p className="text-sm text-neutral-500">{item.options} options</p>
                </div>
                <ChevronRight className="size-4 text-neutral-400" />
              </button>
            ))}
          </div>
        </div>

        <div className="hidden flex-1 lg:block">
          {selectedItem ? (
            <div className="space-y-8 px-8 pt-2">
              <div className="flex items-center justify-between">
                <button type="button" onClick={() => setSelected(null)} className="text-black hover:text-neutral-600">
                  ←
                </button>
                <button type="button" className="text-neutral-500 hover:text-black">
                  <MoreVertical className="size-5" />
                </button>
              </div>
              <h2 className="text-2xl font-bold text-black">Customisations</h2>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-black">Customer instructions</p>
                  <p className="mt-1 text-sm text-neutral-600">{selectedItem.name}</p>
                </div>
                <button type="button" className="text-neutral-500 hover:text-black">
                  <Pencil className="size-4" />
                </button>
              </div>
              <div>
                <p className="text-sm font-bold text-black">Notes</p>
                <p className="mt-1 text-sm text-neutral-500">Enter notes</p>
              </div>
              <button type="button" className="flex w-full items-center justify-between border-b border-neutral-200 py-4 text-left">
                <div>
                  <p className="text-sm font-bold text-black">Edit options</p>
                  <p className="mt-1 text-sm text-neutral-600">
                    Manage which options are available to customers in this set.
                  </p>
                </div>
                <ChevronRight className="size-4 text-neutral-400" />
              </button>
              <button type="button" className="flex w-full items-center justify-between border-b border-neutral-200 py-4 text-left">
                <p className="text-sm font-bold text-black">Add to items</p>
                <ChevronRight className="size-4 text-neutral-400" />
              </button>
              <button type="button" className="flex w-full items-center justify-between py-4 text-left">
                <div>
                  <p className="text-sm font-bold text-black">Customisation rules</p>
                  <p className="mt-1 text-sm text-neutral-600">Set limits for customising items.</p>
                </div>
                <ChevronRight className="size-4 text-neutral-400" />
              </button>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-neutral-500">Select an item to edit details</p>
            </div>
          )}
        </div>
      </div>

      {showModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-black">Create customisations</h2>
                <p className="mt-1 text-sm text-neutral-600">
                  Create a set of customised options to add to items.
                </p>
              </div>
              <button type="button" onClick={() => setShowModal(false)} className="text-neutral-500 hover:text-black">
                <X className="size-5" />
              </button>
            </div>
            <div className="mt-6 space-y-5">
              <div>
                <label className="text-sm font-semibold text-black">Customer Instructions</label>
                <input
                  type="text"
                  className="mt-2 w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-black">Notes</label>
                <textarea
                  rows={3}
                  placeholder="Enter notes"
                  className="mt-2 w-full rounded-lg bg-[#f6f6f6] px-4 py-3 text-sm outline-none"
                />
                <p className="mt-2 text-sm text-neutral-500">
                  Add context or internal names for these options. Notes won&apos;t be visible to customers.
                </p>
              </div>
            </div>
            <div className="mt-8 flex justify-end gap-5">
              <button type="button" onClick={() => setShowModal(false)} className="text-sm font-medium text-black hover:underline">
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white hover:bg-neutral-800"
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
