/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { Globe } from 'lucide-react'
import { DataTable } from '@/components/data-table'
import DotStatus from '@/components/dot-status'
import ButtonBack from '@/components/form/button-back'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { formatNumberWithCommas } from '@/lib/format-number'
import { usePathname } from 'next/navigation'
import { ColumnsPlayerTransaction } from './column'
import { useHandlePagination } from '@/hooks'
import { Dialog, DialogContent } from '@/components/ui/dialog'

const Page = ({ data, summary }: { data: any; summary: any }) => {
  const pathname = usePathname()
  const handleName = pathname.split('/')[3]
  const handleInitial = handleName.charAt(0)
  const lastLogin = '-'

  const { pagination, onPaginationChange } = useHandlePagination()

  const [modalIframe, setModalIframe] = useState<any>(null)

  return (
    <>
      <Dialog onOpenChange={setModalIframe} open={!!modalIframe}>
        <DialogContent
          style={{
            minWidth: '800px',
            height: 'calc(100vh - 200px)',
            padding: 30
          }}>
          <iframe
            src={modalIframe}
            width="100%"
            height="100%"
            style={{ border: 'none', borderRadius: 8, height: '100%', width: '100%' }}
            allowFullScreen
            title="NTRPlay Replays"
          />
        </DialogContent>
      </Dialog>
      <div className="space-y-6">
        <ButtonBack url="/player" />
        {/* <div className="flex justify-between items-center gap-x-2.5">
        <SearchInput param="" placeholder="Search..." />
      </div> */}
        <div className="grid auto-rows-min gap-4 xl:grid-cols-3 2xl:grid-cols-4">
          <Card className="w-full h-fit">
            <CardContent className="flex flex-col items-center pt-6 pb-5 space-y-5 relative">
              <Image
                alt=""
                src="/assets/images/background-card-super-agent.webp"
                unoptimized
                fill
                sizes="100vw"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'top center',
                  zIndex: 0
                }}
              />
              <div className="relative z-[1] size-[124px] rounded-full bg-[#FFBC00] text-white text-[64px] font-bold flex items-center justify-center">
                {handleInitial.toUpperCase()}
              </div>
              <div className="relative z-[1] w-full flex flex-col items-center gap-y-2 text-sm font-medium text-neutral-300">
                <h5 className="capitalize text-xl text-neutral-400 font-semibold">{handleName}</h5>
                <div className="flex w-full justify-center gap-2 xl:justify-between">
                  <div className="flex gap-x-2 items-center">
                    <div className="size-4 flex items-center justify-center">
                      <DotStatus style="green" />
                    </div>
                    {'Last Login'}
                  </div>
                  <span>{lastLogin}</span>
                </div>
                <div className="flex w-full justify-center gap-2 xl:justify-between">
                  <div className="flex gap-x-2 items-center">
                    <Globe className="size-4" />
                    {'Using IP'}
                  </div>
                  <div>-</div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-center border-t border-neutral-200 py-3 text-sm font-medium">
              <span className="text-neutral-300">All Transaction</span>
              <span className="text-neutral-400">{summary?.data?.total_transactions}</span>
            </CardFooter>
            <CardFooter className="grid grid-cols-2 border-t border-neutral-200 divide-x divide-neutral-200 p-0 text-sm font-medium text-neutral-300">
              <div className="flex flex-col items-center py-3">
                <span>Total Turnover</span>
                <div className="flex items-center">
                  <span>Rp</span>
                  <span className="text-neutral-400 font-semibold">
                    {formatNumberWithCommas(summary?.data?.turnover, 0)}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center py-3">
                <span>Total Win</span>
                <div className="flex items-center">
                  <span>Rp</span>
                  <span className="text-neutral-400 font-semibold">
                    {formatNumberWithCommas(summary?.data?.win_player, 0)}
                  </span>
                </div>
              </div>
            </CardFooter>
          </Card>
          <div className="grid auto-rows-min xl:col-span-2 2xl:col-span-3">
            <DataTable
              rowCount={data?.total_items || 0}
              pagination={pagination}
              data={data?.data || []}
              columns={ColumnsPlayerTransaction({ onClickAction: setModalIframe })}
              onPaginationChange={onPaginationChange}
            />
          </div>
        </div>
      </div>
    </>
  )
}

Page.displayName = 'PageWebsiteManagementPlayerDetail'

export default Page
