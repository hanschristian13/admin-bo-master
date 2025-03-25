'use client'

import { DataTable } from '@/components/data-table'
import ButtonBack from '@/components/form/button-back'
import { ClientSharedDetailType, ColumnsClientSharedDetail } from './column'
import { ApiResponse } from '@/service'
import { useHandlePagination } from '@/hooks'

const Page = ({ data }: { data: ApiResponse<unknown> }) => {
  const { pagination } = useHandlePagination()
  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between">
        <ButtonBack url="client-shared" />
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
