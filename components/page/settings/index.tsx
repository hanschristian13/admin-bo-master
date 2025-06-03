/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import dynamic from 'next/dynamic'
import SettingAdmin from '@/components/page/settings/admin'
import { getCookie } from '@/app/action/libs'
import { getWhitelistIp } from '@/service/setting'
import { getSearchParams } from '@/constant'

const SetingWhitelistIp = dynamic(() => import('@/components/page/settings/whitelist-ip'))

const page = async ({ currentSearchParams }: any) => {
  const parent_id = await getCookie('parentId')
  const allIps = (await getWhitelistIp(parent_id!)) as any

  const { q } = getSearchParams(currentSearchParams)
  const ip = allIps?.data?.filter((item: string) => item.includes(q || ''))
  return (
    <div className="">
      <Tabs defaultValue="admin" className="gap-4">
        <TabsList className="grid grid-cols-2 gap-x-1">
          <TabsTrigger className="capitalize" value="admin">
            admin
          </TabsTrigger>
          <TabsTrigger className="capitalize" value="whitelist">
            whitelist IP
          </TabsTrigger>
        </TabsList>
        <TabsContent value="admin">
          <SettingAdmin parent_id={parent_id} currentSearchParams={currentSearchParams} />
        </TabsContent>
        <TabsContent value="whitelist">
          <SetingWhitelistIp parent_id={parent_id} data={ip} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

page.displayName = 'PageDashboard'

export default page
