'use client'
import { formatNumberWithCommas } from '@/lib/format-number'
import { iResponseGetOverviewDailyTransaction, iResponseGetTopGame } from '@/service/dashboard'
import Image from 'next/image'
import React, { FC, useState } from 'react'

interface data extends iResponseGetOverviewDailyTransaction {
  game_detail: iResponseGetTopGame | undefined
}
interface CardGamesProps {
  data: data
}
const CardGames: FC<CardGamesProps> = ({ data }) => {
  const [imgSrc, setImgSrc] = useState(data?.game_name ?? '/assets/images/logo-login.webp')
  return (
    <div className="flex items-center space-x-4 py-4 border-b border-neutral-250">
      <Image
        alt={data?.game_name}
        src={imgSrc}
        width={48}
        height={48}
        onError={() => setImgSrc('/assets/images/logo-login.webp')}
        className="bg-container-logo rounded-lg"
        unoptimized
      />
      <div className="flex flex-col space-x-4 text-sm font-medium text-neutral-400 capitalize">
        <div>{data?.game_name}</div>
        <div>
          <div>
            <span className="text-neutral-300">
              total turnover: Rp {formatNumberWithCommas(data?.turnover ? data?.turnover : 0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardGames
