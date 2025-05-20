'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import SearchInput from '@/components/form/search-input'
import { chartDataTurnoverAndProfit, dataProfit, dataSuperAgent } from '@/mock/games'
import CardSuperAgent from '@/components/page/super-agent/card-super-agent'
import { Card } from '@/components/ui/card'
import { useParams, usePathname, useRouter } from 'next/navigation'
import ButtonBack from '@/components/form/button-back'
import { Copy, Globe, KeyRound, Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer'
import InitialAvatar from '@/components/initial-avatar'
import { copyToClipboard } from '@/lib/copy-to-clipboard'
import CardDashboardToday from '@/components/page//dashboard/card-dashboard-today'
import ChartTurnoverAndProfit from '@/components/page//dashboard/monthly/chart-turnover-and-profit'
import DotStatus from '@/components/dot-status'
import { cn } from '@/lib/utils'
import CardAgentDetail from '@/components/card-agent-detail'

interface AgentType {
  name: string
  code: string
  status: string
  total_agent: number
}
const Page: React.FC = ({}) => {
  const params = useParams()
  const superAgentId = params.id
  const router = useRouter()
  const pathname = usePathname()
  const handleName = pathname.split('/')[2]
  const status = 'active'
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<AgentType>({
    name: '',
    code: '',
    status: '',
    total_agent: 0
  })
  const handleShowDetailAgent = (data: AgentType) => {
    setSelectedAgent(data)
    setIsDrawerOpen(true)
  }
  return (
    <div className="space-y-6">
      <ButtonBack url="/super-agent" />
      <div className="flex justify-between items-center gap-x-2.5">
        <SearchInput param="agentId" placeholder="Search Agent..." />
        <Button variant="default" onClick={() => router.push(`/super-agent/${superAgentId}/new`)}>
          <Plus />
          Create agent
        </Button>
      </div>
      <div className="grid auto-rows-min gap-4 xl:grid-cols-3 2xl:grid-cols-4">
        <CardAgentDetail name={handleName} status={status} />
        <div className="grid md:grid-cols-2 auto-rows-min gap-4 xl:col-span-2  xl:grid-cols-2 2xl:grid-cols-3 2xl:col-span-3">
          {dataSuperAgent.map(item => (
            <CardSuperAgent
              key={item.name}
              name={item.name}
              code={item.code}
              status={item.status === 'active' ? true : false}
              total_agent={item.total_agent}
              onClickEdit={e => {
                e.stopPropagation()
                router.push(`/super-agent/${superAgentId}/${item.code.toLowerCase()}`)
              }}
              onClickCard={() => handleShowDetailAgent(item)}
            />
          ))}
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} direction="right">
            <DrawerContent className="rounded-md data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:sm:max-w-xl">
              <div className="mx-auto w-full">
                <DrawerHeader className="flex flex-row items-start justify-between w-full px-4 py-5">
                  <DrawerTitle className="hidden"></DrawerTitle>
                  <div className="flex gap-x-3 items-start">
                    <Image
                      alt=""
                      width={42}
                      height={42}
                      src="/assets/images/dialog-header.webp"
                      unoptimized
                    />
                    <div className="flex flex-col justify-center">
                      <h5 className="text-base font-semibold text-neutral-400">
                        Update super agent
                      </h5>
                      <span className="text-sm font-normal text-neutral-300">
                        This method allows to create new maintenances.
                      </span>
                    </div>
                  </div>
                  <DrawerClose asChild>
                    <Button
                      variant={'ghost'}
                      type="button"
                      className="has-[>svg]:p-1 size-5"
                      onClick={() => setIsDrawerOpen(false)}>
                      <X className="size-5 text-neutral-300" />
                    </Button>
                  </DrawerClose>
                </DrawerHeader>
                <div className="flex flex-col">
                  <div className="grid grid-cols-3 border-t border-neutral-200 p-4 gap-x-4 text-neutral-400">
                    <div className="flex flex-col space-y-2">
                      <span className="text-sm font-medium">Name</span>
                      <div className="flex items-center gap-x-2 w-fit text-xs font-semibold">
                        <InitialAvatar name={selectedAgent.name} />
                        {selectedAgent.name}
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <span className="text-sm font-medium">Code</span>
                      <Card className="w-fit px-3 py-1 rounded-md text-xs font-semibold">
                        {selectedAgent.code}
                      </Card>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <span className="text-sm font-medium">Status</span>
                      <Card
                        className={cn(
                          'w-fit flex items-center gap-2 px-3 py-1 rounded-md text-xs font-semibold capitalize',
                          status === 'active' ? 'text-green-950' : 'text-neutral-400'
                        )}>
                        <DotStatus
                          color={status === 'active' ? 'rgb(41,132,90)' : 'rgb(97,97,97)'}
                        />
                        <span>{status}</span>
                      </Card>
                    </div>
                  </div>
                  <div className="px-4 py-3 flex flex-col gap-y-3 text-sm font-medium bg-neutral-100">
                    <div className="flex items-center justify-between">
                      <span>API Key</span>
                      <div className="flex items-center gap-x-2">
                        <KeyRound className="text-neutral-300" />
                        <span className="w-80 min-w-80 truncate">
                          4498d632-9be6-4a52-9a71-8e3e0b3d671e
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="has-[>svg]:p-1 size-6"
                          onClick={() => copyToClipboard('4498d632-9be6-4a52-9a71-8e3e0b3d671e')}>
                          <Copy className="size-4 text-neutral-300" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Lobby URL</span>
                      <div className="flex items-center gap-x-2">
                        <Globe className="text-blue-950" />
                        <span className="w-80 min-w-80 truncate">
                          https://dribbble.com/shots/22092330-New-Dashboard-UI-for-Grow
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="has-[>svg]:p-1 size-6"
                          onClick={() =>
                            copyToClipboard(
                              'https://dribbble.com/shots/22092330-New-Dashboard-UI-for-Grow'
                            )
                          }>
                          <Copy className="size-4 text-neutral-300" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>API URL</span>
                      <div className="flex items-center gap-x-2">
                        <Globe className="text-blue-950" />
                        <span className="w-80 min-w-80 truncate">
                          4498d632-9be6-4a52-9a71-8e3e0b3d671e
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="has-[>svg]:p-1 size-6"
                          onClick={() => copyToClipboard('4498d632-9be6-4a52-9a71-8e3e0b3d671e')}>
                          <Copy className="size-4 text-neutral-300" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 grid auto-rows-min gap-4 lg:grid-cols-2">
                    {dataProfit.slice(0, 2).map(item => (
                      <CardDashboardToday
                        key={item.title}
                        title={item.title}
                        amount={item.amount}
                        progress={item.percen}
                      />
                    ))}
                    <div className="lg:col-span-2 min-h-[calc(100vh-84px-93px-120px-118px-32px-16px)] flex-1">
                      <ChartTurnoverAndProfit data={chartDataTurnoverAndProfit.slice(0, 2)} />
                    </div>
                  </div>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  )
}

export default Page
