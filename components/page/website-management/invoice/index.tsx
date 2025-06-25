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
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogPortal
} from '@/components/ui/alert-dialog'
import { RefreshCcw } from 'lucide-react'
import MonthPicker from '@/components/form/month-picker'

import FormAddExpenses from './form-add-expenses'
import FormGenerateInvoice from './form-generate-invoice'
import { useGetUpdateParams, useHandlePagination } from '@/hooks'
import { ApiResponse } from '@/service'
import { formatCommonDateParams, timeFormat } from '@/lib/utils'

import FilterDealerId from '@/components/filter/filter-dealer-id'
import { usePost } from '@/hooks/usePost'
import { putInvoice } from '@/service/invoice'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import ButtonExportXLS from '@/components/ui/button-export-xls'

function getActionStates(data: { status: string }[]) {
  const statuses = [...new Set(data.map(item => item.status.toLowerCase()))]

  const isPending = statuses.includes('pending')
  const isUnpaid = statuses.includes('unpaid')
  const isPaid = statuses.includes('paid')

  const multipleStatusesSelected = statuses.length > 1

  const actions = {
    markAsPaid: false,
    publish: false,
    addExpenses: false,
    generate: true
  }

  if (multipleStatusesSelected) {
    actions.markAsPaid = false
    actions.publish = false
    actions.addExpenses = false
    actions.generate = true
  } else if (isPending) {
    actions.markAsPaid = false
    actions.publish = true
    actions.addExpenses = true
    actions.generate = true
  } else if (isUnpaid) {
    actions.markAsPaid = true
    actions.publish = false
    actions.addExpenses = false
    actions.generate = true
  } else if (isPaid) {
    actions.markAsPaid = false
    actions.publish = false
    actions.addExpenses = false
    actions.generate = true
  }

  return actions
}
const Page = ({ data }: { data: ApiResponse<InvoiceType[]> }) => {
  const [selectedRows, setSelectedRows] = useState<InvoiceType[]>([])

  const [isAlertDialogAddExpensesOpen, setIsAlertDialogAddExpensesOpen] = useState(false)
  const [isAlertDialogGenerateInvoiceOpen, setIsAlertDialogGenerateInvoiceOpen] = useState(false)
  const [modalAction, setModalAction] = useState<any>(null)
  const router = useRouter()
  const handleAddExpenses = () => {
    setIsAlertDialogAddExpensesOpen(true)
  }

  const { pagination, onPaginationChange } = useHandlePagination()

  const { setSearchParams, getValue } = useGetUpdateParams()

  const date = getValue('date')

  const { from } = formatCommonDateParams(date) || { from: new Date() }

  const { post } = usePost(putInvoice)

  const handlePublishInvoice = () => {
    const selectedId = selectedRows.map((item: any) => ({ _id: item?._id }))
    post(
      { invoices: selectedId, status: modalAction === 'publish' ? 'unpaid' : 'paid' },
      {
        onSuccess: () => {
          toast.success(`Invoice has been ${modalAction === 'published' ? 'published' : 'paid'}`)
          setModalAction(false)
          setSelectedRows(prevRows =>
            prevRows.map(row =>
              selectedId.some(selected => selected._id === row._id)
                ? { ...row, status: modalAction === 'publish' ? 'unpaid' : 'paid' }
                : row
            )
          )
          router.replace('/invoice')
        },
        onError: e => toast.error(e)
      }
    )
  }

  const buttonAction = getActionStates(selectedRows)
  return (
    <div className="flex flex-col space-y-6 w-full relative">
      <div className="flex justify-between">
        <div className="flex items-center space-x-2.5">
          <MonthPicker
            className="w-min"
            onMonthSelect={val =>
              setSearchParams({
                date: `${timeFormat(val).format()}|${timeFormat(val)?.format()}`,
                page: 1
              })
            }
            selectedMonth={timeFormat(from).toDate() || timeFormat(new Date()).format()}
          />
          <Select
            value={getValue('status')}
            onValueChange={val =>
              setSearchParams({
                status: val,
                page: 1
              })
            }
            aria-label="Results per Page">
            <SelectTrigger
              defaultValue="pending"
              id="filter Paid"
              className="w-fit whitespace-nowrap capitalize">
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
          <FilterDealerId
          // showAllOption={false}
          />
        </div>

        <div className="flex items-center space-x-2.5">
          {selectedRows.length > 0 && (
            <>
              <Button
                disabled={!buttonAction.addExpenses}
                variant="outline"
                onClick={handleAddExpenses}>
                Add Expenses
              </Button>
              <Button
                disabled={!buttonAction.publish}
                variant="default"
                onClick={() => setModalAction('publish')}>
                Publish
              </Button>
              <Button
                disabled={!buttonAction.markAsPaid}
                variant="default"
                onClick={() => setModalAction('mark-as-paid')}>
                Mark As Paid
              </Button>
            </>
          )}

          <Button variant="default" onClick={() => setIsAlertDialogGenerateInvoiceOpen(true)}>
            <RefreshCcw />
            Generate
          </Button>
          <ButtonExportXLS />
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

          <AlertDialog open={!!modalAction} onOpenChange={setModalAction}>
            <AlertDialogPortal>
              <AlertDialogTitle></AlertDialogTitle>
              <AlertDialogContent className="flex flex-col p-0 overflow-hidden">
                <div className="flex flex-col items-center p-5">
                  <div className="size-10 rounded-lg bg-green-200"></div>
                  <h5 className="mt-4 text-base font-semibold text-neutral-400">Are you sure?</h5>
                  <div className="text-center">
                    You&apos;re about to Mark As{' '}
                    {modalAction === 'mark-as-paid' ? 'Paid' : 'Publish'}. Do you want to continue?
                  </div>
                </div>
                <AlertDialogFooter className="w-full px-5 py-4 border-t border-neutral-200 bg-neutral-100">
                  <AlertDialogCancel className="w-full" onClick={() => setModalAction(null)}>
                    Cancel
                  </AlertDialogCancel>
                  <Button className="w-full" onClick={handlePublishInvoice}>
                    Continue
                  </Button>
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
