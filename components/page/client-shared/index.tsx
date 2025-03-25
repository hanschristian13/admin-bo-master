'use client'

import React, { FC } from 'react'
import SearchInput from '@/components/form/search-input'
import { DataTable } from '@/components/data-table'

import ListSuperAgent from '@/components/list-super-agent'
import { ClientSharedType, ColumnsClientShared } from './column'
import FilterDateRange from '@/components/filter/filter-date-range'
import FilterSelectDate from '@/components/filter/filter-select-time'
import { useHandlePagination } from '@/hooks'
import { ApiResponse } from '@/service'

const Page: FC<{ superAgentList: ApiResponse<unknown>; detail: ApiResponse<unknown> }> = ({
  superAgentList,
  detail
}) => {
  const { pagination, onPaginationChange } = useHandlePagination()

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between">
        <SearchInput param="q" placeholder="Search Superagent" />
        <div className="flex items-center space-x-2.5">
          <FilterDateRange />
          <FilterSelectDate />
        </div>
      </div>

      <h5 className="mb-4 text-sm font-medium text-neutral-400 capitalize">select super agent</h5>
      <div className="flex flex-col gap-5 md:flex md:flex-row md:items-start">
        <ListSuperAgent data={superAgentList?.data} />
        <div className="grid w-full">
          <DataTable
            onPaginationChange={onPaginationChange}
            rowCount={detail?.total_items}
            data={(detail?.data as ClientSharedType[]) ?? []}
            columns={ColumnsClientShared}
            pagination={pagination}
          />
        </div>
      </div>
    </div>
  )
}

Page.displayName = 'PageClientShared'

export default Page
