'use client'

import React from 'react'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import { Card } from '@/components/ui/card'
import { formatNumberWithSuffix } from '@/lib/format-number'
import ChartHeader from './chart-header'

const chartConfig = {
  active_player: {
    label: 'Player Active',
    color: 'rgb(135,91,247)'
  }
} satisfies ChartConfig

type DataType = {
  month: string
  active_player: number
}
interface ChartPlayerActive {
  data: DataType[]
}
const ChartActivePlayer: React.FC<ChartPlayerActive> = ({ data }) => {
  return (
    <Card className="pb-5">
      <ChartHeader chartConfig={chartConfig} />
      <ChartContainer config={chartConfig} className="h-[230px] w-full">
        <BarChart accessibilityLayer data={data}>
          <CartesianGrid vertical={true} />
          <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
          <YAxis
            dataKey="active_player"
            tickFormatter={formatNumberWithSuffix}
            tickCount={8}
            domain={[0, (dataMax: number) => dataMax * 1.2]}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="active_player" fill="var(--color-active_player)" radius={6} maxBarSize={40}>
            <LabelList
              position="top"
              offset={12}
              className="fill-neutral-400"
              fontSize={12}
              formatter={formatNumberWithSuffix}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </Card>
  )
}

export default ChartActivePlayer
