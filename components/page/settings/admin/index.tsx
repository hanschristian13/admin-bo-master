import React from 'react'
import SearchInput from '@/components/form/search-input'
import ListAdmin from '@/components/page/settings/admin/list-admin'
import { dataAdmin } from '@/mock/admin'
import RolesOverview from '@/components/page/settings/admin/roles-overview'
import CreateAdmin from '@/components/page/settings/admin/create-admin'

const page = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
        <SearchInput param="q" placeholder="Seacrh Admin..." />
        <div className="flex items-center gap-2.5">
          <RolesOverview />
          <CreateAdmin />
        </div>
      </div>
      <ListAdmin data={dataAdmin} />
    </div>
  )
}

page.displayName = 'PageSettingAdmin'

export default page
