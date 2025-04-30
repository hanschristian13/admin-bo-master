import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { formatNumberWithCommas } from '@/lib/format-number'
import ButtonSort from '@/components/data-table/button-sort'

import { cn, timeFormat } from '@/lib/utils'

export interface PlayerTransactionType {
  date: string
  game: string
  round_id: number
  turnover: number
  win: number
  balance: number
}

export const ColumnsPlayerTransaction: ColumnDef<PlayerTransactionType>[] = [
  {
    accessorKey: 'created_at',
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
        {timeFormat(row.getValue('created_at'))?.format('LLL dd, y')}{' '}
      </div>
    )
  },
  {
    accessorKey: 'game_name',
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortType === 'asc')}
          className="w-full flex !px-0">
          Game
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => <div className="block w-full font-medium">{row.getValue('game_name')}</div>
  },
  {
    accessorKey: 'round_id',
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortType === 'asc')}
          className="w-full flex !px-0">
          Round ID
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => <div className="block w-full font-medium">{row.getValue('round_id')}</div>
  },
  {
    accessorKey: 'turnover',
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortType === 'asc')}
          className="w-full flex justify-end !px-0">
          Turnover Slot
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="block text-right font-medium">
          <span className="text-neutral-300">Rp</span>
          {formatNumberWithCommas(row.getValue('turnover'))}
        </div>
      )
    },
    footer: ({ table }) => {
      const total = table.getRowModel().rows.reduce((sum, row) => {
        const price = Number(row.getValue('turnover'))
        return isNaN(price) ? sum : sum + price
      }, 0)
      return (
        <div className="block w-full text-right font-medium">
          <span className="text-neutral-300">Rp</span>
          <span className="text-neutral-400">
            {formatNumberWithCommas(total > 0 ? total : total * -1)}
          </span>
        </div>
      )
    }
  },
  {
    accessorKey: 'win_player',
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortType === 'asc')}
          className="w-full flex justify-end !px-0">
          Win Slot
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => {
      const dataWin = row.getValue('win_player') as number
      return (
        <div className="block w-full text-right font-medium">
          <span className="text-neutral-300">Rp</span>
          <span className="text-neutral-400">
            {formatNumberWithCommas(dataWin > 0 ? dataWin : dataWin * -1)}
          </span>
        </div>
      )
    },
    footer: ({ table }) => {
      const total = table.getRowModel().rows.reduce((sum, row) => {
        const price = Number(row.getValue('win_player'))
        return isNaN(price) ? sum : sum + price
      }, 0)
      return (
        <div className="block w-full text-right font-medium">
          <span className="text-neutral-300">Rp</span>
          <span className="text-neutral-400">
            {formatNumberWithCommas(total > 0 ? total : total * -1)}
          </span>
        </div>
      )
    }
  },
  {
    accessorKey: 'last_balance',
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortType === 'asc')}
          className="w-full flex justify-end !px-0">
          Balance
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => {
      const data = row.getValue('last_balance') as number
      return (
        <div className="block w-full text-right font-medium">
          <span className="text-neutral-300">Rp</span>
          <span className={cn(data > 0 && 'text-green-950', data < 0 && 'text-red-950')}>
            {formatNumberWithCommas(data > 0 ? data : data * -1)}
          </span>
        </div>
      )
    }
  }
]
