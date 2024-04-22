"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  RowSelectionState,
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
import SizeSelector from "@/components/size-selector"
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
import usePaginationValue from "@/hooks/usePaginationValue"
import PagedResponse from "@/types/paged-response"
import { useFormatter, useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import DeleteDialog from "./delete-dialog"
import { ReportType } from "@/types"
import ViewDetailsReportDialog from "./view-details-report-dialog"

type ReportTableProps = {
  data: PagedResponse<ReportType>
  locale?: string
}

export function ReportsTable({ data }: ReportTableProps) {
  const { skip, take, currentPage, totalPages, hasMore } = usePaginationValue(
    data.metadata
  )
  const t = useTranslations("Table")
  const i18n = useTranslations("ReportAdmin")
  const format = useFormatter()
  const router = useRouter()

  const columns: ColumnDef<ReportType>[] = React.useMemo(
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
            checked={row.getIsSelected() || false}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "quizBank",
        header: i18n("headers.reported_quizbank"),
        cell: ({ row }) => {
          const quizBank = row.getValue("quizBank") as ReportType["quizBank"]
          if (!quizBank) return <div></div>

          return <div className="min-w-52 capitalize">{quizBank.bankName}</div>
        },
      },
      {
        accessorKey: "account",
        header: i18n("headers.reported_account"),
        cell: ({ row }) => {
          const account = row.getValue("account") as ReportType["account"]

          if (!account) return <div></div>
          return <div className="min-w-52 capitalize">{account.fullName}</div>
        },
      },
      {
        accessorKey: "owner",
        header: i18n("headers.account_report_name"),
        cell: ({ row }) => {
          const owner = row.getValue("owner") as ReportType["owner"]
          return <div className="min-w-52">{owner.fullName as string}</div>
        },
      },
      {
        accessorKey: "reason",
        header: i18n("headers.reason"),
        cell: ({ row }) => {
          const reason = row.getValue("reason") as ReportType["reason"]
          return (
            <div className="min-w-52">
              {i18n(`report_reason.reason_choice.${reason}` as any)}
            </div>
          )
        },
      },
      {
        accessorKey: "created",
        header: ({ column }) => {
          return (
            <div
              className="flex h-full cursor-pointer items-center justify-start gap-2 [&_svg]:h-4 [&_svg]:w-4"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              {i18n("headers.created_at")}
              {column.getIsSorted() === "asc" ? (
                <Icons.CaretUpFilled className="ml-auto" />
              ) : (
                <Icons.CaretDownFilled className="ml-auto" />
              )}
            </div>
          )
        },
        cell: ({ row }) => (
          <div className="lowercase">
            {format.dateTime(new Date(row.getValue("created")), {
              dateStyle: "short",
              timeStyle: "short",
            })}
          </div>
        ),
      },
      {
        accessorKey: "type",
        header: () => (
          <div className="text-center">{i18n("headers.report_type")}</div>
        ),
        cell: ({ row }) => {
          const quizBank = row.getValue("quizBank") as ReportType["quizBank"]

          if (!quizBank)
            return (
              <div className="flex justify-center">
                <Badge>{i18n("data_table.report_user")}</Badge>
              </div>
            )

          return (
            <div className="flex justify-center">
              <Badge>{i18n("data_table.report_quizbank")}</Badge>
            </div>
          )
        },
      },
    ],
    [format, i18n]
  )

  const handleCopyClipboard = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  const handleView = React.useCallback(
    (url: string) => {
      router.push(url)
    },
    [router]
  )

  const renderContextMenuAction = React.useCallback(
    (children: React.ReactNode, report: ReportType) => {
      return (
        <ContextMenu>
          <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
          <ContextMenuContent className="min-w-[250px]">
            <ContextMenuLabel>{t("action")} </ContextMenuLabel>
            <ContextMenuSeparator />
            <ContextMenuItem
              onClick={() => handleCopyClipboard(report.id.toString())}
            >
              <Icons.Copy className="mr-2 inline-block h-4 w-4 " />
              {i18n("actions.copy_id")}
            </ContextMenuItem>
            <ContextMenuItem
              onClick={() => handleCopyClipboard(report.owner.fullName)}
            >
              <Icons.Copy className="mr-2 inline-block h-4 w-4 " />
              {i18n("actions.copy_reporter_name")}
            </ContextMenuItem>
            <ContextMenuSeparator />

            <ContextMenuSub>
              <ContextMenuSubTrigger>
                <Icons.HandStop className="mr-2 inline-block h-4 w-4" />
                {i18n("actions.take_action")}
              </ContextMenuSubTrigger>
              <ContextMenuSubContent>
                <ViewDetailsReportDialog
                  data={report}
                  trigger={
                    <ContextMenuItem>
                      <Icons.Info className="mr-2 inline-block h-4 w-4" />
                      {i18n("actions.view_details")}
                    </ContextMenuItem>
                  }
                />
                <ContextMenu>
                  <DeleteDialog
                    ids={[report.id]}
                    trigger={
                      <ContextMenuItem onSelect={(e) => e.stopPropagation()}>
                        <Icons.Delete className="mr-2 inline-block h-4 w-4" />
                        {i18n("actions.delete")}
                      </ContextMenuItem>
                    }
                  />
                </ContextMenu>
              </ContextMenuSubContent>
            </ContextMenuSub>

            <ContextMenuSub>
              <ContextMenuSubTrigger>
                <Icons.Navigation className="mr-2 inline-block h-4 w-4 " />
                {i18n("actions.go_to.index")}
              </ContextMenuSubTrigger>
              <ContextMenuSubContent>
                <ContextMenuItem
                  onClick={() => handleView(`/users/${report.owner.id}`)}
                >
                  {i18n("actions.go_to.reporter")}
                </ContextMenuItem>

                {!report.account && (
                  <ContextMenuItem
                    onClick={() =>
                      handleView(`/quizbank/${report.quizBank.id}`)
                    }
                  >
                    {i18n("actions.go_to.reported_quizbank")}
                  </ContextMenuItem>
                )}

                {!report.quizBank && (
                  <ContextMenuItem
                    onClick={() => handleView(`/users/${report.account.id}`)}
                  >
                    {i18n("actions.go_to.reported_account")}
                  </ContextMenuItem>
                )}
              </ContextMenuSubContent>
            </ContextMenuSub>
          </ContextMenuContent>
        </ContextMenu>
      )
    },
    [handleView, i18n, t]
  )

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: Math.floor(skip / take),
    pageSize: take,
  })

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})

  const table = useReactTable({
    data: data.data,
    columns,
    pageCount: totalPages,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: (updater) => {
      if (typeof updater === "function") {
        setRowSelection(updater(rowSelection))
      }
    },
    getRowId: (row) => row.id.toString(),
    manualPagination: true,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  })

  const renderDeleteButton = React.useCallback(() => {
    if (Object.keys(rowSelection).length) {
      const model = table.getSelectedRowModel()

      return (
        <DeleteDialog
          ids={model.rows.map((row) => row.original.id.toString())}
          trigger={
            <Button color={"danger"} size={"sm"}>
              <Icons.Delete />
              {i18n("actions.delete")}
            </Button>
          }
        />
      )
    }
  }, [i18n, rowSelection, table])

  const renderVisibibleColumnDropdown = React.useCallback(() => {
    return (
      <DropdownMenu modal>
        <DropdownMenuTrigger asChild>
          <div className="relative">
            <Button color="accent" className="ml-auto" size="sm" isIconOnly>
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
  }, [columnVisibility, t, table])

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">{renderDeleteButton()}</div>
        <div className="flex items-center gap-2">
          {renderVisibibleColumnDropdown()}
        </div>
      </div>
      <div className="rounded-md border border-primary bg-background">
        <Table className="rounded-md">
          <TableHeader className="rounded-lg">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-sm !font-bold">
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
                  row.original as ReportType
                )
              )
            ) : (
              <TableRow key={"empty"}>
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
      <div className="my-3 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {t("selected_rows", {
            count: table.getFilteredSelectedRowModel().rows.length,
            total: table.getFilteredRowModel().rows.length,
          })}
        </div>
        <Pagination
          currentPage={currentPage}
          className="w-fit flex-1"
          perPage={take}
          hasNext={hasMore}
          totalPages={totalPages}
        />
        <SizeSelector
          onValueChange={(value) =>
            setPagination((prev) => ({
              ...prev,
              pageSize: parseInt(value, 10),
            }))
          }
          defaultValue={take.toString()}
        />
      </div>
    </div>
  )
}
