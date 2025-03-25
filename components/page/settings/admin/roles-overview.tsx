'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogPortal,
  AlertDialogFooter,
  AlertDialogCancel
} from "@/components/ui/alert-dialog"
import AlertDialogHeaderTemplate from '@/components/alert-dialog-header-template'
import { Card } from '@/components/ui/card'
import { Pencil } from 'lucide-react'
import BadgeStatus from '@/components/badge-status'
import Image from 'next/image'


const RolesOverview: React.FC = () => {
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  return (
    <React.Fragment>
      <Button
        className='text-neutral-600'
        onClick={() => setIsAlertDialogOpen(true)}
        variant='outline'>Roles Overview</Button>
      <AlertDialog 
        open={isAlertDialogOpen} 
        onOpenChange={setIsAlertDialogOpen}>
        <AlertDialogPortal>
          <AlertDialogTitle ></AlertDialogTitle>
          <AlertDialogContent className='flex gap-0 flex-col p-0 overflow-hidden'>
            <AlertDialogHeaderTemplate
              setDialogOpen={setIsAlertDialogOpen}
              title='Roles Overview'
              subtitle='This method allows to create new maintenances.'
            />
            <div className='space-y-3 p-4'>
              {['master', 'super-agent', 'agent'].map((item) => (
                <Card key={item} className='p-4 flex items-center justify-between gap-4'>
                  <div className='flex items-center gap-x-4'>
                    <div className='relative rounded-lg border border-neutral-250 size-16 overflow-hidden'>
                      <Image
                        alt=''
                        src={`/assets/images/bg-roles-${item}.webp`}
                        quality={100}
                        fill
                        sizes='100vw'
                        style={{
                          objectFit: 'cover',
                          objectPosition: 'bottom right'
                        }}
                        unoptimized
                      />
                    </div>
                    <BadgeStatus title={item === 'super-agent' ? 'super agent' : item} styleDotStatus={item === 'master' ? 'green' : item === 'super-agent' ? 'orange' : 'blue'} />
                  </div>
                  <Button variant='outline' size='sm'><Pencil /></Button>
                </Card>
              ))}
            </div>
            <AlertDialogFooter className='w-full px-5 py-4 border-t border-neutral-200'>
              <AlertDialogCancel className='w-full' onClick={() => setIsAlertDialogOpen(false)}>Cancel</AlertDialogCancel>
              <Button type="submit" className="w-full">
                Add
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogPortal>
      </AlertDialog>
    </React.Fragment>
  )
}

export default RolesOverview