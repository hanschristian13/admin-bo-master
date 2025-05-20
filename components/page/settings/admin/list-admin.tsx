/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import PaginationCustomize from '@/components/pagination'

import CardAdmin from '@/components/card-admin'
import Link from 'next/link'
import { ApiResponse } from '@/service'

interface ListAdminProps {
  data: ApiResponse<any>
}

const ListAdmin: React.FC<ListAdminProps> = ({ data }) => {
  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        {data?.data?.map((item: any) => (
          <Link
            aria-label="player detail"
            href={`/settings/${item.username}?dealer_id=${item?.dealer_id}`}
            key={item.username}>
            <CardAdmin data={item} />
          </Link>
        ))}
      </div>
      <div className="p-4">
        <PaginationCustomize totalPages={data?.total_page ?? 1} />
      </div>
    </div>
  )
}

export default ListAdmin
