"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import * as React from "react"

import Pagination from "@/components/pagination"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/ui/icons"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import QuizBank from "@/types/QuizBank"
import PagedResponse from "@/types/paged-response"
import { useTranslations } from "next-intl"
import FilterDropdown from "./filter"

type QuizBankTableProps = {
  data: PagedResponse<QuizBank>
}

export function QuizBankTable({ data }: QuizBankTableProps) {
  const { skip, take, total: totalPages } = data.metadata
  const t = useTranslations("Table")
  const i18n = useTranslations("UserAdmin")
  const columns: ColumnDef<QuizBank>[] = React.useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            className="rounded-[0.25rem] opacity-100"
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "bankName",
        header: i18n("headers.name"),
        cell: ({ row }) => (
          <div className="min-w-52 capitalize">{row.getValue("bankName")}</div>
        ),
      },
      {
        accessorKey: "authorName",
        header: i18n("headers.author"),
        cell: ({ row }) => (
          <div className="min-w-52 capitalize">
            {row.getValue("authorName")}
          </div>
        ),
      },
      {
        accessorKey: "quizes",
        header: i18n("headers.quizzes"),
        cell: ({ row }) => {
          const value = row.getValue("quizes") as Array<any>
          const count = value.length

          return <div>{count}</div>
        },
      },
      {
        accessorKey: "created",
        header: ({ column }) => {
          return (
            <div
              className="flex h-full cursor-pointer items-center justify-start gap-2 px-3  [&_svg]:h-4 [&_svg]:w-4"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              {i18n("headers.created_at")}
              {column.getIsSorted() === "asc" ? (
                <Icons.ArrowUp className="" />
              ) : (
                <Icons.ArrowDown className="" />
              )}
            </div>
          )
        },
        cell: ({ row }) => (
          <div className="lowercase">{row.getValue("created")}</div>
        ),
      },
      {
        accessorKey: "visibility",
        header: () => (
          <div className="text-center">{i18n("headers.visibility")}</div>
        ),
        cell: ({ row }) => {
          const visibility = row.getValue("visibility") as string
          const isPublic = visibility.toLowerCase() === "public"

          return (
            <div className="flex w-full justify-center">
              <Checkbox role="cell" checked={isPublic} className="mx-auto" />
            </div>
          )
        },
      },
      {
        id: "actions",
        header(props) {
          return <></>
        },
        enableHiding: false,
        cell: ({ row }) => {
          const bank = row.original

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" isIconOnly>
                  <span className="sr-only">Open menu</span>
                  <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() =>
                    navigator.clipboard.writeText(bank.id.toString())
                  }
                >
                  Copy ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View customer</DropdownMenuItem>
                <DropdownMenuItem>View payment details</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
    ],
    [i18n]
  )
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data: data.data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const visibleColumnsCount = React.useMemo(() => {
    // -2 for select and actions column
    return table.getVisibleFlatColumns().length - 2
  }, [table])

  const renderVisibibleColumnDropdown = React.useCallback(() => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="relative">
            <Badge
              size={"sm"}
              className="absolute left-0 top-0 origin-center -translate-x-1/2 -translate-y-1/2"
            >
              {visibleColumnsCount}
            </Badge>
            <Button
              variant="outline"
              color="accent"
              className="ml-auto"
              isIconOnly
            >
              <Icons.Eye />
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              )
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }, [table, visibleColumnsCount])

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <Button>create</Button>
        <div className="flex items-center gap-2">
          {renderVisibibleColumnDropdown()}
          <FilterDropdown table={table} />
        </div>
      </div>
      <div className="rounded-md border border-primary">
        <Table className=" rounded-md">
          <TableHeader className="rounded-lg">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-sm !font-bold">
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center">
        <div className="flex-1 text-sm text-muted-foreground">
          {t("selected_rows", {
            count: table.getFilteredSelectedRowModel().rows.length,
            total: table.getFilteredRowModel().rows.length,
          })}
        </div>
      </div>
      <Pagination
        currentPage={skip / take + 1}
        perPage={take}
        totalPages={totalPages}
      />
    </div>
  )
}
