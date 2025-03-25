'use client'
import React from 'react'
import ProgressBar from '@/components/page/dashboard/player-bar/bar'

interface PlayerBarProps {
  newRegisterPlayer: number
  activePlayer: number
  newlyRegisteredPlayerfromYesterday: number
  newlyActivePlayerfromYesterday: number
}
const PlayerBar = ({
  newRegisterPlayer,
  activePlayer,
  newlyRegisteredPlayerfromYesterday,
  newlyActivePlayerfromYesterday
}: PlayerBarProps) => {
  const progressNewRegister = newRegisterPlayer / (newRegisterPlayer + activePlayer) * 100
  const progressActivePlayer = activePlayer / (newRegisterPlayer + activePlayer) * 100

  const progressNewRegisterVsYesterday = (newRegisterPlayer - newlyRegisteredPlayerfromYesterday) / newlyRegisteredPlayerfromYesterday * 100
  const progressActivePlayerVsYesterday = (activePlayer - newlyActivePlayerfromYesterday) / newlyActivePlayerfromYesterday * 100
  return (
    <div className='bg-neutral-100 flex space-x-[6px] rounded-md p-[6px] w-full mb-[112px]'>
      <ProgressBar
        title='new register member'
        progress={progressNewRegister}
        style='orange'
        numberOfPlayer={newRegisterPlayer}
        progressTodayVsYesterday={progressNewRegisterVsYesterday}
      />
      <ProgressBar
        title='active player'
        progress={progressActivePlayer}
        style='green'
        numberOfPlayer={activePlayer}
        detailPosition='center'
        progressTodayVsYesterday={progressActivePlayerVsYesterday}
      />
    </div>
  )
}

export default PlayerBar