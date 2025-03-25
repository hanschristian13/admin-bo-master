import Image from 'next/image'
import React from 'react'

interface NoDataProps {
  title: string
  description?: string
}

const NoData = ({
  title,
  description
}: NoDataProps) => {
  return (
    <div className='flex flex-col items-center gap-y-4 bg-neutral-150 p-4 rounded-xl'>
      <Image
        alt=''
        width={210}
        height={104}
        src='/assets/images/nodata.webp'
      />
      <div className='flex flex-col gap-y-0.5 items-center'>
        <h5 className='text-base font-semibold text-neutral-400'>{title}</h5>
        {description ? <p className='text-sm font-medium text-neutral-300'>{description}</p> : null}
      </div>
    </div>
  )
}

export default NoData
