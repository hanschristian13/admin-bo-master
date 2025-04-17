import React, { JSX } from 'react'
import SearchInput from '@/components/form/search-input'
import ListAdmin from '@/components/page/settings/admin/list-admin'

import RolesOverview from '@/components/page/settings/admin/roles-overview'
import CreateAdmin from '@/components/page/settings/admin/create-admin'

import { getSearchParams } from '@/constant'
import { getListSuperAgentUsers } from '@/service/setting'
import FilterDealerId from '@/components/filter/filter-dealer-id'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const page = async ({ currentSearchParams }: any): Promise<JSX.Element> => {
  const { page, q, dealer_id } = getSearchParams(currentSearchParams)

  const data = await getListSuperAgentUsers({ page, q, dealer_id })
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
        <div className="flex space-x-4">
          <SearchInput param="q" placeholder="Search Admin..." />
          <FilterDealerId />
        </div>
        <div className="flex items-center gap-2.5">
          <RolesOverview />
          <CreateAdmin />
        </div>
      </div>
      <ListAdmin data={data} />
    </div>
  )
}

page.displayName = 'PageSettingAdmin'

export default page
