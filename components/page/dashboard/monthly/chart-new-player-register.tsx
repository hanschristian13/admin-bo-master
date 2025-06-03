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
  new_register_player: {
    label: 'New Player Register ',
    color: 'rgb(0,111,214)'
  }
} satisfies ChartConfig

type DataType = {
  month: string
  new_register_player: number
}
interface ChartNewPlayerRegister {
  data: DataType[]
}

const ChartNewPlayerRegister: React.FC<ChartNewPlayerRegister> = ({ data }) => {
  return (
    <Card className="pb-5">
      <ChartHeader chartConfig={chartConfig} />
      <ChartContainer config={chartConfig} className="h-[230px] w-full">
        <BarChart accessibilityLayer data={data}>
          <CartesianGrid vertical={true} />
          <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
          <YAxis
            dataKey="new_register_player"
            tickFormatter={formatNumberWithSuffix}
            tickCount={8}
            domain={[0, (dataMax: number) => dataMax * 1.2]}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="new_register_player"
            fill="var(--color-new_register_player)"
            radius={6}
            maxBarSize={40}>
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

export default ChartNewPlayerRegister
