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
  const getPercentageChange = (value: number, total: number): number => 
    total === 0 ? 0 : (value / total) * 100;

  // Calculate percentages of total players
  const totalPlayers = newRegisterPlayer + activePlayer;
  const newRegisterPercent = getPercentageChange(newRegisterPlayer, totalPlayers);
  const activePlayerPercent = getPercentageChange(activePlayer, totalPlayers);

  // Calculate percentage changes vs yesterday
  const newRegisterChange = getPercentageChange(
    newRegisterPlayer - newlyRegisteredPlayerfromYesterday, 
    newlyRegisteredPlayerfromYesterday
  );
  
  const activePlayerChange = getPercentageChange(
    activePlayer - newlyActivePlayerfromYesterday, 
    newlyActivePlayerfromYesterday
  );

  return (
    <div className='bg-neutral-100 flex space-x-[6px] rounded-md p-[6px] w-full mb-[112px]'>
      <ProgressBar
        title='new register member'
        progress={newRegisterPercent}
        style='orange'
        numberOfPlayer={newRegisterPlayer}
        progressTodayVsYesterday={newRegisterChange}
      />
      <ProgressBar
        title='active player'
        progress={activePlayerPercent}
        style='green'
        numberOfPlayer={activePlayer}
        detailPosition='center'
        progressTodayVsYesterday={activePlayerChange}
      />
    </div>
  )
}

export default PlayerBar