'use client'

import { usePagination } from '@/hooks/use-pagination'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem
} from '@/components/ui/pagination'
import { Button } from './ui/button'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useGetUpdateParams } from '@/hooks'

type PaginationProps = {
  totalPages: number
  paginationItemsToDisplay?: number
}

export default function PaginationCustomize({
  totalPages,
  paginationItemsToDisplay = 5
}: PaginationProps) {
  const { getValue, setSearchParams } = useGetUpdateParams()

  const currentPage = parseInt(getValue('page') ?? 1)

  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage,
    totalPages,
    paginationItemsToDisplay
  })

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous page button */}
        <PaginationItem>
          <Button
            size="icon"
            variant="ghost"
            className="disabled:pointer-events-none disabled:opacity-50 w-fit px-4"
            onClick={() => setSearchParams({ page: `${currentPage - 1}` })}
            disabled={currentPage === 1 ? true : undefined}
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

        {/* Page number links */}
        {pages.map(page => (
          <PaginationItem key={page}>
            <Button
              size="icon"
              variant={`${
                page === currentPage || (!currentPage && page === 1) ? 'outline' : 'ghost'
              }`}
              onClick={() => setSearchParams({ page })}
              aria-current={
                page === currentPage || (!currentPage && page === 1) ? 'page' : undefined
              }>
              {page}
            </Button>
          </PaginationItem>
        ))}

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
            onClick={() => setSearchParams({ page: `${currentPage + 1}` })}
            disabled={currentPage === totalPages ? true : undefined}
            aria-label="Go to previous page">
            Next
            <ChevronRightIcon size={16} aria-hidden="true" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
