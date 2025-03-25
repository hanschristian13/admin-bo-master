import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'

const ButtonBack = ({
  url = '/'
}: {
  url: string
}) => {
  const router = useRouter()
  return (
    <Button
      variant={'outline'}
      size='sm'
      onClick={() => router.push(url)}
      className='text-neutral-600 capitalize space-x-2'
      type='button'
    >
      <ChevronLeft className='size-4 text-neutral-300' />
      Back
    </Button>
  )
}

export default ButtonBack
