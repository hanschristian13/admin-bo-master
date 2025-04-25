/* eslint-disable @typescript-eslint/no-explicit-any */
import { InvoiceType } from '@/components/page/website-management/invoice/column'
import Request from '.'

export const getInvoice = (params: any) =>
  Request.get<{ data: InvoiceType[] }>('dealers/superadmin/invoice', { ...params })
export const getInvoiceDetail = (id: string) =>
  Request.get<any>(`/dealers/superadmin/invoice/${id}`)
export const postGenerateInvoice = (params: {
  month: number
  year: number
  dealers_id?: string[]
}) => Request.post<any>('dealers/superadmin/invoice', params)

export const putInvoiceAddOtherExpense = ({ invoices_id, other_expenses }: any) =>
  Request.put<any>('dealers/superadmin/invoice/add-other-expense', { invoices_id, other_expenses })
export const putInvoice = (payload: { invoices: any; status: any }) =>
  Request.put<any>('dealers/superadmin/invoice', payload)
