import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { formatNumberWithCommas } from '@/lib/format-number'
import { cn } from '@/lib/utils'
import ButtonSort from '@/components/data-table/button-sort'
import { format } from 'date-fns'
import ButtonDetail from '@/components/button-detail'
import InitialAvatar from '@/components/initial-avatar'

export interface ClientType {
  date: string
  parentId: string
  new_register_player: number
  active_player: number
  dealer_id: string
  turnover: number
  win_player: number
  profit: number
}

export const ColumnsClient: ColumnDef<ClientType>[] = [
  {
    accessorKey: 'no',
    header: () => <div className="text-left">No</div>,
    cell: ({ row }) => <div className="text-left">{row.index + 1}</div>,
    footer: () => <div className="text-neutral-300">Total</div>
  },
  {
    accessorKey: 'date',
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortType === 'asc')}
          className="has-[>svg]:px-0 w-full justify-start">
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
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortType === 'asc')}
          className="has-[>svg]:px-0">
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
    accessorKey: 'new_register_player',
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortType === 'asc')}
          className="has-[>svg]:px-0 justify-end">
          New Register Player
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="text-right font-medium"> {row.getValue('new_register_player')}</div>
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
          className="has-[>svg]:px-0 justify-end">
          Active Player
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="text-right font-medium"> {row.getValue('active_player')} </div>
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
          className="has-[>svg]:px-0 justify-end">
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
          className="has-[>svg]:px-0 justify-end">
          Win Slot
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => {
      const win = row.getValue('win_player') as number
      return (
        <div className="block w-full text-right font-medium">
          <span className="text-neutral-400">{formatNumberWithCommas(win)}</span>
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
          className="has-[>svg]:px-0 justify-end">
          Profit Slot
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
  },
  {
    accessorKey: 'parentID',
    id: 'buttton-link-to',
    header: () => <div className="w-24 text-right"></div>,
    cell: ({ row }) => {
      const parentId: string = row.getValue('parent_id') ? row.getValue('parent_id') : '-'
      const date = row?.original?.date
      return <ButtonDetail path="/clients" id={`${date}?parent_id=${parentId}`} />
    }
  }
]

export const ColumnsClientDetail: ColumnDef<ClientType>[] = [
  {
    accessorKey: 'no',
    header: () => <div className="text-left">No</div>,
    cell: ({ row }) => <div className="text-left">{row.index + 1}</div>,
    footer: () => <div className="text-neutral-300">Total</div>
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
        <div className="mx-auto capitalize flex gap-x-1.5 items-center h-7">
          <InitialAvatar name={row.getValue('dealer_id')} />
          {row.getValue('dealer_id')}
        </div>
      )
    }
  },
  {
    accessorKey: 'new_register_player',
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortType === 'asc')}
          className="has-[>svg]:px-0 justify-end">
          Active Player
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium"> {row.getValue('new_register_player')} Player</div>
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
          className="has-[>svg]:px-0 justify-end">
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
          className="has-[>svg]:px-0 justify-end w-full">
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
          className="has-[>svg]:px-0 justify-end w-full">
          Win Slot
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => {
      const win = row.getValue('win_player') as number
      return (
        <div className="block w-full text-right font-medium">
          <span className="text-neutral-400">{formatNumberWithCommas(win)}</span>
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
          className="has-[>svg]:px-0 justify-end w-full">
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
