/* eslint-disable @typescript-eslint/no-explicit-any */
import { InvoiceType } from '@/components/page/website-management/invoice/column'
import Request from '.'

export const getInvoice = (params: { statuses?: string[] }) =>
  Request.get<{ data: InvoiceType[] }>('dealers/superadmin/invoice', { ...params })
export const getInvoiceDetail = (id: string) =>
  Request.get<any>(`/dealers/superadmin/invoice/${id}`)
export const postGenerateInvoice = (params: {
  month: number
  year: number
  dealers_id?: string[]
}) => Request.post<any>('dealers/superadmin/invoice', params)
