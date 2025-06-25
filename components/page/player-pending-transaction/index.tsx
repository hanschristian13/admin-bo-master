'use client'

import SearchInput from '@/components/form/search-input'
import { DataTable } from '@/components/data-table'
import { ColumnsPlayerPendingTransaction, PlayerPendingTransactionType } from './column'

import FilterDateRange from '@/components/filter/filter-date-range'
import { useHandlePagination } from '@/hooks'
import FilterSelectDate from '@/components/filter/filter-select-time'
import FilterStatusBet from '@/components/filter/filter-status-bet'
import { ApiResponse } from '@/service'
import ButtonExportXLS from '@/components/ui/button-export-xls'

const Page = ({ data }: { data: ApiResponse<unknown> }) => {
  const { pagination, onPaginationChange } = useHandlePagination()
  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col gap-2 md:flex-row justify-between">
        <div className="flex items-center jus space-x-2.5">
          <SearchInput param="q" placeholder="Search Username" />
          <FilterStatusBet />
        </div>
        <div className="flex items-center jus space-x-2.5">
          <FilterDateRange />
          <FilterSelectDate />
          <ButtonExportXLS />
        </div>
      </div>
      <div className="grid w-full">
        <DataTable
          data={(data?.data as PlayerPendingTransactionType[]) ?? []}
          columns={ColumnsPlayerPendingTransaction}
          pagination={pagination}
          rowCount={data?.total_items}
          onPaginationChange={onPaginationChange}
        />
      </div>
    </div>
  )
}

Page.displayName = 'PagePlayerPendingTransaction'

export default Page
