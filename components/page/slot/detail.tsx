'use client'
import { FC } from 'react'
import { DataTable } from '@/components/data-table'
import ButtonBack from '@/components/form/button-back'
import { ColumnsSlotDetail, SlotDetailType } from './column'
import { useHandlePagination, useGetUpdateParams } from '@/hooks'
import { ApiResponse } from '@/service'
import FilterDealerId from '@/components/filter/filter-dealer-id'
import { Button } from '@/components/ui/button'
import { timeFormat } from '@/lib/utils'

const Page: FC<{ data: ApiResponse<unknown> }> = ({ data }) => {
  const { pagination, onPaginationChange } = useHandlePagination()
  const { getUrlParams } = useGetUpdateParams()
  const date = getUrlParams('id')
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ButtonBack url="/slot" />
          <Button variant="secondary" size="sm">
            {timeFormat(date).format('LLL dd, y')}
          </Button>
        </div>
        <FilterDealerId 
            pageData={data?.data as SlotDetailType[]} 
            dealerIdField="dealer_id" 
          />
      </div>
      <div className="grid">
        <DataTable
          onPaginationChange={onPaginationChange}
          rowCount={data?.total_items}
          data={(data?.data as SlotDetailType[]) ?? []}
          columns={ColumnsSlotDetail}
          pagination={pagination}
        />
      </div>
    </div>
  )
}

Page.displayName = 'PageClients'

export default Page
