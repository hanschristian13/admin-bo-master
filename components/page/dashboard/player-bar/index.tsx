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

  // For distribution between new and active players
  const getDistributionPercentage = (value: number, total: number): number => {
    // If total is zero, avoid division by zero
    if (total === 0) return 0;
    return (value / total) * 100;
  };

  // Calculate percentages of total players
  const totalPlayers = safeNewRegister + safeActive;
  const newRegisterPercent = getDistributionPercentage(safeNewRegister, totalPlayers);
  const activePlayerPercent = getDistributionPercentage(safeActive, totalPlayers);

  // Calculate percentage changes vs yesterday
  const newRegisterChange = getPercentageChange(safeNewRegister, safeYesterdayNewRegister);
  const activePlayerChange = getPercentageChange(safeActive, safeYesterdayActive);

  return (
    <div className='bg-neutral-100 flex space-x-[6px] rounded-md p-[6px] w-full mb-[112px]'>
      <ProgressBar
        title='new register member'
        progress={newRegisterPercent || 0}
        style='orange'
        numberOfPlayer={safeNewRegister}
        progressTodayVsYesterday={newRegisterChange}
      />
      <ProgressBar
        title='active player'
        progress={activePlayerPercent || 0}
        style='green'
        numberOfPlayer={safeActive}
        detailPosition='center'
        progressTodayVsYesterday={activePlayerChange}
      />
    </div>
  )
}

export default PlayerBar