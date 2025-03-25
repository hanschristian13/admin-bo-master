'use client'
import { FC } from 'react'
import { DataTable } from '@/components/data-table'
import ButtonBack from '@/components/form/button-back'
import { ColumnsSlotDetail, SlotDetailType } from './column'
import { useHandlePagination } from '@/hooks'
import { ApiResponse } from '@/service'
import FilterDealerId from '@/components/filter/filter-dealer-id'

const Page: FC<{ data: ApiResponse<unknown> }> = ({ data }) => {
  const { pagination, onPaginationChange } = useHandlePagination()
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <ButtonBack url="/slot" />
        <FilterDealerId />
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
