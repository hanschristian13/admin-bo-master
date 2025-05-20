import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const SkeletonListSuperAgent = () => {
  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center gap-x-2.5'>
        <Skeleton className='h-9 w-3xs' />
        <Skeleton className='h-9 w-44' />
      </div>
      <div className='grid auto-rows-min gap-4 md:grid-cols-2 xl:grid-cols-3'>
        {Array.from({ length: 8 }, (_, item) => (
          <Skeleton key={item} className="w-full h-40" />
        ))}
      </div>
    </div>
  )
}

export default SkeletonListSuperAgent
