import { useState } from "react";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
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
import DataTablePagination from "./DataTablePagination";
import DataTableToolbar from "./DataTableToolbar";

const DataTable = ({
  columns,
  data,
  searchKey = [],
  searchPlaceholder,
  toolbarActions,
}) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,

    state: {
      globalFilter,
      pagination,
    },

    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

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
      >
        {toolbarActions}
      </DataTableToolbar>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((group) => (
            <TableRow key={group.id}>
              {group.headers.map((header) => (
                <TableHead key={header.id} className="px-6 text-xs py-4font-bold uppercase tracking-wider text-slate-500 bg-transparent text-left">
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
                  <TableCell key={cell.id} className="px-6 py-4">
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

      <div className="border-t p-4">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
};

export default DataTable;