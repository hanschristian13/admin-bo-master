/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { useRouter, useSearchParams } from 'next/navigation'
import { Copy, Globe, KeyRound, X } from 'lucide-react'
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
import { calculatePercentageChange, cn } from '@/lib/utils'
import { DataSuperAgentType, SuperAgentType } from '@/types/super-agent'
import CardAgent from '@/components/form/agent/card-agent'
import { resAgentTransaction } from '@/service/agent'
import PaginationCustomize from '@/components/pagination'

const ListAgent = ({
  data,
  superAgentId,
  transactionAgent
}: {
  // data: SuperAgentType[] | undefined,
  data: DataSuperAgentType | null
  superAgentId: string
  transactionAgent: resAgentTransaction | null | undefined
}) => {
  const router = useRouter()
  const status = 'active'
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<SuperAgentType>()
  const searchParams = useSearchParams()
  const currentPage = searchParams.get('page')

  const handleDataTransaction = useMemo(() => {
    if (transactionAgent && typeof transactionAgent === 'object') {
      const toToday = transactionAgent?.data?.[0]?.turnover || 0
      const toYesterday = transactionAgent?.data?.[1]?.turnover || 0
      const dataTurnover = {
        amount: typeof transactionAgent === 'object' ? transactionAgent?.data?.[0]?.turnover : 0,
        progress:
          typeof transactionAgent === 'object' ? calculatePercentageChange(toToday, toYesterday) : 0
      }

      const profitToday = transactionAgent?.data?.[0]?.profit || 0
      const profitYesterday = transactionAgent?.data?.[1]?.profit || 0
      const dataProfit = {
        amount: typeof transactionAgent === 'object' ? transactionAgent?.data?.[0]?.profit : 0,
        progress:
          typeof transactionAgent === 'object'
            ? calculatePercentageChange(profitToday, profitYesterday)
            : 0
      }
      return {
        turnover: { ...dataTurnover },
        profit: { ...dataProfit },
        chart: [
          { month: 'Yesterday', turnover: toYesterday, profit: profitYesterday },
          { month: 'Today', turnover: toToday, profit: profitToday }
        ]
      }
    }
  }, [transactionAgent])

  return (
    <div className="xl:col-span-2 2xl:col-span-3 flex flex-col gap-y-5">
      <div className="w-full grid md:grid-cols-2 auto-rows-min gap-4 xl:grid-cols-2 2xl:grid-cols-3">
        {data &&
          data?.data?.map(item => (
            <CardAgent
              key={item?._id}
              name={item?._id}
              code={item?.short_code}
              status={item?.active}
              onClickEdit={e => {
                e.stopPropagation()
                router.push(
                  `/super-agent/?superAgentId=${superAgentId}&agentId=${item._id.toLowerCase()}&mode=update-agent`
                )
              }}
              onClickCard={() => {
                // handleShowDetailAgent(item)
                setSelectedAgent(item)
                setIsDrawerOpen(true)
                router.push(
                  `/super-agent/?superAgentId=${superAgentId}&detailId=${item._id.toLowerCase()}&mode=detail-agent`
                )
              }}
            />
          ))}
      </div>
      {data && data?.total_page > 1 ? <PaginationCustomize totalPages={data?.total_page} /> : null}
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
                  <h5 className="text-base font-semibold text-neutral-400">Agent Detail</h5>
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
              <div className="w-full grid grid-cols-3 border-t border-neutral-200 p-4 gap-x-4 text-neutral-400">
                <div className="flex flex-col space-y-2">
                  <span className="text-sm font-medium">Name</span>
                  <div className="flex items-center gap-x-2 w-fit text-xs font-semibold">
                    <InitialAvatar name={selectedAgent?._id || ''} />
                    {selectedAgent?._id}
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <span className="text-sm font-medium">Code</span>
                  <Card className="w-fit px-3 py-1 rounded-md text-xs font-semibold">
                    {selectedAgent?.short_code}
                  </Card>
                </div>
                <div className="flex flex-col space-y-2">
                  <span className="text-sm font-medium">Status</span>
                  <Card
                    className={cn(
                      'w-fit flex items-center gap-2 px-3 py-1 rounded-md text-xs font-semibold capitalize',
                      status === 'active' ? 'text-green-950' : 'text-neutral-400'
                    )}>
                    <DotStatus color={status === 'active' ? 'rgb(41,132,90)' : 'rgb(97,97,97)'} />
                    <span>{status}</span>
                  </Card>
                </div>
              </div>
              <div className="px-4 py-3 flex flex-col gap-y-3 text-sm font-medium bg-neutral-100">
                <div className="flex flex-col gap-y-1 items-start lg:flex-row lg:items-center lg:justify-between">
                  <span>API Key</span>
                  <div className="flex items-center gap-x-2">
                    <KeyRound className="text-neutral-300" />
                    <span className="w-44 min-w-44 lg:w-80 lg:min-w-80 truncate">
                      {selectedAgent?.api_key || '-'}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="has-[>svg]:p-1 size-6"
                      onClick={() => copyToClipboard(selectedAgent?.api_key as string)}>
                      <Copy className="size-4 text-neutral-300" />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col gap-y-1 items-start lg:flex-row lg:items-center lg:justify-between">
                  <span>Lobby URL</span>
                  <div className="flex items-center gap-x-2">
                    <Globe className="text-blue-950" />
                    <span className="w-44 min-w-44 lg:w-80 lg:min-w-80 truncate">
                      {selectedAgent?.client_environments?.[0]?.lobby_url || '-'}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="has-[>svg]:p-1 size-6"
                      onClick={() =>
                        copyToClipboard(
                          selectedAgent?.client_environments?.[0]?.lobby_url as string
                        )
                      }>
                      <Copy className="size-4 text-neutral-300" />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col gap-y-1 items-start lg:flex-row lg:items-center lg:justify-between">
                  <span>API URL</span>
                  <div className="flex items-center gap-x-2">
                    <Globe className="text-blue-950" />
                    <span className="w-44 min-w-44 lg:w-80 lg:min-w-80 truncate">
                      {selectedAgent?.client_environments?.[0]?.api_endpoint || '-'}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="has-[>svg]:p-1 size-6"
                      onClick={() =>
                        copyToClipboard(
                          selectedAgent?.client_environments?.[0]?.api_endpoint as string
                        )
                      }>
                      <Copy className="size-4 text-neutral-300" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-4 grid auto-rows-min gap-4 lg:grid-cols-2">
                {handleDataTransaction && (
                  <>
                    <CardDashboardToday
                      title="Total Turnover Slot"
                      amount={handleDataTransaction?.turnover?.amount || 0}
                      progress={handleDataTransaction?.turnover?.progress || 0}
                    />
                    <CardDashboardToday
                      title="Total Profit Slot"
                      amount={handleDataTransaction?.profit?.amount || 0}
                      progress={handleDataTransaction?.profit?.progress || 0}
                    />
                  </>
                )}
                <div className="lg:col-span-2 min-h-[calc(100vh-84px-93px-120px-118px-32px-16px)] flex-1">
                  {handleDataTransaction ? (
                    <ChartTurnoverAndProfit
                      data={handleDataTransaction ? handleDataTransaction?.chart : []}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default ListAgent
