/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import React, { useState } from 'react'
import { DataTable } from '@/components/data-table'
import { statusPaid } from '@/constant/general'
import { Columnsinvoice, InvoiceType } from '@/components/page/website-management/invoice/column'
import { Button } from '@/components/ui/button'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogPortal
} from '@/components/ui/alert-dialog'
import { RefreshCcw } from 'lucide-react'
import MonthPicker from '@/components/form/month-picker'
import { filterByAgent } from '@/mock/agent'
import FormAddExpenses from './form-add-expenses'
import FormGenerateInvoice from './form-generate-invoice'
import { useHandlePagination } from '@/hooks'
import { ApiResponse } from '@/service'

interface FilterState {
  date: Date
  agent: string
  paid: string
}
const Page = ({ data }: { data: ApiResponse<InvoiceType[]> }) => {
  const [selectedRows, setSelectedRows] = useState<InvoiceType[]>([])
  const [isAlertDialogMarkAsPainOpen, setIsAlertDialogMarkAsPaidOpen] = useState(false)
  const [isAlertDialogAddExpensesOpen, setIsAlertDialogAddExpensesOpen] = useState(false)
  const [isAlertDialogGenerateInvoiceOpen, setIsAlertDialogGenerateInvoiceOpen] = useState(false)

  const handleAddExpenses = () => {
    setIsAlertDialogAddExpensesOpen(true)
  }

  const handleMarkAsPaid = () => {
    setIsAlertDialogMarkAsPaidOpen(true)
  }

  const handleAlertDialogConfirm = () => {
    // action here
    setIsAlertDialogMarkAsPaidOpen(false)
  }

  const handleAlertDialogClose = () => {
    setIsAlertDialogMarkAsPaidOpen(false)
  }

  const { pagination, onPaginationChange } = useHandlePagination()

  const [filter, setFilter] = useState<FilterState>({
    date: new Date(),
    agent: '',
    paid: ''
  })
  const handleFilterChange = (properties: string, newValue: string | Date) => {
    if (properties === 'date') {
      if (newValue instanceof Date) {
        setFilter({
          ...filter,
          date: newValue
        })
      } else {
        console.error('Expected a Date object for property "date"')
      }
    } else {
      setFilter({
        ...filter,
        [properties]: newValue
      })
    }
  }

  return (
    <div className="flex flex-col space-y-6 w-full relative">
      <div className="flex justify-between">
        <div className="flex items-center space-x-2.5">
          <MonthPicker
            className="w-min"
            onMonthSelect={val => handleFilterChange('date', val)}
            selectedMonth={filter.date}
          />
          <Select
            value={filter.paid}
            onValueChange={val => handleFilterChange('paid', val)}
            aria-label="Results per Page">
            <SelectTrigger id="filter Paid" className="w-fit whitespace-nowrap capitalize">
              <SelectValue placeholder="Filter Paid" />
            </SelectTrigger>
            <SelectContent>
              {statusPaid.map(item => (
                <SelectItem key={item.value} value={item.value.toString()} className="capitalize">
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={filter.agent}
            onValueChange={val => handleFilterChange('agent', val)}
            aria-label="Results per Page">
            <SelectTrigger id="filter date" className="w-fit whitespace-nowrap capitalize">
              <SelectValue placeholder="Filter Date" />
            </SelectTrigger>
            <SelectContent>
              {filterByAgent.map(item => (
                <SelectItem key={item.value} value={item.value.toString()} className="capitalize">
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2.5">
          {selectedRows.length > 0 && (
            <>
              <Button variant="outline" onClick={handleAddExpenses}>
                Add Expenses
              </Button>
              <Button variant="default" onClick={handleMarkAsPaid}>
                Publish
              </Button>
              <Button variant="default" onClick={handleMarkAsPaid}>
                Mark As Paid
              </Button>
            </>
          )}

          <Button variant="default" onClick={() => setIsAlertDialogGenerateInvoiceOpen(true)}>
            <RefreshCcw />
            Generate
          </Button>
          <AlertDialog
            open={isAlertDialogGenerateInvoiceOpen}
            onOpenChange={setIsAlertDialogGenerateInvoiceOpen}>
            <AlertDialogPortal>
              <AlertDialogTitle></AlertDialogTitle>
              <AlertDialogContent className="flex flex-col p-0 overflow-hidden">
                <FormGenerateInvoice setIsAlertDialogOpen={setIsAlertDialogGenerateInvoiceOpen} />
              </AlertDialogContent>
            </AlertDialogPortal>
          </AlertDialog>
        </div>
      </div>
      <div className="grid">
        <DataTable
          pagination={pagination}
          onPaginationChange={onPaginationChange}
          rowCount={data?.total_items}
          data={data?.data ?? []}
          columns={Columnsinvoice}
          onSelectedRowsChange={setSelectedRows}
        />
      </div>
      {selectedRows.length > 0 ? (
        <React.Fragment>
          <AlertDialog
            open={isAlertDialogAddExpensesOpen}
            onOpenChange={setIsAlertDialogAddExpensesOpen}>
            <AlertDialogPortal>
              <AlertDialogTitle></AlertDialogTitle>
              <AlertDialogContent className="flex flex-col p-0 overflow-hidden">
                <FormAddExpenses
                  setIsAlertDialogOpen={setIsAlertDialogAddExpensesOpen}
                  data={selectedRows as any}
                />
              </AlertDialogContent>
            </AlertDialogPortal>
          </AlertDialog>
          <AlertDialog
            open={isAlertDialogMarkAsPainOpen}
            onOpenChange={setIsAlertDialogMarkAsPaidOpen}>
            <AlertDialogPortal>
              <AlertDialogTitle></AlertDialogTitle>
              <AlertDialogContent className="flex flex-col p-0 overflow-hidden">
                <div className="flex flex-col items-center p-5">
                  <div className="size-10 rounded-lg bg-green-200"></div>
                  <h5 className="mt-4 text-base font-semibold text-neutral-400">Are you sure?</h5>
                  <div className="text-center">
                    You&apos;re about to Mark As Paid. Do you want to continue?
                  </div>
                </div>
                <AlertDialogFooter className="w-full px-5 py-4 border-t border-neutral-200 bg-neutral-100">
                  <AlertDialogCancel className="w-full" onClick={handleAlertDialogClose}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction className="w-full" onClick={handleAlertDialogConfirm}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogPortal>
          </AlertDialog>
        </React.Fragment>
      ) : null}
    </div>
  )
}

Page.displayName = 'PageWebsiteManagementInvoice'

export default Page
