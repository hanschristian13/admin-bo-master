import React from 'react'
import { Card } from '@/components/ui/card'
import ProgressStatus from '@/components/progress-status'
import { formatNumberWithCommas } from '@/lib/format-number'

const CardDashboardToday = ({
  title,
  amount,
  progress
}: {
  title: string
  amount: number
  progress?: number
}) => {
  // Ensure we have valid values to display
  const safeAmount = amount || 0;
  const safeProgress = progress !== undefined ? progress : 0;
  
  // Check if amount is negative
  const isNegative = safeAmount < 0;
  
  return (
    <Card className="px-5 py-4 space-y-4 rounded-lg">
      <h5 className="text-sm font-medium text-neutral-300 capitalize">{title}</h5>
      <div className="space-y-0.5">
        <div className="font-medium">
          <span className="text-neutral-300">Rp </span>
          {isNegative && <span className="text-neutral-300">-</span>}
          <span className="text-base font-semibold text-neutral-400">
            {formatNumberWithCommas(Math.abs(safeAmount), 2)}
          </span>
        </div>
        <div className="flex items-center space-x-1 text-sm font-medium">
          <ProgressStatus progress={safeProgress} />
          <span className="text-base font-semibold text-neutral-300">from yesterday</span>
        </div>
      </div>
    </Card>
  )
}

export default CardDashboardToday