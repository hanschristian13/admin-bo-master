import React from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import { AlertDialogHeader } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

interface AlertDialogHeaderTemplateProps {
  setDialogOpen: (val: boolean) => void,
  title: string,
  subtitle: string
}

const AlertDialogHeaderTemplate: React.FC<AlertDialogHeaderTemplateProps> = ({
  setDialogOpen,
  title,
  subtitle
}) => {
  return (
    <AlertDialogHeader className='flex flex-row items-start justify-between w-full px-4 py-5 border-b border-neutral-250'>
      <div className='flex gap-x-3 items-start'>
        <Image
          alt=''
          width={42}
          height={42}
          src='/assets/images/dialog-header.webp'
          unoptimized
          quality={100}
        />
        <div className='flex flex-col justify-center'>
          <span className='text-base font-semibold text-neutral-400'>{title}</span>
          <p className='text-sm font-normal text-neutral-300'>{subtitle}</p>
        </div>
      </div>
      <Button
        variant={'ghost'}
        type='button'
        className='has-[>svg]:p-1 size-5'
        onClick={() => setDialogOpen(false)}
      >
        <X className='size-5 text-neutral-300' />
      </Button>
    </AlertDialogHeader>
  )
}

export default AlertDialogHeaderTemplate