'use client'
import { FC } from 'react'
import { DataTable } from '@/components/data-table'
import { ClientType, ColumnsClientDetail } from '@/components/page/client/column'
import ButtonBack from '@/components/form/button-back'
import { Button } from '@/components/ui/button'
import { ApiResponse } from '@/service'
import { useGetUpdateParams, useHandlePagination } from '@/hooks'
import FilterDealerId from '@/components/filter/filter-dealer-id'
import { timeFormat } from '@/lib/utils'
import ButtonExportXLS from '@/components/ui/button-export-xls'

const Page: FC<{ data: ApiResponse<unknown> }> = ({ data }) => {
  const { pagination, onPaginationChange } = useHandlePagination()
  const { getUrlParams } = useGetUpdateParams()
  const date = getUrlParams('id')

  return (
    <div className="w-full space-y-4">
      <div className="flex gap-2 items-center justify-between">
        <div className="flex items-center justify-between md:justify-start gap-x-2">
          <ButtonBack url="/clients" />
          <Button variant="secondary" size="sm">
            {timeFormat(date).format('LLL dd, y')}
          </Button>
        </div>
        <div className="flex items-center">
          {/* Pass the current page data to FilterDealerId */}
          <div className="flex space-x-2.5">
            <FilterDealerId
            // pageData={data?.data as ClientType[]}
            // dealerIdField="dealer_id"
            />
            <ButtonExportXLS />
          </div>
        </div>
      </div>
      <div className="grid w-full">
        <DataTable
          onPaginationChange={onPaginationChange}
          rowCount={data?.total_items}
          pagination={pagination}
          data={data?.data as ClientType[]}
          columns={ColumnsClientDetail}
        />
      </div>
    </div>
  )
}

Page.displayName = 'PageClients'

export default Page
