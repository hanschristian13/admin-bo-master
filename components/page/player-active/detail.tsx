'use client'

import React from 'react'
import SearchInput from '@/components/form/search-input'
import { DataTable } from '@/components/data-table'
import {
  ColumnsPlayerActiveDetail,
  PlayerActiveDetailType
} from '@/components/page/player-active/column'
import ButtonBack from '@/components/form/button-back'
import { ApiResponse } from '@/service'
import { useHandlePagination } from '@/hooks'
import FilterDealerId from '@/components/filter/filter-dealer-id'
const Page = ({ data }: { data: ApiResponse<unknown> }) => {
  const { pagination, onPaginationChange } = useHandlePagination()
  return (
    <div className="w-full">
      <div className="mb-9 flex items-center justify-between">
        <ButtonBack url="/player-active" />
        <div className="flex items-center space-x-2.5">
          <SearchInput param="q" placeholder="Seacrh Username" />
          <FilterDealerId />
        </div>
      </div>

      <div className="grid w-full">
        <DataTable
          onPaginationChange={onPaginationChange}
          rowCount={data?.total_items}
          pagination={pagination}
          data={(data?.data as PlayerActiveDetailType[]) ?? []}
          columns={ColumnsPlayerActiveDetail}
        />
      </div>
    </div>
  )
}

Page.displayName = 'PagePlayerActiveDetail'

export default Page
