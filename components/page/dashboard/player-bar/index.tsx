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
  // Ensure all inputs are numbers and not undefined
  const safeNewRegister = newRegisterPlayer || 0;
  const safeActive = activePlayer || 0;
  const safeYesterdayNewRegister = newlyRegisteredPlayerfromYesterday || 0;
  const safeYesterdayActive = newlyActivePlayerfromYesterday || 0;

  // Safe percentage calculation that handles edge cases
  const getPercentageChange = (current: number, previous: number): number => {
    // If both are zero, no change (0%)
    if (current === 0 && previous === 0) return 0;
    
    // If previous was zero but current isn't, that's a 100% increase
    if (previous === 0 && current > 0) return 100;
    
    // If previous wasn't zero, calculate normal percentage
    return previous === 0 ? 0 : ((current - previous) / Math.abs(previous)) * 100;
  };

  // Calculate total players with a minimum value of 1 to prevent division by zero
  const totalPlayers = Math.max(safeNewRegister + safeActive, 1);
  
  // Calculate percentages with a minimum of 1% to ensure visibility
  let newRegisterPercent = (safeNewRegister / totalPlayers) * 100;
  let activePlayerPercent = (safeActive / totalPlayers) * 100;
  
  // Ensure bars have a minimum width for visibility when there are players
  if (safeNewRegister > 0 && newRegisterPercent < 1) newRegisterPercent = 1;
  if (safeActive > 0 && activePlayerPercent < 1) activePlayerPercent = 1;
  
  // If both are zero, give them equal visual space
  if (safeNewRegister === 0 && safeActive === 0) {
    newRegisterPercent = 50;
    activePlayerPercent = 50;
  }

  // Calculate percentage changes vs yesterday
  const newRegisterChange = getPercentageChange(safeNewRegister, safeYesterdayNewRegister);
  const activePlayerChange = getPercentageChange(safeActive, safeYesterdayActive);

  return (
    <div className='bg-neutral-100 flex space-x-[6px] rounded-md p-[6px] w-full mb-[112px]'>
      <ProgressBar
        title='new register member'
        progress={newRegisterPercent}
        style='orange'
        numberOfPlayer={safeNewRegister}
        progressTodayVsYesterday={newRegisterChange}
      />
      <ProgressBar
        title='active player'
        progress={activePlayerPercent}
        style='green'
        numberOfPlayer={safeActive}
        detailPosition='center'
        progressTodayVsYesterday={activePlayerChange}
      />
    </div>
  )
}

export default PlayerBar