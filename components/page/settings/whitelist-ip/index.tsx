/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Copy, Globe, Plus, Trash } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogPortal
} from '@/components/ui/alert-dialog'
import FormAddWhitelistIP from './form-add-whitelist-ip'
import ContentConfirmation from '@/components/content-confirmation'
import SearchInput from '@/components/form/search-input'
import { copyToClipboard } from '@/lib/copy-to-clipboard'
import { useWhitelist } from '@/hooks/useWhitelist'
import { usePost } from '@/hooks/usePost'
import { deleteWhitelistIp } from '@/service/setting'
import { toast } from 'sonner'

const Page = ({ data, parent_id }: any) => {
  const [isAlertDialogAddWhitelistIPOpen, setIsAlertDialogAddWhitelistIPOpen] = useState(false)
  const [isAlertDialogDeleteIpOpen, setIsAlertDialogDeleteIpOpen] = useState(false)
  const [selectedip, setSelectedip] = useState<string>('')
  const handleAddExpenses = () => {
    setIsAlertDialogAddWhitelistIPOpen(true)
  }
  const handleClickDelete = (ip: string) => {
    setSelectedip(ip)
    setIsAlertDialogDeleteIpOpen(true)
  }
  const { list, fetchWhitelist } = useWhitelist()

  const { post } = usePost(deleteWhitelistIp)
  const refetch = () => {
    fetchWhitelist(parent_id)
  }

  const handleDeleteIp = (data: string) => {
    post(
      {
        dealer_id: parent_id,
        ip: data
      },
      {
        onSuccess: () => {
          toast.success('Success', {
            description: <p>New Whitelist IP deleted</p>
          })
          refetch()
          setIsAlertDialogDeleteIpOpen(false)
        }
      }
    )
  }
  const finalData = list?.length > 0 ? list : data?.data
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <SearchInput param="" placeholder="Search IP..." />
        <Button onClick={handleAddExpenses} variant="default">
          <Plus />
          {'Add IP'}
        </Button>
        <AlertDialog
          open={isAlertDialogAddWhitelistIPOpen}
          onOpenChange={setIsAlertDialogAddWhitelistIPOpen}>
          <AlertDialogPortal>
            <AlertDialogTitle></AlertDialogTitle>
            <AlertDialogContent className="flex flex-col p-0 overflow-hidden">
              <FormAddWhitelistIP
                onSuccess={refetch}
                parent_id={parent_id}
                setIsAlertDialogOpen={setIsAlertDialogAddWhitelistIPOpen}
              />
            </AlertDialogContent>
          </AlertDialogPortal>
        </AlertDialog>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {finalData.map((item: any, index: any) => (
          <Card key={item} className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <Button variant="outline" size="sm">
                {(index + 1).toString()}
              </Button>
              <Globe className="text-blue-950 size-4" />
              <span className="text-sm font-medium text-blue-950">{item}</span>
              <Button
                variant="outline"
                className="size-6 text-neutral-300"
                onClick={() => copyToClipboard(item)}>
                <Copy />
              </Button>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-red-950"
              onClick={() => handleClickDelete(item)}>
              <Trash />
              {'Delete'}
            </Button>
          </Card>
        ))}
      </div>
      <AlertDialog open={isAlertDialogDeleteIpOpen} onOpenChange={setIsAlertDialogDeleteIpOpen}>
        <AlertDialogPortal>
          <AlertDialogTitle></AlertDialogTitle>
          <AlertDialogContent className="flex flex-col p-0 overflow-hidden">
            <ContentConfirmation
              handleOnSubmit={handleDeleteIp}
              setIsAlertDialogOpen={setIsAlertDialogDeleteIpOpen}
              data={selectedip}
            />
          </AlertDialogContent>
        </AlertDialogPortal>
      </AlertDialog>
    </div>
  )
}

Page.displayName = 'PageSettingWhitelistIp'

export default Page
