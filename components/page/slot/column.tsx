import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { formatNumberWithCommas } from '@/lib/format-number'
import { cn, colorCurrency } from '@/lib/utils'
import ButtonSort from '@/components/data-table/button-sort'
import { format } from 'date-fns'
import InitialAvatar from '@/components/initial-avatar'
import { ButtonPageToDetailWithParent } from '.'

export interface SlotType {
  parent_id: string
  date: string
  total_player: number
  total_client: number
  turnover: number
  win: number
  profit: number
}

export interface SlotDetailType {
  parent_id: string
  username: string
  game_type: string
  turnover: number
  win_player: number
  profit: number
}

export const ColumnsSlot: ColumnDef<SlotType>[] = [
  {
    accessorKey: 'date',
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortType === 'asc')}
          className="has-[>svg]:px-0">
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
    footer: () => {
      return <div className="text-left text-sm font-medium text-neutral-400">Total</div>
    }
  },
  {
    accessorKey: 'total_player',
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortType === 'asc')}
          className="has-[>svg]:px-0 w-full justify-end">
          Total Player
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="text-right">
        {formatNumberWithCommas(row.getValue('total_player'), 0)} Player
      </div>
    )
    // footer: ({ table }) => {
    //   const total = table.getRowModel().rows.reduce((sum, row) => {
    //     const price = Number(row.getValue('total_player'))
    //     return isNaN(price) ? sum : sum + price
    //   }, 0)
    //   return (
    //     <div className="block w-full text-right font-medium">
    //       <span className="text-neutral-400">
    //         {formatNumberWithCommas(total ? total : 0, 0)} Player
    //       </span>
    //     </div>
    //   )
    // }
  },
  {
    accessorKey: 'total_client',
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortType === 'asc')}
          className="has-[>svg]:px-0 w-full justify-end">
          Total Agent
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="text-right">{formatNumberWithCommas(row.getValue('total_client'), 0)}</div>
    )
    // footer: ({ table }) => {
    //   const total = table.getRowModel().rows.reduce((sum, row) => {
    //     const price = Number(row.getValue('total_client'))
    //     return isNaN(price) ? sum : sum + price
    //   }, 0)
    //   return (
    //     <div className="block w-full text-right font-medium">
    //       <span className="text-neutral-400">
    //         {formatNumberWithCommas(total > 0 ? total : total , 0)}
    //       </span>
    //     </div>
    //   )
    // }
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
          Turnover Slot
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className={colorCurrency(row.getValue('turnover'), 'block text-right font-medium')}>
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
        <div className={colorCurrency(total, 'block text-right font-medium')}>
          <span className="text-neutral-300">Rp</span>

          {formatNumberWithCommas(total > 0 ? total : total, 0)}
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
          Win Slot
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className={colorCurrency(row.getValue('win_player'), 'block text-right font-medium')}>
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
        <div className={colorCurrency(total, 'block w-full text-right font-medium')}>
          <span className="text-neutral-300">Rp</span>

          {formatNumberWithCommas(total > 0 ? total : total, 0)}
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
            {formatNumberWithCommas(profit, 0)}
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
          Rp{formatNumberWithCommas(total, 0)}
        </div>
      )
    }
  },
  {
    accessorKey: 'parent_id',
    header: () => <div className="w-24"></div>,
    cell: ({ row }) => {
      const date = row?.original?.date
      return <ButtonPageToDetailWithParent sub={date} />
    }
  }
]

export const FooterRow = () => {
  return <div className="text-left text-sm font-medium text-neutral-400">Total</div>
}

export const ColumnsSlotDetail: ColumnDef<SlotDetailType>[] = [
  {
    accessorKey: 'parent_id',
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortType === 'asc')}
          className="has-[>svg]:px-0 w-full">
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
    },
    footer: FooterRow
  },
  {
    accessorKey: 'dealer_id',
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortType === 'asc')}
          className="has-[>svg]:px-0 w-full">
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
          className="has-[>svg]:px-0 w-full">
          Username
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="mx-auto capitalize flex gap-x-1.5 items-center h-7">
          <InitialAvatar name={row.getValue('username')} />
          {row.getValue('username')}
        </div>
      )
    }
  },
  {
    accessorKey: 'game_type',
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortType === 'asc')}
          className="has-[>svg]:px-0 w-full justify-center">
          Game Type
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="mx-auto capitalize flex gap-x-1.5 items-center h-7">
          {row.getValue('game_type')}
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
          className="has-[>svg]:px-0 w-full justify-center">
          Game Name
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="mx-auto capitalize flex gap-x-1.5 items-center h-7">
          {row.getValue('game_name')}
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
          className="has-[>svg]:px-0 flex ml-auto justify-end">
          Turnover
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="block text-right font-medium">
          <span className="text-neutral-300">Rp</span>
          {formatNumberWithCommas(row.getValue('turnover'), 0)}
        </div>
      )
    },
    footer: ({ table }) => {
      const total = table.getRowModel().rows.reduce((sum, row) => {
        const price = Number(row.getValue('turnover'))
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
    accessorKey: 'win_player',
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortType === 'asc')}
          className="has-[>svg]:px-0 flex ml-auto justify-end">
          Win
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="block text-right font-medium">
          <span className="text-neutral-300">Rp</span>
          {formatNumberWithCommas(row.getValue('win_player'), 0)}
        </div>
      )
    },
    footer: ({ table }) => {
      const total = table.getRowModel().rows.reduce((sum, row) => {
        const price = Number(row.getValue('win_player'))
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
    accessorKey: 'profit',
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortType === 'asc')}
          className="has-[>svg]:px-0 flex ml-auto justify-end">
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
            {formatNumberWithCommas(profit, 0)}
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
          Rp{formatNumberWithCommas(total)}
        </div>
      )
    }
  }
]
