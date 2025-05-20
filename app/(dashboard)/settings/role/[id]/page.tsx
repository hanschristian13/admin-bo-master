import RoleDetail from '@/components/page/settings/admin/role-detail'
import { getSearchParams } from '@/constant'
import { PageProps } from '@/types/page'

import React, { JSX } from 'react'

const page = async ({ searchParams, params }: PageProps): Promise<JSX.Element> => {
  const currentSearchParams = await searchParams
  const url = await params
  const { dealer_id } = getSearchParams(currentSearchParams)
  return <RoleDetail initialValue={{ dealer_id, role: url?.id }} />
}

export default page
