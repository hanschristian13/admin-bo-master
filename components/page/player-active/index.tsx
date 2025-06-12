'use client'

import React, { useContext } from 'react'
import SearchInput from '@/components/form/search-input'
import { DataTable } from '@/components/data-table'
import { Card } from '@/components/ui/card'
import { formatNumberWithCommas } from '@/lib/format-number'
import { ColumnsPlayerActive, PlayerActiveType } from '@/components/page/player-active/column'
import { iResponsePlayerActiveOverveiw } from '@/service/report'
import FilterSelectDate from '@/components/filter/filter-select-time'
import FilterDateRange from '@/components/filter/filter-date-range'
import { useHandlePagination } from '@/hooks'
import { ApiResponse } from '@/service'
import { SidebarContext } from '@/components/ui/sidebar'

const Page = ({
  reportSummary,
  tabelData
}: {
  reportSummary: iResponsePlayerActiveOverveiw | undefined
  tabelData: ApiResponse<unknown>
}) => {
  const dataReportSummary = [
    {
      title: 'turnover slot',
      amount: reportSummary?.turnover
    },
    {
      title: 'profit slot',
      amount: reportSummary?.profit
    },
    {
      title: 'active player',
      amount: reportSummary?.active_player
    }
  ]

  const { onPaginationChange, pagination } = useHandlePagination()
  const { webRole } = useContext(SidebarContext)

  return (
    <div className="w-full">
      <div className="mb-9 flex justify-between ">
        {webRole === 'label' && <SearchInput param="q" placeholder="Search Super Agent" />}

        <div className="flex items-center space-x-2.5 justify-end w-full">
          <FilterDateRange />
          <FilterSelectDate />
        </div>
      </div>
      <h5 className="mb-4 text-sm font-medium text-neutral-400 capitalize">report summary</h5>
      <div className="flex flex-col gap-5 md:flex md:flex-row md:items-start">
        <div className="flex-none space-y-5">
          {dataReportSummary.map(item => (
            <Card
              key={item.title}
              className="p-6 text-neutral-300 font-medium text-sm space-y-6 min-w-[260px]">
              <h5 className="capitalize">{item.title}</h5>
              <div className="space-y-0.5">
                <span className="text-sm font-semibold text-neutral-400 capitalize">
                  {item.title !== 'active player'
                    ? `Rp ${formatNumberWithCommas(item?.amount ?? 0)}`
                    : `${item?.amount ?? 0} player`}
                </span>
              </div>
            </Card>
          ))}
        </div>
        <div className="grid w-full">
          <DataTable
            rowCount={tabelData?.total_items}
            pagination={pagination}
            onPaginationChange={onPaginationChange}
            data={tabelData?.data as unknown as PlayerActiveType[]}
            columns={ColumnsPlayerActive()}
          />
        </div>
      </div>
    </div>
  )
}

Page.displayName = 'PagePlayerActive'
export default Page
