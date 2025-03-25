import React from 'react'
import PaginationCustomize from '@/components/pagination'
import { Admin } from '@/types/user'
import CardAdmin from '@/components/card-admin'
import Link from 'next/link'

interface dataAdmin {
  data: Admin[]
}

interface ListAdminProps {
  data: dataAdmin
}

const ListAdmin: React.FC<ListAdminProps> = ({ data }) => {
  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        {data?.data?.map(item => (
          <Link aria-label="player detail" href={`/settings/${item.username}`} key={item.username}>
            <CardAdmin data={item} />
          </Link>
        ))}
      </div>
      <div className="p-4">
        <PaginationCustomize totalPages={10} paginationItemsToDisplay={5} />
      </div>
    </div>
  )
}

export default ListAdmin
