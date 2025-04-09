import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { formatNumberWithCommas } from '@/lib/format-number'
import { cn } from '@/lib/utils'
import ButtonSort from '@/components/data-table/button-sort'
import { format } from 'date-fns'
import ButtonDetail from '@/components/button-detail'
import InitialAvatar from '@/components/initial-avatar'

export interface PlayerActiveType {
  date: string
  parent_id: null | string
  game_type: null | string
  new_register_player: number
  active_player: number
  turnover: number
  win_player: number
  profit: number
}

export interface PlayerActiveDetailType {
  parent_id: string
  dealer_id: string
  game_type: string
  username: string
  turnover: number
  win_player: number
  profit: number
}

export const ColumnsPlayerActive: ColumnDef<PlayerActiveType>[] = [
  {
    accessorKey: 'no',
    header: () => <div className="text-center">No</div>,
    cell: ({ row }) => <div className="text-center">{row.index + 1}</div>
  },
  {
    accessorKey: 'date',
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortType === 'asc')}
          className="has-[>svg]:px-0 text-left">
          Date
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize whitespace-nowrap text-left">
        {' '}
        {format(row.getValue('date'), 'LLL dd, y')}{' '}
      </div>
    )
  },
  {
    accessorKey: 'parent_id',
    id: 'parent_id',
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortType === 'asc')}
          className="has-[>svg]:px-0 text-left">
          Super Agent
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="capitalize flex gap-x-1.5 items-center h-7 whitespace-nowrap text-left text-sm font-medium text-neutral-400">
          <InitialAvatar name={row.getValue('parent_id')} />
          {row.getValue('parent_id')}
        </div>
      )
    }
  },
  {
    accessorKey: 'active_player',
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortType === 'asc')}
          className="has-[>svg]:px-0 text-right">
          Active Player
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="text-right font-medium"> {row.getValue('active_player')} Player</div>
    }
  },
  {
    accessorKey: 'turnover',
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortType === 'asc')}
          className="has-[>svg]:px-0 text-right">
          Turnover
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
    }
  },
  {
    accessorKey: 'profit',
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortType === 'asc')}
          className="has-[>svg]:px-0 text-right">
          Profit
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => {
      const profit = row.getValue('profit') as number
      return (
        <div className="block w-full text-right font-medium">
          <span className="text-neutral-300">Rp</span>
          <span className={cn(profit > 0 && 'text-green-950', profit < 0 && 'text-red-950')}>
            {formatNumberWithCommas(profit > 0 ? profit : profit * -1)}
          </span>
        </div>
      )
    }
  },
  {
    accessorKey: 'parent_id',
    id: 'detail_id',
    header: () => <div className="w-24"></div>,
    cell: ({ row }) => {
      const parentId: string = row.getValue('parent_id') ? row.getValue('parent_id') : '-'
      return (
        <div className="ml-auto">
          <ButtonDetail path="/player-active" id={`${row?.original?.date}?parent_id=${parentId}`} />
        </div>
      )
    }
  }
]

export const ColumnsPlayerActiveDetail: ColumnDef<PlayerActiveDetailType>[] = [
  {
    accessorKey: 'no',
    header: () => <div className="text-center">No</div>,
    cell: ({ row }) => <div className="text-center">{row.index + 1}</div>
  },
  {
    accessorKey: 'parent_id',
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortType === 'asc')}
          className="has-[>svg]:px-0 text-left">
          Super Agent
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="capitalize flex gap-x-1.5 items-center h-7">
          <InitialAvatar name={row.getValue('parent_id')} />
          {row.getValue('parent_id')}
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
          className="has-[>svg]:px-0 text-left">
          Agent
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="capitalize flex gap-x-1.5 items-center h-7">
          <InitialAvatar name={row.getValue('dealer_id')} />
          {row.getValue('dealer_id')}
        </div>
      )
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
          className="has-[>svg]:px-0 text-left">
          Username
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="capitalize flex gap-x-1.5 items-center h-7">
          <InitialAvatar name={row.getValue('username')} />
          {row.getValue('username')}
        </div>
      )
    }
  },
  {
    accessorKey: 'turnover',
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortType === 'asc')}
          className="has-[>svg]:px-0 w-full justify-end">
          Turnover
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
        <div className={cn(total > 0 && 'text-green-950', total < 0 && 'text-red-950')}>
          Rp{formatNumberWithCommas(total > 0 ? total : total * -1)}
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
          className="has-[>svg]:px-0 w-full justify-end">
          Win Player
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="block text-right font-medium">
          <span className="text-neutral-300">Rp</span>
          {formatNumberWithCommas(row.getValue('win_player'))}
        </div>
      )
    },
    footer: ({ table }) => {
      const total = table.getRowModel().rows.reduce((sum, row) => {
        const price = Number(row.getValue('win_player'))
        return isNaN(price) ? sum : sum + price
      }, 0)
      return (
        <div className={cn(total > 0 && 'text-green-950', total < 0 && 'text-red-950')}>
          Rp{formatNumberWithCommas(total > 0 ? total : total * -1)}
        </div>
      )
    }
  },
  {
    accessorKey: 'profit',
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortType === 'asc')}
          className="has-[>svg]:px-0 w-full justify-end">
          Profit
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => {
      const profit = row.getValue('profit') as number
      return (
        <div className="block w-full text-right font-medium">
          <span className="text-neutral-300">Rp</span>
          <span className={cn(profit > 0 && 'text-green-950', profit < 0 && 'text-red-950')}>
            {formatNumberWithCommas(profit > 0 ? profit : profit * -1)}
          </span>
        </div>
      )
    },
    footer: ({ table }) => {
      const total = table.getRowModel().rows.reduce((sum, row) => {
        const price = Number(row.getValue('profit'))
        return isNaN(price) ? sum : sum + price
      }, 0)
      return (
        <div className={cn(total > 0 && 'text-green-950', total < 0 && 'text-red-950')}>
          Rp{formatNumberWithCommas(total > 0 ? total : total * -1)}
        </div>
      )
    }
  }
]
