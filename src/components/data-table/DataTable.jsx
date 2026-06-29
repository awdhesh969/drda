import { useState } from "react";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import DataTableEmpty from "./DataTableEmpty";
import DataTableToolbar from "./DataTableToolbar";

const DataTable = ({
  columns,
  data,
  searchKey = [],
  searchPlaceholder,
  toolbarActions,
}) => {
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,

    state: {
      globalFilter,
    },

    onGlobalFilterChange: setGlobalFilter,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    globalFilterFn: (row, _, value) => {
      if (!Array.isArray(searchKey)) return true;

      return searchKey.some((key) =>
        String(row.getValue(key) ?? "")
          .toLowerCase()
          .includes(value.toLowerCase())
      );
    },
  });

  return (
    <div className="rounded-lg border">
      <DataTableToolbar
        table={table}
        searchPlaceholder={searchPlaceholder}
        toolbarActions={toolbarActions}
      />

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((group) => (
            <TableRow key={group.id}>
              {group.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <DataTableEmpty colSpan={columns.length} />
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;