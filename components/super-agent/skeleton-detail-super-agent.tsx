import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const SkeletonDetailSuperAgent = () => {
  return (
    <div className='space-y-6'>
      <Skeleton className='h-9 w-44' />
      <div className='flex justify-between items-center gap-x-2.5'>
        <Skeleton className='h-9 w-3xs' />
        <Skeleton className='h-9 w-44' />
      </div>
      <div className='grid auto-rows-min gap-4 xl:grid-cols-3 2xl:grid-cols-4'>
        <Skeleton className='h-[319px] w-full' />
        <div className='grid md:grid-cols-2 auto-rows-min gap-4 xl:col-span-2  xl:grid-cols-2 2xl:grid-cols-3 2xl:col-span-3'>
          {Array.from({ length: 6 }, (_, item) => (
            <Skeleton key={item} className="w-full h-40" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SkeletonDetailSuperAgent
