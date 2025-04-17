import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { formatNumberWithCommas } from '@/lib/format-number'
import { cn } from '@/lib/utils'
import ButtonSort from '@/components/data-table/button-sort'
import { format } from 'date-fns'
import { ButtonPageToDetailWithParent } from '../slot'
import InitialAvatar from '@/components/initial-avatar'

export interface ClientSharedType {
  parent_id: string
  date: string
  profit: number
  master_shared: number
  superagent_shared: number
  agent_shared: number
}

export interface ClientSharedDetailType {
  parent_id: string
  date: string
  profit: number
  master_shared: number
  superagent_shared: number
  client_shared: number
}

export const ColumnsClientShared: ColumnDef<ClientSharedType>[] = [
  {
    accessorKey: 'no',
    header: () => <div className="text-left">No</div>,
    cell: ({ row }) => <div className="text-left">{row.index + 1}</div>
  },
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
      <div className="capitalize whitespace-nowrap text-left">
        {' '}
        {format(row.getValue('date'), 'LLL dd, y')}{' '}
      </div>
    ),
    footer: () => {
      return <div className="text-left text-sm font-medium text-neutral-400">Total</div>
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
          className="has-[>svg]:px-0 flex ml-auto">
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
          <span className={cn(data > 0 && 'text-green-950', data < 0 && 'text-red-950')}>
            {formatNumberWithCommas(data > 0 ? data : data * -1, 0)}
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
        <div className="block w-full text-right font-medium">
          <span className="text-neutral-300">Rp</span>
          <span className={cn(total > 0 && 'text-green-950', total < 0 && 'text-red-950')}>
            {formatNumberWithCommas(total > 0 ? total : total * -1, 0)}
          </span>
        </div>
      )
    }
  },
  {
    accessorKey: 'master_shared',
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortType === 'asc')}
          className="has-[>svg]:px-0 flex ml-auto">
          Master Shared
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => {
      const dataWin = row.getValue('master_shared') as number
      return (
        <div className="block w-full text-right font-medium">
          <span className="text-neutral-300">Rp</span>
          <span className="text-neutral-400">
            {formatNumberWithCommas(dataWin > 0 ? dataWin : dataWin * -1, 0)}
          </span>
        </div>
      )
    },
    footer: ({ table }) => {
      const total = table.getRowModel().rows.reduce((sum, row) => {
        const price = Number(row.getValue('master_shared'))
        return isNaN(price) ? sum : sum + price
      }, 0)
      return (
        <div className="block text-right font-medium">
          <span className="text-neutral-300">Rp</span>
          {formatNumberWithCommas(total, 0)}
        </div>
      )
    }
  },
  {
    accessorKey: 'super_agent_shared',
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortType === 'asc')}
          className="has-[>svg]:px-0 flex ml-auto">
          Super Agent Shared
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="block text-right font-medium">
          <span className="text-neutral-300">Rp</span>
          {formatNumberWithCommas(row.getValue('super_agent_shared'), 0)}
        </div>
      )
    },
    footer: ({ table }) => {
      const total = table.getRowModel().rows.reduce((sum, row) => {
        const price = Number(row.getValue('super_agent_shared'))
        return isNaN(price) ? sum : sum + price
      }, 0)
      return (
        <div className="block text-right font-medium">
          <span className="text-neutral-300">Rp</span>
          {formatNumberWithCommas(total, 0)}
        </div>
      )
    }
  },
  {
    accessorKey: 'agent_shared',
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortType === 'asc')}
          className="has-[>svg]:px-0 flex ml-auto">
          Agent Shared
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => {
      const profit = row.getValue('agent_shared') as number
      return (
        <div className="block w-full text-right font-medium">
          <span className="text-neutral-300">Rp</span>
          <span className={cn(profit > 0 && 'text-green-950', profit < 0 && 'text-red-950')}>
            {formatNumberWithCommas(profit > 0 ? profit : profit * -1, 0)}
          </span>
        </div>
      )
    },
    footer: ({ table }) => {
      const total = table.getRowModel().rows.reduce((sum, row) => {
        const price = Number(row.getValue('agent_shared'))
        return isNaN(price) ? sum : sum + price
      }, 0)
      return (
        <div className={cn(total > 0 && 'text-green-950', total < 0 && 'text-red-950')}>
          Rp{formatNumberWithCommas(total > 0 ? total : total * -1, 0)}
        </div>
      )
    }
  },
  {
    accessorKey: 'parent_id',
    header: () => <div className="w-24"></div>,
    cell: ({ row }) => {
      const date = row?.original?.date
      return <ButtonPageToDetailWithParent parent="/client-shared" sub={date} />
    }
  }
]

export const ColumnsClientSharedDetail: ColumnDef<ClientSharedDetailType>[] = [
  {
    accessorKey: 'no',
    header: () => <div className="text-left">No</div>,
    cell: ({ row }) => <div className="text-left">{row.index + 1}</div>
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
    },
    footer: () => {
      return <div className="text-left text-neutral-300">Total</div>
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
          className="has-[>svg]:px-0 flex ml-auto">
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
          <span className={cn(data > 0 && 'text-green-950', data < 0 && 'text-red-950')}>
            {formatNumberWithCommas(data > 0 ? data : data * -1, 0)}
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
          Rp{formatNumberWithCommas(total > 0 ? total : total * -1, 0)}
        </div>
      )
    }
  },
  {
    accessorKey: 'master_shared',
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortType === 'asc')}
          className="has-[>svg]:px-0 flex ml-auto">
          Master Shared
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="block text-right font-medium">
          <span className="text-neutral-300">Rp</span>
          {formatNumberWithCommas(row.getValue('master_shared'), 0)}
        </div>
      )
    },
    footer: ({ table }) => {
      const total = table.getRowModel().rows.reduce((sum, row) => {
        const price = Number(row.getValue('master_shared'))
        return isNaN(price) ? sum : sum + price
      }, 0)
      return (
        <div className="block w-full text-right font-medium">
          <span className="text-neutral-300">Rp</span>
          <span className="text-neutral-400">
            {formatNumberWithCommas(total > 0 ? total : total * -1, 0)}
          </span>
        </div>
      )
    }
  },
  {
    accessorKey: 'super_agent_shared',
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortType === 'asc')}
          className="has-[>svg]:px-0 flex ml-auto">
          Super Agent Shared
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="block text-right font-medium">
          <span className="text-neutral-300">Rp</span>
          {formatNumberWithCommas(row.getValue('super_agent_shared'), 0)}
        </div>
      )
    },
    footer: ({ table }) => {
      const total = table.getRowModel().rows.reduce((sum, row) => {
        const price = Number(row.getValue('super_agent_shared'))
        return isNaN(price) ? sum : sum + price
      }, 0)
      return (
        <div className="block w-full text-right font-medium">
          <span className="text-neutral-300">Rp</span>
          <span className="text-neutral-400">
            {formatNumberWithCommas(total > 0 ? total : total * -1, 0)}
          </span>
        </div>
      )
    }
  },
  {
    accessorKey: 'agent_shared',
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortType === 'asc')}
          className="has-[>svg]:px-0 flex ml-auto">
          Agent Shared
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => {
      const data = row.getValue('agent_shared') as number
      return (
        <div className="block w-full text-right font-medium">
          <span className="text-neutral-300">Rp</span>
          <span className={cn(data > 0 && 'text-green-950', data < 0 && 'text-red-950')}>
            {formatNumberWithCommas(data > 0 ? data : data * -1, 0)}
          </span>
        </div>
      )
    },
    footer: ({ table }) => {
      const total = table.getRowModel().rows.reduce((sum, row) => {
        const price = Number(row.getValue('agent_shared'))
        return isNaN(price) ? sum : sum + price
      }, 0)
      return (
        <div className={cn(total > 0 && 'text-green-950', total < 0 && 'text-red-950')}>
          Rp{formatNumberWithCommas(total > 0 ? total : total * -1, 0)}
        </div>
      )
    }
  }
]
