'use client'

import React, { FC, useContext } from 'react'
import SearchInput from '@/components/form/search-input'
import { DataTable } from '@/components/data-table'

import ListSuperAgent from '@/components/list-super-agent'
import { ColumnsSlot, SlotType } from '@/components/page/slot/column'
import { useGetUpdateParams, useHandlePagination } from '@/hooks'
import FilterDateRange from '@/components/filter/filter-date-range'
import FilterSelectDate from '@/components/filter/filter-select-time'
import { ApiResponse } from '@/service'
import ButtonDetail from '@/components/button-detail'
import { usePathname } from 'next/navigation'
import { SidebarContext } from '@/components/ui/sidebar'

export const ButtonPageToDetailWithParent = ({
  sub,
  parent = '/slot'
}: {
  sub: string
  parent?: string
}) => {
  const { getValue } = useGetUpdateParams()
  const parentId = getValue('parent_id')
  return <ButtonDetail path={parent} id={`${sub}?parent_id=${parentId}`} />
}

export const ButtonAddQueryParams = ({ params }: { params: string }) => {
  const pathname = usePathname()
  return <ButtonDetail path={pathname} id={`?${params}`} />
}
const Page: FC<{ superAgent: ApiResponse<unknown>; detail: ApiResponse<unknown> }> = ({
  superAgent,
  detail
}) => {
  const { pagination, onPaginationChange } = useHandlePagination()
  const { webRole } = useContext(SidebarContext)
  return (
    <div className="w-full">
      <div className="mb-9 flex justify-between">
        {webRole === 'label' && <SearchInput param="q" placeholder="Search Super Agent" />}
        <div className="flex items-center space-x-2.5 justify-end w-full">
          <FilterDateRange />
          <FilterSelectDate />
        </div>
      </div>

      <h5 className="mb-4 text-sm font-medium text-neutral-400 capitalize">select super agent</h5>
      <div className="flex flex-col gap-5 md:flex md:flex-row md:items-start">
        <ListSuperAgent data={superAgent?.data} />
        <div className="grid w-full">
          <DataTable
            rowCount={detail?.total_items}
            data={(detail?.data as SlotType[]) ?? []}
            columns={ColumnsSlot}
            pagination={pagination}
            onPaginationChange={onPaginationChange}
          />
        </div>
      </div>
    </div>
  )
}

Page.displayName = 'PageSlot'

export default Page
