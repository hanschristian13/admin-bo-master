/* eslint-disable @typescript-eslint/no-explicit-any */
import { getListPermission, getRolesDetail } from '@/service/setting'
import React from 'react'
import FormPatchRole from './form-patch-role'

const RoleDetail = async ({ initialValue }: { initialValue?: any }) => {
  const permission = (await getListPermission()) as any

  const existingRole = initialValue?.role ? ((await getRolesDetail(initialValue)) as any) : null
  if (!!existingRole) {
    initialValue.permission = Object.fromEntries(
      existingRole?.data?.permission.map((key: any) => [key, true])
    )
  }

  const permissionGrouping = permission?.data?.reduce((acc: any, item: any) => {
    if (!acc[item.group]) {
      acc[item.group] = []
    }
    acc[item.group].push(item)
    return acc
  }, {})

  return <FormPatchRole permission={permissionGrouping} initialValue={initialValue} />
}

export default RoleDetail
