'use client'
import { FC } from 'react'
import { DataTable } from '@/components/data-table'
import { ColumnsProfit, ProfitType } from './column'
import MonthPicker from '@/components/form/month-picker'
import { ApiResponse } from '@/service'
import { useHandlePagination, useUpdateSearchParams } from '@/hooks'
import { timeFormat } from '@/lib/utils'

const Page: FC<{ data: ApiResponse<unknown> }> = ({ data }) => {
  const { pagination, onPaginationChange } = useHandlePagination()
  const { value, setSearchParam } = useUpdateSearchParams('date')
  console.log(data)
  return (
    <div className="w-full space-y-4">
      <div className="flex w-[152px]">
        <MonthPicker
          className="w-min"
          onMonthSelect={x => setSearchParam(timeFormat(x)?.startOf('months').format())}
          selectedMonth={timeFormat(value ? value : new Date()).toDate()}
          align="start"
        />
      </div>
      <div className="grid w-full">
        <DataTable
          rowCount={data?.total_items}
          pagination={pagination}
          onPaginationChange={onPaginationChange}
          data={(data?.data as ProfitType[]) ?? []}
          columns={ColumnsProfit}
        />
      </div>
    </div>
  )
}

Page.displayName = 'PageProfit'

export default Page
