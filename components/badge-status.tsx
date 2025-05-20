import React from 'react'
import { Badge } from '@/components/ui/badge'
import DotStatus, { DotStatusColor } from '@/components/dot-status'
import { cn } from '@/lib/utils'

interface BadgeStatusProps {
  title: string
  colorDotStatus?: string
  styleDotStatus?: DotStatusColor
}

const BadgeStatus: React.FC<BadgeStatusProps> = ({
  title,
  colorDotStatus,
  styleDotStatus
}) => {
  return (
    <Badge variant="outline" className={cn("gap-2 rounded-md px-3 py-1 capitalize",
      styleDotStatus === 'green' && "text-green-950",
      styleDotStatus === 'orange' && "text-orange-950",
      styleDotStatus === 'blue' && "text-blue-950",
      styleDotStatus === 'red' && "text-red-950",
      styleDotStatus === 'violet' && "text-violet-950",
      styleDotStatus === 'purple' && "text-purple-950",
      styleDotStatus === 'neutral' && "text-neutral-950",
    )}>
      {/* <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden="true"></span> */}
      <DotStatus 
        color={colorDotStatus}
        style={styleDotStatus}
      />
      {title}
    </Badge>
  )
}

export default BadgeStatus