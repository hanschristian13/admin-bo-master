/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import { formatNumberWithCommas } from '@/lib/format-number'
import { cn } from '@/lib/utils'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

import InitialAvatar from '@/components/initial-avatar'
import { useUpdateSearchParams } from '@/hooks'

const ListSuperAgent = ({ data }: any) => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const currentItems = mockListSuperAgent.slice(startIndex, endIndex);

  const totalPages = Math.ceil(data.length / itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const { value: selected, setSearchParam: setSelected } = useUpdateSearchParams('parent_id')

  return (
    <div className="flex-none space-y-5">
      {data.map((item: any, index: any) => (
        <Card
          key={index}
          data-active={selected === item.parent_id ? true : false}
          onClick={() => setSelected(item.parent_id)}
          className="flex flex-row p-6 text-neutral-300 font-medium text-sm gap-x-3 min-w-[260px] hover:drop-shadow-primary data-[active=true]:drop-shadow-primary">
          <InitialAvatar name={item.parent_id ?? item?.parent_id} />
          <div className="flex flex-col gap-y-0.5">
            <h5 className="capitalize">{item.parent_id ?? item?.parent_id}</h5>
            <div className="text-sm font-semibold text-neutral-400 space-y-0.5">
              <span className=" text-neutral-300 capitalize">Rp </span>
              {formatNumberWithCommas(item.turnover ?? item?.parent_id)}
            </div>
          </div>
        </Card>
      ))}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-500">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={cn(
              'p-2 rounded-md bg-background hover:bg-accent/10 disabled:opacity-50',
              currentPage === 1 && 'cursor-not-allowed'
            )}>
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
          <span>{currentPage}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={cn(
              'p-2 rounded-md bg-background hover:bg-accent/10 disabled:opacity-50',
              currentPage === totalPages && 'cursor-not-allowed'
            )}>
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ListSuperAgent
