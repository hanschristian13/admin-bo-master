import React, { FC } from "react"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import dynamic from "next/dynamic"
import SettingAdmin from '@/components/page/settings/admin'

const SetingWhitelistIp = dynamic(() => import("@/components/page/settings/whitelist-ip"))

const Page: FC = () => {
  return (
    <div className="">
      <Tabs defaultValue="admin" className="gap-4">
        <TabsList className="grid grid-cols-2 gap-x-1">
          <TabsTrigger className="capitalize" value="admin">admin</TabsTrigger>
          <TabsTrigger className="capitalize" value="whitelist">whitelist IP</TabsTrigger>
        </TabsList>
        <TabsContent value="admin">
          <SettingAdmin />
        </TabsContent>
        <TabsContent value="whitelist">
          <SetingWhitelistIp />
        </TabsContent>
      </Tabs>
    </div>
  )
}

Page.displayName = 'PageDashboard'

export default Page
