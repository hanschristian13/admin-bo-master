/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { DataTable } from '@/components/data-table'
import ButtonBack from '@/components/form/button-back'
import {
  ColumnsCategoryDetail,
  ColumnsOtherExpenses,
  ColumnsSummaryInvoice
} from '@/components/page/website-management/invoice/column'
import CardDashboardToday from '@/components/page/dashboard/card-dashboard-today'
import { useHandlePaginationClient } from '@/hooks'

const Page = ({ data, detail }: any) => {
  const { onPaginationChange, pagination } = useHandlePaginationClient({ initPageSize: 5 })
  const { onPaginationChange: onChangePaginationDetail, pagination: paginationDetail } =
    useHandlePaginationClient({ initPageSize: 5 })
  const { onPaginationChange: onPaginationChangeOther, pagination: paginationOther } =
    useHandlePaginationClient({
      initPageSize: 5
    })

  console.log(detail)

  return (
    <div className="w-full space-y-4">
      <ButtonBack url="/invoice" />
      <div className="w-fit">
        <CardDashboardToday
          title={'June Monthly Invoice Amount'}
          amount={data?.data?.total_invoice ?? 0}
        />
      </div>
      <div className="grid items-start gap-4 xl:grid-cols-2">
        <div className="grid gap-3">
          <h3 className="text-base font-medium text-neutral-400">Summary Invoice</h3>
          <DataTable
            onPaginationChange={onPaginationChange}
            manualPagination={false}
            pagination={pagination}
            data={
              data?.data?.categories?.map((x: any) => ({
                ...x,
                dealer_id: data?.data?.dealer_id,
                parent_id: data?.data?.parent_id
              })) ?? []
            }
            columns={ColumnsSummaryInvoice}
          />
        </div>
        <div className="grid gap-3">
          <h3 className="text-base font-medium text-neutral-400">Category Detail</h3>
          <DataTable
            onPaginationChange={onChangePaginationDetail}
            manualPagination={false}
            pagination={paginationDetail}
            data={detail ?? []}
            columns={ColumnsCategoryDetail}
          />
        </div>
      </div>
      <div>
        <h3 className="text-base font-medium text-neutral-400">Other Expenses</h3>
        <DataTable
          onPaginationChange={onPaginationChangeOther}
          manualPagination={false}
          pagination={paginationOther}
          data={
            Object.entries(data?.data?.other_expense ?? {}).map(([key, value]) => ({
              key,
              value
            })) as any
          }
          columns={ColumnsOtherExpenses}
        />
      </div>
    </div>
  )
}

Page.displayName = 'PageInvoiceDetail'

export default Page
