/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { JSX } from 'react'
import PageAdminDetail from '@/components/page/settings/admin/detail'
import { PageProps } from '@/types/page'
import { getSearchParams } from '@/constant'
import { getDetailStaff, getRolesDetail } from '@/service/setting'

const page = async ({ searchParams, params }: PageProps): Promise<JSX.Element> => {
  const currentSearchParams = await searchParams
  const url = await params

  const { dealer_id } = getSearchParams(currentSearchParams)
  const data = (await getDetailStaff({
    dealer_id: dealer_id || '',
    username: url.id?.toString() || ''
  })) as any

  const roleDetail = (await getRolesDetail({
    dealer_id: dealer_id || '',
    role: data?.data?.role
  })) as any

  const groupBySecondPart = (permissions: string[]) => {
    return permissions.reduce<Record<string, string[]>>((acc, permission) => {
      const parts = permission.split(':')
      const key = parts[1]
      if (!acc[key]) acc[key] = []
      acc[key].push(permission)
      return acc
    }, {})
  }
  return (
    <PageAdminDetail
      dataDetail={data?.data}
      permission={groupBySecondPart(roleDetail?.data?.permission)}
    />
  )
}

export default page
