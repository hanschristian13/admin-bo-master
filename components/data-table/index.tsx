'use client'

import * as React from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem
} from '@/components/ui/pagination'
import { usePagination } from '@/hooks/use-pagination'

interface DataTableProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  initialSorting?: SortingState
  initialColumnFilters?: ColumnFiltersState
  initialColumnVisibility?: VisibilityState
  initialRowSelection?: Record<string, boolean>
  loading?: boolean
  noResultsMessage?: string
  onSelectedRowsChange?: (selectedRows: T[]) => void
  rowCount?: number
  onPaginationChange?: (pagination: PaginationState) => void
  pagination?: PaginationState
  manualPagination?: boolean
  withNumber?: boolean
}

export function DataTable<T>({
  data,
  columns,
  initialSorting = [],
  initialColumnFilters = [],
  initialColumnVisibility = {},
  initialRowSelection = {},
  loading = false,
  noResultsMessage = 'No results.',
  onSelectedRowsChange,
  rowCount,
  onPaginationChange,
  pagination,
  manualPagination = true,
  withNumber = true
}: DataTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>(initialSorting)
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(initialColumnFilters)
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(initialColumnVisibility)
  const [rowSelection, setRowSelection] =
    React.useState<Record<string, boolean>>(initialRowSelection)

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: updaterOrValue => {
      onPaginationChange?.(
        typeof updaterOrValue === 'function'
          ? updaterOrValue(pagination ?? { pageIndex: 0, pageSize: 10 })
          : updaterOrValue
      )
    },
    manualPagination: manualPagination,
    autoResetPageIndex: false,
    rowCount: rowCount,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination
    }
  })

  React.useEffect(() => {
    if (onSelectedRowsChange) {
      const selectedRows = table.getSelectedRowModel().flatRows.map(row => row.original)
      onSelectedRowsChange(selectedRows)
    }
  }, [rowSelection, onSelectedRowsChange, table])

  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage: table?.getState()?.pagination?.pageIndex + 1,
    totalPages: table?.getPageCount(),
    paginationItemsToDisplay: 5
  })

  const hasFooter = table.getAllColumns().some(column => column.columnDef.footer)

  if (loading) {
    return <div className="w-full text-center py-4">Loading...</div>
  }

  console.log(pagination)

  return (
    <Card className="w-full overflow-hidden rounded-md border-neutral-250 relative">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {withNumber && <TableHead>No</TableHead>}

              {headerGroup.headers.map(header => {
                return (
                  <TableHead className="text-neutral-300" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow
                key={row.id}
                className={`${row.getIsSelected() ? 'bg-neutral-250' : 'bg-inherit'}`}>
                {withNumber && (
                  <TableCell>
                    {row?.index +
                      1 +
                      table.getState().pagination.pageIndex * table.getState()?.pagination.pageSize}
                  </TableCell>
                )}

                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {noResultsMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        {hasFooter ? (
          <TableFooter className="bg-neutral-150">
            {table.getFooterGroups().map(footerGroup => (
              <TableRow key={footerGroup.id} className="hover:bg-transparent">
                {withNumber && <TableCell />}

                {footerGroup.headers.map(footer => (
                  <TableCell key={footer.id} className="text-right">
                    {flexRender(footer.column.columnDef.footer, footer.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableFooter>
        ) : null}
      </Table>
      <div className="flex flex-col gap-2 md:flex-row items-center justify-between w-full space-x-2 py-4 px-5 border-t bg-background border-neutral-250 sticky bottom-0">
        {/* Page number information */}
        <p
          className="hidden gap-1 md:flex text-muted-foreground flex-1 text-sm whitespace-nowrap"
          aria-live="polite">
          Page <span className="text-foreground">{table.getState().pagination.pageIndex + 1}</span>{' '}
          of <span className="text-foreground">{table.getPageCount()}</span>
        </p>

        {/* Pagination buttons */}
        <div className="grow">
          <Pagination>
            <PaginationContent>
              {/* Previous page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="ghost"
                  className="disabled:pointer-events-none disabled:opacity-50 w-fit px-4"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="Go to previous page">
                  <ChevronLeftIcon size={16} aria-hidden="true" />
                  Previous
                </Button>
              </PaginationItem>

              {/* Left ellipsis (...) */}
              {showLeftEllipsis && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {/* Page number buttons */}
              {pages.map(page => {
                const isActive = page === table.getState()?.pagination?.pageIndex + 1
                return (
                  <PaginationItem key={page}>
                    <Button
                      size="icon"
                      variant={`${isActive ? 'outline' : 'ghost'}`}
                      onClick={() => table.setPageIndex(page - 1)}
                      aria-current={isActive ? 'page' : undefined}>
                      {page}
                    </Button>
                  </PaginationItem>
                )
              })}

              {/* Right ellipsis (...) */}
              {showRightEllipsis && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {/* Next page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="ghost"
                  className="disabled:pointer-events-none disabled:opacity-50 w-fit px-4"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label="Go to next page">
                  Next
                  <ChevronRightIcon size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        {/* Results per page */}
        <div className="flex flex-1 justify-end">
          <Select
            value={table.getState().pagination.pageSize.toString()}
            onValueChange={value => {
              table.setPageSize(Number(value))
            }}
            aria-label="Results per page">
            <SelectTrigger id="results-per-page" className="w-fit whitespace-nowrap">
              <SelectValue placeholder="Select number of results" />
            </SelectTrigger>
            <SelectContent>
              {[10, 25, 50, 100, 200].map(pageSize => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  {pageSize} / page
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  )
}
