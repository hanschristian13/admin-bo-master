import React from 'react'
import { TrendingUp, TrendingDown, TrendingUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatNumberWithCommas } from '@/lib/format-number'

const ProgressStatus = ({ progress }: { progress: number }) => {
  return (
    <div
      className={cn(
        'flex items-center space-x-1 font-medium',
        progress > 0 && 'text-green-950',
        progress < 0 && 'text-red-950',
        progress === 0 && 'text-orange-950'
      )}>
      {progress > 0 && <TrendingUp className="size-4" />}
      {progress < 0 && <TrendingDown className="size-4" />}
      {progress === 0 && <TrendingUpDown className="size-4" />}
      <span className="">{formatNumberWithCommas(progress, 2)}%</span>
    </div>
  )
}

export default ProgressStatus
