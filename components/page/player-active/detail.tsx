'use client'

import React from 'react'
import SearchInput from '@/components/form/search-input'
import { DataTable } from '@/components/data-table'
import {
  ColumnsPlayerActiveDetail,
  PlayerActiveDetailType
} from '@/components/page/player-active/column'
import ButtonBack from '@/components/form/button-back'
import { Button } from '@/components/ui/button'
import { ApiResponse } from '@/service'
import { useGetUpdateParams, useHandlePagination } from '@/hooks'
import FilterDealerId from '@/components/filter/filter-dealer-id'
import { timeFormat } from '@/lib/utils'

const Page = ({ data }: { data: ApiResponse<unknown> }) => {
  const { pagination, onPaginationChange } = useHandlePagination()
  const { getUrlParams } = useGetUpdateParams()
  const date = getUrlParams('id')
  return (
    <div className="w-full">
      <div className="mb-9 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ButtonBack url="/player-active" />
          <Button variant="secondary" size="sm">
            {timeFormat(date).format('LLL dd, y')}
          </Button>
        </div>
        <div className="flex items-center space-x-2.5">
          <SearchInput param="q" placeholder="Search Username" />
          <FilterDealerId 
            // pageData={data?.data as PlayerActiveDetailType[]} 
            // dealerIdField="dealer_id" 
          />
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
