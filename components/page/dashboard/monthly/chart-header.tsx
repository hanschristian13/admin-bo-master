import React from 'react'
import DotStatus from '@/components/dot-status';
import { Badge } from '@/components/ui/badge'
import { CardHeader } from '@/components/ui/card'
import { ChartColumnDecreasing } from 'lucide-react'

interface ChartConfig {
  [key: string]: {
    label: string;
    color: string;
  };
}

interface ChartProps {
  chartConfig: ChartConfig;
}

const ChartHeader: React.FC<ChartProps> = ({ chartConfig }) => {
  return (
    <CardHeader
      className='px-3 py-[14px] border-b border-neutral-200'>
      <div className='flex items-center justify-between gap-1.5'>
        <div className='text-neutral-300 flex items-center gap-x-2'>
          <ChartColumnDecreasing className='size-4' />
          <span className='text-sm font-medium'>Chart</span>
        </div>
        <div className='space-x-2'>
          {Object.values(chartConfig).map((item) => (
            <Badge
              key={item.label}
              variant="outline" 
              className="gap-1.5 text-neutral-400 rounded-md">
              <DotStatus color={item.color} />
              {item.label}
            </Badge>
          ))}
        </div>
      </div>
    </CardHeader>
  )
}

export default ChartHeader