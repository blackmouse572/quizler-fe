import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ColumnDef,
  RowSelectionState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pagination: {
    pageCount: number
    pageIndex: number
    pageSize: number
    setPagination: (pagination: { pageIndex: number; pageSize: number }) => void
  }
  rowSelection: {
    rowSelection: RowSelectionState
    setRowSelection: (rowSelection: RowSelectionState) => void
  }
  rowId: keyof TData
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pagination,
  rowSelection,
  rowId,
}: DataTableProps<TData, TValue>) {
  const { pageIndex, pageSize } = pagination

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // Pagination
    pageCount: pagination.pageCount,
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
      rowSelection: rowSelection.rowSelection,
    },
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        pagination.setPagination(updater({ pageIndex, pageSize }))
      }
    },
    manualPagination: true,
    enableRowSelection: true,
    onRowSelectionChange: (updater) => {
      if (typeof updater === "function") {
        rowSelection.setRowSelection(updater(rowSelection.rowSelection))
      }
    },
    getRowId: (row) => row[rowId] as unknown as string,
  })

  return (
    <div className="flex w-full flex-col">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
