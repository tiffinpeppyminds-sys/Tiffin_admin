"use client";

import { useMemo, useState } from "react";
import { ArrowDownAZ, ArrowUpAZ, ChevronDown, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { bodyMuted, pageTitle } from "@/lib/typography";
import { cn } from "@/lib/utils";

type FilterOption<T> = {
  label: string;
  value: string;
  predicate: (item: T) => boolean;
};

type ModuleColumn<T> = {
  key: keyof T;
  label: string;
  sortable?: boolean;
  className?: string;
  render?: (item: T) => React.ReactNode;
};

type ModuleTableProps<T extends Record<string, string | number>> = {
  title: string;
  description: string;
  data: T[];
  columns: ModuleColumn<T>[];
  searchPlaceholder?: string;
  filterOptions?: FilterOption<T>[];
};

export function ModuleTable<T extends Record<string, string | number>>({
  title,
  description,
  data,
  columns,
  searchPlaceholder = "Search...",
  filterOptions,
}: ModuleTableProps<T>) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const normalizedQuery = query.trim().toLowerCase();

  const visibleRows = useMemo(() => {
    const filtered = data.filter((item) => {
      const searchMatch =
        normalizedQuery.length === 0 ||
        columns.some((column) => String(item[column.key]).toLowerCase().includes(normalizedQuery));

      const selectedFilter = filterOptions?.find((option) => option.value === activeFilter);
      const filterMatch = !selectedFilter || selectedFilter.predicate(item);

      return searchMatch && filterMatch;
    });

    if (!sortKey) {
      return filtered;
    }

    return [...filtered].sort((a, b) => {
      const valueA = a[sortKey];
      const valueB = b[sortKey];

      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortDirection === "asc" ? valueA - valueB : valueB - valueA;
      }

      const textA = String(valueA).toLowerCase();
      const textB = String(valueB).toLowerCase();

      if (textA === textB) return 0;
      const order = textA > textB ? 1 : -1;
      return sortDirection === "asc" ? order : -order;
    });
  }, [activeFilter, columns, data, filterOptions, normalizedQuery, sortDirection, sortKey]);

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
      return;
    }

    setSortKey(key);
    setSortDirection("asc");
  };

  const hasActiveControls = query.length > 0 || activeFilter !== "all" || sortKey !== null;

  return (
    <section className="space-y-5">
      <div>
        <h1 className={pageTitle}>{title}</h1>
        <p className={cn("mt-1", bodyMuted)}>{description}</p>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative md:max-w-sm md:flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-neutral-500" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={searchPlaceholder}
            className="uem-search"
          />
        </div>
        {filterOptions && filterOptions.length > 0 ? (
          <div className="relative">
            <select
              value={activeFilter}
              onChange={(event) => setActiveFilter(event.target.value)}
              className="h-11 w-full cursor-pointer appearance-none rounded-full bg-[#f6f6f6] py-2.5 pl-4 pr-10 text-sm font-semibold text-black outline-none md:w-56"
            >
              <option value="all">All</option>
              {filterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-neutral-500" />
          </div>
        ) : null}
        <div className="md:ml-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setQuery("");
              setActiveFilter("all");
              setSortKey(null);
              setSortDirection("asc");
            }}
            disabled={!hasActiveControls}
          >
            <X className="mr-1.5 size-3.5" />
            Reset
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-200">
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={cn(
                    "px-0 py-3 pr-6 text-left text-sm font-bold text-black last:pr-0",
                    column.className,
                  )}
                >
                  {column.sortable ? (
                    <button
                      type="button"
                      onClick={() => handleSort(column.key)}
                      className="inline-flex items-center gap-1 text-left transition-colors hover:opacity-70"
                    >
                      {column.label}
                      {sortKey === column.key ? (
                        sortDirection === "asc" ? (
                          <ArrowUpAZ className="size-3.5" />
                        ) : (
                          <ArrowDownAZ className="size-3.5" />
                        )
                      ) : (
                        <ArrowDownAZ className="size-3.5 opacity-30" />
                      )}
                    </button>
                  ) : (
                    column.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((item, index) => (
              <tr key={`${String(item[columns[0].key])}-${index}`} className="border-b border-neutral-200">
                {columns.map((column) => (
                  <td key={String(column.key)} className={cn("py-4 pr-6 text-sm text-black last:pr-0", column.className)}>
                    {column.render ? column.render(item) : String(item[column.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-neutral-500">
        Showing {visibleRows.length} of {data.length}
      </p>
    </section>
  );
}
