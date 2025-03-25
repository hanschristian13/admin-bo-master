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
  return (
    <Card className="px-5 py-4 space-y-4 rounded-lg">
      <h5 className="text-sm font-medium text-neutral-300 capitalize">{title}</h5>
      <div className="space-y-0.5">
        <div className="font-medium">
          <span className="text-neutral-300">Rp</span>
          <span className="text-base font-semibold text-neutral-400">
            {formatNumberWithCommas(amount > 0 ? amount : amount * -1, 0)}
          </span>
        </div>
        {progress && (
          <div className="flex items-center space-x-1 text-sm font-medium">
            <ProgressStatus progress={progress} />
            <span className="text-base font-semibold text-neutral-300">from yesterday</span>
          </div>
        )}
      </div>
    </Card>
  )
}

export default CardDashboardToday
