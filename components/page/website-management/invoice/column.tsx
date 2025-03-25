/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { formatNumberWithCommas } from '@/lib/format-number'
import ButtonSort from '@/components/data-table/button-sort'
import { cn, timeFormat } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'
import InitialAvatar from '@/components/initial-avatar'
import BadgeStatus from '@/components/badge-status'
import ButtonDetail from '@/components/button-detail'
import { ButtonAddQueryParams } from '../../slot'

export interface InvoiceType {
  _id: string
  game_type: string
  parent_id: string
  dealer_id: string
  end_date: string
  status: string
  inv_client: number
  inv_super_agent: number
  categories: any
  total: number
}
export interface OtherExpensesType {
  note: string
  total: number
}

export const Columnsinvoice: ColumnDef<InvoiceType>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'id',
    header: () => <div className="text-left">ID</div>,
    cell: ({ row }) => <div className="text-left max-w-36 truncate">{row.getValue('id')}</div>
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
    cell: ({ row }) => (
      <div className="capitalize whitespace-nowrap">
        <div className="flex items-center space-x-3">
          <InitialAvatar name={row.getValue('parent_id')} />
          <div className="flex flex-col text-sm font-medium">
            <span>{row.getValue('parent_id')}</span>
          </div>
        </div>
      </div>
    )
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
    cell: ({ row }) => (
      <div className="capitalize whitespace-nowrap">
        <div className="flex items-center space-x-3">
          <InitialAvatar name={row.getValue('dealer_id')} />
          <div className="flex flex-col text-sm font-medium">
            <span>{row.getValue('dealer_id')}</span>
          </div>
        </div>
      </div>
    )
  },
  {
    accessorKey: 'end_date',
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortType === 'asc')}
          className="has-[>svg]:px-0">
          Invoice Month
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize whitespace-nowrap text-left">
        {' '}
        {timeFormat(row.getValue('end_date')).format('LLL, y')}{' '}
      </div>
    )
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortType === 'asc')}
          className="w-full flex !px-0">
          Status
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => {
      const handleStatus = row.getValue('status') as string
      let handleDotStatus
      switch (handleStatus) {
        case 'pending':
          handleDotStatus = <BadgeStatus title={handleStatus} styleDotStatus="orange" />
          break
        case 'paid':
          handleDotStatus = <BadgeStatus title={handleStatus} styleDotStatus="green" />
          break
        case 'adjusted':
          handleDotStatus = <BadgeStatus title={handleStatus} styleDotStatus="blue" />
          break
        default:
          break
      }
      return <div className="capitalize whitespace-nowrap text-center">{handleDotStatus}</div>
    }
  },
  {
    accessorKey: 'agent_profit',
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortType === 'asc')}
          className="has-[>svg]:px-0 flex ml-auto">
          Client
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
            {formatNumberWithCommas(data > 0 ? data : data * -1)}
          </span>
        </div>
      )
    }
  },
  {
    accessorKey: 'company_profit',
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortType === 'asc')}
          className="has-[>svg]:px-0 flex ml-auto">
          Super Agent
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
            {formatNumberWithCommas(data > 0 ? data : data * -1)}
          </span>
        </div>
      )
    }
  },
  {
    accessorKey: '_id',
    id: 'detailId',
    header: () => <div className="w-24"></div>,
    cell: ({ row }) => {
      return <ButtonDetail path="/invoice" id={row.getValue('detailId')} />
    }
  }
]

export const ColumnsSummaryInvoice: ColumnDef<InvoiceType>[] = [
  {
    accessorKey: 'game_type',
    header: () => <div className="text-left">Category</div>,
    cell: ({ row }) => <div className="text-left">{row.getValue('game_type')}</div>
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
    cell: ({ row }) => (
      <div className="capitalize whitespace-nowrap">
        <div className="flex items-center space-x-3">
          <InitialAvatar name={row.getValue('parent_id')} />
          <div className="flex flex-col text-sm font-medium">
            <span>{row.getValue('parent_id')}</span>
          </div>
        </div>
      </div>
    )
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
          Dealer
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize whitespace-nowrap">
        <div className="flex items-center space-x-3">
          <InitialAvatar name={row.getValue('dealer_id')} />
          <div className="flex flex-col text-sm font-medium">
            <span>{row.getValue('dealer_id')}</span>
          </div>
        </div>
      </div>
    )
  },
  {
    accessorKey: 'total',
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortType === 'asc')}
          className="has-[>svg]:px-0 flex ml-auto">
          Total
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => {
      const data = Object.values(row?.original)
        .filter(value => typeof value === 'number')
        .reduce((sum, num) => sum + num, 0)

      return (
        <div className="block w-full text-right font-medium">
          <span className="text-neutral-300">Rp</span>
          <span className={cn(data > 0 && 'text-green-950', data < 0 && 'text-red-950')}>
            {formatNumberWithCommas(data > 0 ? data : data * -1)}
          </span>
        </div>
      )
    }
  },
  {
    accessorKey: '_id',
    header: () => <div className="w-24"></div>,
    cell: ({ row }) => {
      return <ButtonAddQueryParams params={`categories=${row?.original?.game_type}`} />
    }
  }
]
export const ColumnsCategoryDetail: ColumnDef<InvoiceType>[] = [
  {
    accessorKey: 'game_name',
    header: () => <div className="text-left">Game Name</div>,
    cell: ({ row }) => <div className="text-left">{row.getValue('game_name')}</div>
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
    cell: ({ row }) => (
      <div className="capitalize whitespace-nowrap">
        <div className="flex items-center space-x-3">
          <InitialAvatar name={row.getValue('parent_id')} />
          <div className="flex flex-col text-sm font-medium">
            <span>{row.getValue('parent_id')}</span>
          </div>
        </div>
      </div>
    )
  },
  {
    accessorKey: 'agent_id',
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
    cell: ({ row }) => (
      <div className="capitalize whitespace-nowrap">
        <div className="flex items-center space-x-3">
          <InitialAvatar name={row.getValue('agent_id')} />
          <div className="flex flex-col text-sm font-medium">
            <span>{row.getValue('agent_id')}</span>
          </div>
        </div>
      </div>
    )
  },
  {
    accessorKey: 'total',
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortType === 'asc')}
          className="has-[>svg]:px-0 flex ml-auto">
          Total
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => {
      const data = row.getValue('total') as number
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

export const ColumnsOtherExpenses: ColumnDef<OtherExpensesType>[] = [
  {
    accessorKey: 'key',
    header: () => <div className="text-left">Note</div>,
    cell: ({ row }) => <div className="text-left">{row.getValue('key')}</div>
  },
  {
    accessorKey: 'value',
    header: ({ column }) => {
      const sortType = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortType === 'asc')}
          className="has-[>svg]:px-0 flex ml-auto">
          Total
          <ButtonSort sortType={sortType} />
        </Button>
      )
    },
    cell: ({ row }) => {
      const data = row.getValue('value') as number
      return (
        <div className="block w-full text-right font-medium">
          <span className="text-neutral-300">Rp</span>
          <span className={cn(data > 0 && 'text-green-950', data < 0 && 'text-red-950')}>
            {formatNumberWithCommas(data > 0 ? data : data * -1)}
          </span>
        </div>
      )
    },
    footer: ({ table }) => {
      const total = table.getRowModel().rows.reduce((sum, row) => {
        const price = Number(row.getValue('value'))
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
