import ProgressStatus from '@/components/progress-status'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import React from 'react'

const ProgressBar = ({ 
  progress, 
  style = 'orange', 
  title, 
  numberOfPlayer, 
  detailPosition = 'left',
  progressTodayVsYesterday
}: { 
  progress: number, 
  style: "orange" | "green", 
  title: string, 
  numberOfPlayer: number, 
  detailPosition?: "left" | "center",
  progressTodayVsYesterday: number
}) => {
  // Ensure progress is at least 1% for visibility (if there are players)
  // This prevents bars from disappearing completely when they have a very small percentage
  const displayProgress = numberOfPlayer > 0 ? Math.max(progress, 1) : progress;
  
  return (
    <div
      className={cn("container-progress-bar-player relative min-w-[100px]",
        style === "orange" && "bg-orange-950",
        style === "green" && "bg-green-950"
      )}
      style={{
        width: `${displayProgress}%`,
      }}
    >
      <div className={cn('detail-progress-bar-player absolute z-[1] top-[26px] p-3 space-y-[16px] w-fit',
        detailPosition === 'left' && "left-0",
        detailPosition === 'center' && "left-0 right-0 mx-auto",
      )}>
        <Card className={cn('px-2 py-[2px] rounded-md w-fit capitalize text-sm font-semibold text-neutral-300',
          style === "orange" ? "text-orange-950" : "text-green-950"
        )}>
          <span>{title}</span>
        </Card>
        <div className='flex items-center space-x-[10px] text-sm text-neutral-300 whitespace-nowrap'>
          <span className={cn('w-1 h-[14px] rounded-3xl',
            style === "orange" && "bg-orange-950",
            style === "green" && "bg-green-950"
          )}>{''}</span>
          <div>
            <span className='text-neutral-600'>{numberOfPlayer}</span>{' '}
            <span>Player</span>
          </div>
          <ProgressStatus progress={progressTodayVsYesterday} />
          <span>from yesterday</span>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar