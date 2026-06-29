"use client";

import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const DataTableToolbar = ({
  table,
  searchKey,
  searchPlaceholder = "Search...",
  children,
}) => {
  const isFiltered =
  table.getState().columnFilters.length > 0 ||
  !!table.getState().globalFilter;

  return (
    <div className="flex items-center justify-between gap-4 border-b p-4">
      <div className="flex items-center gap-2">
        <div className="relative w-[280px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder={searchPlaceholder}
            value={table.getState().globalFilter ?? ""}
            onChange={(e) => table.setGlobalFilter(e.target.value)}
            className="pl-9"
          />
        </div>

        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              table.resetColumnFilters();
              table.setGlobalFilter("");
            }}
          >
            <X className="mr-2 h-4 w-4" />
            Reset
          </Button>
        )}
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-2">
        {children}
      </div>
    </div>
  );
};

export default DataTableToolbar;