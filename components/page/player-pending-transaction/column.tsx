import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { formatNumberWithCommas } from '@/lib/format-number'
import { cn, colorCurrency } from '@/lib/utils'
import ButtonSort from '@/components/data-table/button-sort'
import { format } from 'date-fns'
import BadgeStatus from '@/components/badge-status'
import InitialAvatar from '@/components/initial-avatar'

export interface PlayerPendingTransactionType {
  username: string
  dealer_id: string
  game_name: string
  isBet: boolean
  round_id: string
  bet_date: string
  status: string
  bet: number
  win: number
}

export interface PlayerPendingTransaction {
  data: PlayerPendingTransactionType[]
  error: null
}

export const ColumnsPlayerPendingTransaction: ColumnDef<PlayerPendingTransactionType>[] = [
  {
    accessorKey: 'bet_date',
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortType === 'asc')}
          className="has-[>svg]:px-0">
          Datetime
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize whitespace-nowrap text-center">
        {' '}
        {format(row.getValue('bet_date'), 'LLL dd, y, HH:mm:ss')}{' '}
      </div>
    ),
    footer: () => <div className="text-neutral-300 text-left">Total</div>
  },
  {
    accessorKey: 'round_id',
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortType === 'asc')}
          className="has-[>svg]:px-0">
          Round ID
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize whitespace-nowrap truncate max-w-36">
        {' '}
        {row.getValue('round_id')}{' '}
      </div>
    )
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(sortType === 'asc')}>
          Status
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => {
      const handleStatus = row.getValue('status') as string
      let handleDotStatus
      switch (handleStatus) {
        case 'unsettle':
          handleDotStatus = <BadgeStatus title={handleStatus} styleDotStatus="neutral" />
          break
        case 'cancel':
          handleDotStatus = <BadgeStatus title={handleStatus} styleDotStatus="red" />
          break
        case 'complete':
          handleDotStatus = <BadgeStatus title={handleStatus} styleDotStatus="green" />
          break
        case 'running':
          handleDotStatus = <BadgeStatus title={handleStatus} styleDotStatus="orange" />
          break
        default:
          break
      }
      return <div className="capitalize whitespace-nowrap">{handleDotStatus}</div>
    }
  },
  {
    accessorKey: 'username',
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortType === 'asc')}
          className="has-[>svg]:px-0">
          Username
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-3">
          <InitialAvatar name={row.getValue('username') as string} />
          <div className="flex flex-col text-sm font-medium capitalize">
            <span>{row.getValue('username') as string}</span>
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: 'dealer_id',
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortType === 'asc')}
          className="has-[>svg]:px-0">
          Agent
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-3">
          <InitialAvatar name={row.getValue('dealer_id') as string} />
          <div className="flex flex-col text-sm font-medium capitalize">
            <span>{row.getValue('dealer_id') as string}</span>
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: 'game_name',
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortType === 'asc')}
          className="has-[>svg]:px-0">
          Game Name
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="text-left text-sm font-medium text-neutral-400">
          {row.getValue('game_name')}
        </div>
      )
    }
  },
  {
    accessorKey: 'bet',
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortType === 'asc')}
          className="has-[>svg]:px-0 flex ml-auto">
          Total Bet
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className={colorCurrency(row.getValue('bet'), 'block w-full text-right font-medium')}>
          <span className="text-neutral-300">Rp</span>
          {formatNumberWithCommas(row.getValue('bet') || 0, 0)}
        </div>
      )
    },
    footer: ({ table }) => {
      const total = table.getRowModel().rows.reduce((sum, row) => {
        const price = Number(row.getValue('bet'))
        return isNaN(price) ? sum : sum + price
      }, 0)
      return (
        <div className={colorCurrency(total, 'block w-full text-right font-medium')}>
          <span className="text-neutral-300">Rp</span>
          {formatNumberWithCommas(total > 0 ? total : total, 0)}
        </div>
      )
    }
  },
  {
    accessorKey: 'win',
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortType === 'asc')}
          className="w-full flex justify-end !px-0">
          Total Win
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className={colorCurrency(row?.getValue('win'), 'block w-full text-right font-medium')}>
          <span className="text-neutral-300">Rp</span>
          {formatNumberWithCommas(row.getValue('win'), 0)}
        </div>
      )
    },
    footer: ({ table }) => {
      const total = table.getRowModel().rows.reduce((sum, row) => {
        const price = Number(row.getValue('win'))
        return isNaN(price) ? sum : sum + price
      }, 0)
      return (
        <div className="block w-full text-right font-medium">
          <span className="text-neutral-300">Rp</span>
          <span className={cn(total > 0 && 'text-green-950', total < 0 && 'text-red-950')}>
            {formatNumberWithCommas(total > 0 ? total : total, 0)}
          </span>
        </div>
      )
    }
  }
]
