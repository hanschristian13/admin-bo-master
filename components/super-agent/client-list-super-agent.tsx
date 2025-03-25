'use client'

import React, { useId, useState } from 'react'
import CardSuperAgent from '@/components/super-agent/card-super-agent'
import { AlertDialog, AlertDialogContent, AlertDialogPortal } from '@/components/ui/alert-dialog'
import FormSuperAgent from '@/components/form/super-agent'
import { useRouter } from 'next/navigation'
import SearchInput from '@/components/form/search-input'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { ClientListSuperAgentProps, SuperAgentType, SuperAgentTypeV2 } from '@/types/super-agent'
import NoData from '@/components/no-data'
import PaginationCustomize from '@/components/pagination'

const ClientListSuperAgent: React.FC<ClientListSuperAgentProps> = ({ data, total_page }) => {
  const id = useId()
  const router = useRouter()

  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState<boolean>()
  const [handleData, sethandleData] = useState<SuperAgentTypeV2 | undefined>()
  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>, data: SuperAgentType) => {
    e.stopPropagation()
    // sethandleData(data)
    sethandleData({
      agent_name: data?._id || '',
      email: '',
      phone_number: '',
      type: data?.type || '',
      short_code: data?.short_code || '',
      active: data?.active || false
    })
    setIsAlertDialogOpen(true)
  }
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-x-2.5">
        <SearchInput param="q" placeholder="Seacrh super agent..." />
        <Button
          variant="default"
          onClick={() => {
            sethandleData(undefined)
            setIsAlertDialogOpen(true)
          }}>
          <Plus />
          Create Super Agent
        </Button>
      </div>
      <div className="space-y-5">
        {data && data?.length > 0 ? (
          <div className="grid auto-rows-min gap-4 md:grid-cols-2 xl:grid-cols-3">
            {data?.map(item => (
              <CardSuperAgent
                key={id + item._id}
                name={item._id}
                code={item.short_code}
                status={item.active}
                total_agent={item?.subdealer_id?.length}
                onClickEdit={e => handleEdit(e, item)}
                onClickCard={() => {
                  router.push(`/super-agent/?superAgentId=${item._id.toLocaleLowerCase()}`)
                }}
              />
            ))}
            <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
              <AlertDialogPortal>
                <AlertDialogContent className="flex flex-col p-0 overflow-hidden">
                  <FormSuperAgent setIsAlertDialogOpen={setIsAlertDialogOpen} data={handleData} />
                </AlertDialogContent>
              </AlertDialogPortal>
            </AlertDialog>
          </div>
        ) : (
          <div className="m-auto">
            <NoData title="Nothing to display" />
          </div>
        )}

        {total_page > 1 ? <PaginationCustomize totalPages={total_page} /> : null}
      </div>
    </div>
  )
}

ClientListSuperAgent.displayName = 'ClientListSuperAgent'

export default ClientListSuperAgent
