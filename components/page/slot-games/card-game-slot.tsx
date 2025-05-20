'use client'

import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import Image from 'next/image'
import React, { useActionState, useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogPortal
} from '@/components/ui/alert-dialog'
import { formatNumberWithCommas } from '@/lib/format-number'
import { changeGameSatatus } from '@/app/action/slot-games'

interface CardGameSlot {
  game_name: string
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CardGameSlot: React.FC<any> = ({ data, number }) => {
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false)

  const handleSwitchChange = () => {
    setIsAlertDialogOpen(true)
  }
  const [state] = useActionState(changeGameSatatus, data?.game_detail)

  const handleAlertDialogClose = () => {
    setIsAlertDialogOpen(false)
  }

  return (
    <Card className="flex flex-col overflow-hidden text-sm text-neutral-400">
      <form id="action-form-change-game-status" className="flex items-center justify-between p-5">
        <div className="flex space-x-3">
          <Image
            alt={'games name here'}
            src={'/assets/images/logo-login.webp'}
            width={40}
            height={40}
            className="bg-container-logo rounded-lg size-10"
            unoptimized
          />
          <div className="flex flex-col text-sm font-medium">
            <span className="text-neutral-300">Top #{number}</span>
            <span>{data?.game_name}</span>
          </div>
        </div>

        <Switch
          name="status"
          checked={state?.game_status}
          onCheckedChange={handleSwitchChange}
          id={data?.game_name}
        />

        <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
          <AlertDialogPortal>
            <AlertDialogTitle></AlertDialogTitle>
            <AlertDialogContent className="flex flex-col p-0 overflow-hidden">
              <div className="flex flex-col items-center p-5">
                <div className="size-10 rounded-lg bg-red-100"></div>
                <h5 className="mt-4 text-base font-medium text-neutral-400">Are you sure?</h5>
                <div className="text-center">
                  This action cannot be undone, all values associated with this field will be turned
                  off.
                </div>
              </div>
              <AlertDialogFooter className="w-full px-5 py-4 border-t border-neutral-200 bg-neutral-100">
                <AlertDialogCancel className="w-full" onClick={handleAlertDialogClose}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="w-full"
                  form="action-form-change-game-status"
                  type="submit"
                  onClick={() => {
                    changeGameSatatus(data?.game_detail)
                  }}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogPortal>
        </AlertDialog>
      </form>
      <div className="bg-neutral-100 border-t border-neutral-200 px-5 py-4 flex items-center justify-between">
        <span className="text-neutral-300">{'Total Player'}</span>
        <span>{data?.total_player}</span>
      </div>
      <div className="bg-neutral-100 border-t border-neutral-200 px-5 py-4 flex items-center justify-between">
        <span className="text-neutral-300">{'Total Turnover'}</span>
        <span>Rp {formatNumberWithCommas(data?.turnover)}</span>
      </div>
      <div className="bg-neutral-100 border-t border-neutral-200 px-5 py-4 flex items-center justify-between">
        <span className="text-neutral-300">{'Total Win'}</span>
        <span>Rp {formatNumberWithCommas(data?.win)}</span>
      </div>
    </Card>
  )
}

export default CardGameSlot
