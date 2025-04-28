import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { formatNumberWithCommas } from '@/lib/format-number'
import { cn } from '@/lib/utils'
import ButtonSort from '@/components/data-table/button-sort'
import { format } from 'date-fns'

export interface ProfitType {
  date: string
  agent_profit: number
  company_profit: number
  master_agent_profit: number
  master_company_profit: number
  profit: number
}

// agent_profit => agent_profit
// company_profit => label_profit
// master_agent_profit + master_company_profit => super_agent_comission
// profit => profit

export const ColumnsProfit: ColumnDef<ProfitType>[] = [
  // {
  //   accessorKey: 'no',
  //   header: () => <div className="text-center">No</div>,
  //   cell: ({ row }) => <div className="text-center">{row.index + 1}</div>
  // },
  {
    accessorKey: 'date',
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(sortType === 'asc')}>
          Date
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize whitespace-nowrap">
        {' '}
        {format(row.getValue('date'), 'LLL dd, y')}{' '}
      </div>
    ),
    // footer: () => {
    //   return <div className="text-left text-neutral-300">Total</div>
    // }
  },
  {
    accessorKey: 'agent_profit',
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortType === 'asc')}
          className="w-full flex !px-0">
          Agent Profit
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => {
      const data = row.getValue('agent_profit') as number
      return (
        <div className="block w-full text-right font-medium">
          <span className="text-neutral-300">Rp</span>
          <span className={cn(data > 0 && 'text-green-950', data < 0 && 'text-red-950')}>
            {formatNumberWithCommas(data > 0 ? data : data * -1, 0)}
          </span>
        </div>
      )
    },
    // footer: ({ table }) => {
    //   const total = table.getRowModel().rows.reduce((sum, row) => {
    //     const price = Number(row.getValue('agent_profit'))
    //     return isNaN(price) ? sum : sum + price
    //   }, 0)
    //   return (
    //     <div className="block w-full text-right font-medium">
    //       <span className="text-neutral-300">Rp</span>
    //       <span className={cn(total > 0 && 'text-green-950', total < 0 && 'text-red-950')}>
    //         {formatNumberWithCommas(total > 0 ? total : total * -1, 0)}
    //       </span>
    //     </div>
    //   )
    // }
  },
  {
    accessorKey: 'company_profit',
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortType === 'asc')}
          className="w-full flex !px-0">
          Master Profit
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => {
      const data = row.getValue('company_profit') as number
      return (
        <div className="block w-full text-right font-medium">
          <span className="text-neutral-300">Rp</span>
          <span className={cn(data > 0 && 'text-green-950', data < 0 && 'text-red-950')}>
            {formatNumberWithCommas(data > 0 ? data : data * -1, 0)}
          </span>
        </div>
      )
    },
    // footer: ({ table }) => {
    //   const total = table.getRowModel().rows.reduce((sum, row) => {
    //     const price = Number(row.getValue('company_profit'))
    //     return isNaN(price) ? sum : sum + price
    //   }, 0)
    //   return (
    //     <div className="block w-full text-right font-medium">
    //       <span className="text-neutral-300">Rp</span>
    //       <span className={cn(total > 0 && 'text-green-950', total < 0 && 'text-red-950')}>
    //         {formatNumberWithCommas(total > 0 ? total : total * -1, 0)}
    //       </span>
    //     </div>
    //   )
    // }
  },
  {
    accessorKey: 'master_agent_profit',
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortType === 'asc')}
          className="w-full flex justify-end !px-0">
          Super Agent Comission Fee
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => {
      const dataMap = row.getValue('master_agent_profit')
      const dataMcp = row?.original.master_company_profit
      return (
        <div className="block w-full text-right font-medium">
          <span className="text-neutral-300">Rp</span>
          <span className="text-neutral-400">
            {formatNumberWithCommas((dataMap as number) + dataMcp)}
          </span>
        </div>
      )
    },
    // footer: ({ table }) => {
    //   const total = table.getRowModel().rows.reduce((sum, row) => {
    //     const dataMap = row.getValue('master_agent_profit') as number
    //     const dataMcp = row?.original?.master_company_profit

    //     return sum + (dataMap + dataMcp)
    //   }, 0)
    //   return (
    //     <div className="block w-full text-right font-medium">
    //       <span className="text-neutral-300">Rp</span>
    //       <span className="text-neutral-400">
    //         {formatNumberWithCommas(total > 0 ? total : total * -1)}
    //       </span>
    //     </div>
    //   )
    // }
  },
  {
    accessorKey: 'profit',
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortType === 'asc')}
          className="w-full flex justify-end !px-0">
          Profit
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => {
      const data = row.getValue('profit') as number
      return (
        <div className="block w-full text-right font-medium">
          <span className="text-neutral-300">Rp</span>
          <span className="text-neutral-400">
            {formatNumberWithCommas(data > 0 ? data : data * -1, 0)}
          </span>
        </div>
      )
    },
    // footer: ({ table }) => {
    //   const total = table.getRowModel().rows.reduce((sum, row) => {
    //     const price = Number(row.getValue('profit'))
    //     return isNaN(price) ? sum : sum + price
    //   }, 0)
    //   return (
    //     <div className="block w-full text-right font-medium">
    //       <span className="text-neutral-300">Rp</span>
    //       <span className="text-neutral-400">
    //         {formatNumberWithCommas(total > 0 ? total : total * -1, 0)}
    //       </span>
    //     </div>
    //   )
    // }
  }
]
