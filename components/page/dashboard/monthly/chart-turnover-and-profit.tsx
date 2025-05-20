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
  turnover: {
    label: 'Turnover Slot ',
    color: 'rgb(233,118,12)'
  },
  profit: {
    label: 'Profit Slot ',
    color: 'rgb(41,132,90)'
  }
} satisfies ChartConfig

type DataType = {
  month: string
  turnover: number
  profit: number
}
interface ChartTurnoverAndProfitProps {
  data: DataType[]
}

const ChartTurnoverAndProfit: React.FC<ChartTurnoverAndProfitProps> = ({ data }) => {
  return (
    <Card className="pb-5">
      <ChartHeader chartConfig={chartConfig} />
      <ChartContainer config={chartConfig} className="h-[235px] w-full">
        <BarChart accessibilityLayer data={data} barCategoryGap={50}>
          <CartesianGrid vertical={true} />
          <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
          <YAxis
            tickFormatter={formatNumberWithSuffix}
            tickCount={8}
            domain={[0, (dataMax: number) => dataMax * 1.2]}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="turnover" fill="var(--color-turnover)" radius={6} maxBarSize={40}>
            <LabelList
              position="top"
              offset={12}
              className="fill-neutral-400"
              fontSize={12}
              valueAccessor={(data: DataType) => (data.turnover > 0 ? data.turnover : null)}
              formatter={formatNumberWithSuffix}
            />
          </Bar>
          <Bar dataKey="profit" fill="var(--color-profit)" radius={6} maxBarSize={40}>
            <LabelList
              position="top"
              offset={12}
              className="fill-neutral-400"
              fontSize={12}
              valueAccessor={(data: DataType) => (data.profit > 0 ? data.profit : null)}
              formatter={formatNumberWithSuffix}
            />
            <LabelList
              position="bottom"
              offset={12}
              className="fill-neutral-400"
              fontSize={12}
              valueAccessor={(data: DataType) => (data.profit < 0 ? data.profit : null)}
              formatter={formatNumberWithSuffix}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </Card>
  )
}

export default ChartTurnoverAndProfit
