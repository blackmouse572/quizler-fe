"use client"

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
import { Button, buttonVariants } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
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
    ],
    [i18n]
  )

  const renderContextMenuAction = React.useCallback(
    (children: React.ReactNode, bank: QuizBank) => {
      return (
        <ContextMenu>
          <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
          <ContextMenuContent className="min-w-[250px]">
            <ContextMenuLabel>{t("action")} </ContextMenuLabel>
            <ContextMenuSeparator />
            <ContextMenuItem
              onClick={() => navigator.clipboard.writeText(bank.id.toString())}
            >
              <Icons.Copy className="mr-2 inline-block h-4 w-4 " />
              {i18n("actions.copy_id")}
            </ContextMenuItem>
            <ContextMenuItem
              onClick={() =>
                navigator.clipboard.writeText(bank.authorName ?? "")
              }
            >
              <Icons.Copy className="mr-2 inline-block h-4 w-4 " />
              {i18n("actions.copy_author_id")}
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>
              <Icons.HandStop className="mr-2 inline-block h-4 w-4 " />
              {i18n("actions.take_action")}
            </ContextMenuItem>
            <ContextMenuItem>
              <Icons.Delete className="mr-2 inline-block h-4 w-4 " />
              {i18n("actions.delete")}
            </ContextMenuItem>
            <ContextMenuSub>
              <ContextMenuSubTrigger>
                <Icons.Navigation className="mr-2 inline-block h-4 w-4 " />
                {i18n("actions.go_to.index")}
              </ContextMenuSubTrigger>
              <ContextMenuSubContent>
                <ContextMenuItem>{i18n("actions.go_to.quiz")}</ContextMenuItem>
                <ContextMenuItem>
                  {i18n("actions.go_to.author")}
                </ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
          </ContextMenuContent>
        </ContextMenu>
      )
    },
    [i18n, t]
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
      <DropdownMenu modal>
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
        <DropdownMenuContent align="end" className="min-w-52">
          <DropdownMenuLabel className="flex items-center">
            <Icons.Eye className="mr-2 inline-block h-4 w-4 text-emerald-500" />
            {t("column_visibility")}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
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
                  onSelect={(e) => e.preventDefault()} // prevent closing when selecting
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              )
            })}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault()
              table.resetColumnVisibility()
            }}
            className={buttonVariants({
              className: "w-full",
            })}
            disabled={Object.keys(columnVisibility).length === 0}
          >
            {t("reset")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }, [columnVisibility, t, table, visibleColumnsCount])

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
              table.getRowModel().rows.map((row) =>
                renderContextMenuAction(
                  <TableRow
                    key={row.id}
                    onClick={() => row.toggleSelected()}
                    data-state={row.getIsSelected() && "selected"}
                    className="h-14"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>,
                  row.original as QuizBank
                )
              )
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {t("no_results")}
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
