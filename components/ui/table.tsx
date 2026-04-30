"use client";

import * as React from "react";
import { ArrowUpDown } from "lucide-react";

import { cn } from "@/lib/utils";

type Column<T> = {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  className?: string;
  render?: (row: T) => React.ReactNode;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  className?: string;
};

export function DataTable<T extends Record<string, any>>({ columns, rows, rowKey, className }: DataTableProps<T>) {
  const [sortKey, setSortKey] = React.useState<string>(String(columns[0]?.key || ""));
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("asc");

  const sortedRows = React.useMemo(() => {
    const copy = [...rows];
    copy.sort((a, b) => {
      const aValue = a[sortKey as keyof T];
      const bValue = b[sortKey as keyof T];
      if (aValue == null) return 1;
      if (bValue == null) return -1;
      if (aValue === bValue) return 0;
      if (sortDirection === "asc") return aValue > bValue ? 1 : -1;
      return aValue < bValue ? 1 : -1;
    });
    return copy;
  }, [rows, sortDirection, sortKey]);

  function toggleSort(key: string) {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
      return;
    }
    setSortKey(key);
    setSortDirection("asc");
  }

  return (
    <div className={cn("max-w-full overflow-auto rounded-[12px] border border-border", className)}>
      <table className="w-full min-w-[720px] border-collapse text-left text-sm">
        <thead className="sticky top-0 z-10 bg-primary text-white">
          <tr>
            {columns.map((column) => {
              const key = String(column.key);
              return (
                <th key={key} className={cn("px-4 py-3 text-xs uppercase tracking-[0.12em]", column.className)}>
                  {column.sortable ? (
                    <button type="button" onClick={() => toggleSort(key)} className="inline-flex items-center gap-1">
                      {column.label}
                      <ArrowUpDown className="h-3.5 w-3.5" />
                    </button>
                  ) : (
                    column.label
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row, index) => (
            <tr key={rowKey(row)} className={index % 2 === 0 ? "bg-[var(--bg2)]" : "bg-[var(--bg3)]"}>
              {columns.map((column) => {
                const key = String(column.key);
                return (
                  <td key={key} className={cn("px-4 py-3 text-[var(--text-secondary)]", column.className)}>
                    {column.render ? column.render(row) : String(row[column.key as keyof T] ?? "-")}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
