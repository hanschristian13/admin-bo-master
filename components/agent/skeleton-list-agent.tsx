import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const SkeletonListAgent = () => {
  return (
    <div className='grid auto-rows-min gap-4 md:grid-cols-2 xl:grid-cols-3'>
      {Array.from({ length: 8 }, (_, item) => (
        <Skeleton key={item} className="w-full h-40" />
      ))}
    </div>
  )
}

export default SkeletonListAgent
