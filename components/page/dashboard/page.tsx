import React, { FC } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import DasboardDaily from '@/components/page/dashboard/daily'
import dynamic from 'next/dynamic'
// import { DashboardProps } from "@/components/page/dashboard/types"

const DashboardWeekly = dynamic(() => import('@/components/page/dashboard/weekly'))
const DashboardMonthly = dynamic(() => import('@/components/page/dashboard/monthly'))

const Page: FC = () => {
  return (
    <div className="">
      <Tabs defaultValue="today">
        <TabsList className="grid grid-cols-3 gap-x-1">
          <TabsTrigger className="capitalize" value="today">
            today
          </TabsTrigger>
          <TabsTrigger className="capitalize" value="weekly">
            weekly
          </TabsTrigger>
          <TabsTrigger className="capitalize" value="monthly">
            monthly
          </TabsTrigger>
        </TabsList>
        <TabsContent className="space-y-5 pt-[28px]" value="today">
          <DasboardDaily />
        </TabsContent>
        <TabsContent className="pt-[28px]" value="weekly">
          <DashboardWeekly />
        </TabsContent>
        <TabsContent className="space-y-5 pt-[28px]" value="monthly">
          <DashboardMonthly />
        </TabsContent>
      </Tabs>
    </div>
  )
}

Page.displayName = 'PageDashboard'

export default Page
