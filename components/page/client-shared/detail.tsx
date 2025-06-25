'use client'

import { DataTable } from '@/components/data-table'
import ButtonBack from '@/components/form/button-back'
import { ClientSharedDetailType, ColumnsClientSharedDetail } from './column'
import { ApiResponse } from '@/service'
import { useHandlePagination, useGetUpdateParams } from '@/hooks'
import { Button } from '@/components/ui/button'
import { timeFormat } from '@/lib/utils'
import FilterDealerId from '@/components/filter/filter-dealer-id'
import ButtonExportXLS from '@/components/ui/button-export-xls'

const Page = ({ data }: { data: ApiResponse<unknown> }) => {
  const { pagination } = useHandlePagination()
  const { getUrlParams } = useGetUpdateParams()
  const date = getUrlParams('id')

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <ButtonBack url="/client-shared" />
          <Button variant="secondary" size="sm">
            {timeFormat(date).format('LLL dd, y')}
          </Button>
        </div>
        <div className="flex items-center space-x-2.5">
          <FilterDealerId
          // pageData={data?.data as ClientSharedDetailType[]}
          // dealerIdField="dealer_id"
          />
          <ButtonExportXLS />
        </div>
      </div>
      <div className="grid w-full">
        <DataTable
          rowCount={data?.total_items}
          data={(data?.data as ClientSharedDetailType[]) ?? []}
          columns={ColumnsClientSharedDetail}
          pagination={pagination}
        />
      </div>
    </div>
  )
}

Page.displayName = 'PageClients'

export default Page
