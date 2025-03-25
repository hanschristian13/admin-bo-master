'use client'

import React from 'react'
import { Card } from '@/components/ui/card'

import InitialAvatar from '@/components/initial-avatar'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import DotStatus from '@/components/dot-status'
import { cn } from '@/lib/utils'

interface CardSuperAgent {
  name: string
  code: string
  status: boolean
  onClickEdit: (event: React.MouseEvent<HTMLButtonElement>) => void
  onClickCard: (event: React.MouseEvent<HTMLDivElement>) => void
}

const CardAgent: React.FC<CardSuperAgent> = ({
  name, code, status, onClickEdit, onClickCard
}) => {
  return (
    <Card
      className='flex flex-col overflow-hidden text-sm text-neutral-400 cursor-pointer'
      onClick={onClickCard}
    >
      <div className='flex items-center justify-between p-5'>
        <div className='flex items-center space-x-3'>
          <InitialAvatar name={name} />
          <div className='flex flex-col text-sm font-medium capitalize'>
            <span>{name}</span>
          </div>
        </div>
        <Button
          variant='outline'
          onClick={onClickEdit}
        >
          <Pencil className='size-4' />
        </Button>
      </div>
      <div className='bg-neutral-100 border-t border-neutral-200 p-4 flex items-center gap-x-4 text-neutral-400'>
        <div className='flex flex-col space-y-2'>
          <span className='text-sm font-medium'>Code</span>
          <Card className='w-fit px-3 py-1 rounded-md text-xs font-semibold'>{code}</Card>
        </div>
        <div className='flex flex-col space-y-2'>
          <span className='text-sm font-medium'>Status</span>
          <Card className={cn('w-fit flex items-center gap-2 px-3 py-1 rounded-md text-xs font-semibold capitalize',
            status ? 'text-green-950' : 'text-neutral-400'
          )}>
            <DotStatus
              color={status ? 'rgb(41,132,90)' : 'rgb(97,97,97)'}
            />
            <span>{status ? 'active' : 'inactive'}</span>
          </Card>
        </div>
      </div>
    </Card>
  )
}

export default CardAgent
