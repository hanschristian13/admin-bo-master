import React from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import Image from 'next/image'
import BadgeStatus from './badge-status'

interface CardAgentDetail {
  name: string
  status: string
  short_code?: string
  total_agent?: number
}
const CardAgentDetail: React.FC<CardAgentDetail> = ({
  name,
  status,
  short_code,
  total_agent
}) => {
  return (
    <Card className='w-full h-fit'>
      <CardContent className='flex flex-col items-center pt-6 pb-5 space-y-5 relative'>
        <Image
          alt=''
          src='/assets/images/background-card-super-agent.webp'
          unoptimized
          fill
          sizes='100vw'
          style={{
            objectFit: 'cover',
            objectPosition: 'top center',
            zIndex: 0
          }}
        />
        <div className='relative z-[1] size-[124px] rounded-full bg-[#FFBC00] text-white text-[64px] font-bold flex items-center justify-center'>{name.charAt(0).toUpperCase()}</div>
        <div className='text-center space-y-2'>
          <BadgeStatus
            title={status}
            styleDotStatus={status === 'active' ? 'green' : 'neutral'}
          />
          <h5 className='capitalize text-xl font-semibold'>{name}</h5>
        </div>
      </CardContent>
      <CardFooter className='grid grid-cols-2 border-t border-neutral-200 divide-x divide-neutral-200 p-0'>
        <div className='flex flex-col items-center py-3'>
          <span>Code</span>
          <span>{short_code}</span>
        </div>
        <div className='flex flex-col items-center py-3'>
          <span>Total Agent</span>
          <span>{total_agent}</span>
        </div>
      </CardFooter>
    </Card>
  )
}

export default CardAgentDetail
