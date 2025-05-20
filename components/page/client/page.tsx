'use client'
import { DataTable } from '@/components/data-table'
import { ClientType, ColumnsClient } from '@/components/page/client/column'
import FilterDateRange from '@/components/filter/filter-date-range'
import FilterSelectDate from '@/components/filter/filter-select-time'
import { useHandlePagination } from '@/hooks'
import SearchInput from '@/components/form/search-input'
import { ApiResponse } from '@/service'
import { useContext } from 'react'
import { SidebarContext } from '@/components/ui/sidebar'

interface PageProps {
  data: ApiResponse<unknown>
}

const Page = ({ data }: PageProps) => {
  const { pagination, onPaginationChange } = useHandlePagination()
  const { webRole } = useContext(SidebarContext)
  return (
    <div className="w-full ">
      <div className="mb-9 flex justify-between">
        {webRole === 'label' && <SearchInput param="q" placeholder="Search Super Agent" />}

        <div className="flex items-center space-x-2.5 justify-end w-full">
          <FilterDateRange />
          <FilterSelectDate />
        </div>
      </div>

      <div className="grid w-full">
        <DataTable
          rowCount={data?.total_items}
          data={(data?.data as ClientType[]) ?? []}
          onPaginationChange={onPaginationChange}
          columns={ColumnsClient}
          pagination={pagination}
        />
      </div>
    </div>
  )
}

Page.displayName = 'PageClients'

export default Page
