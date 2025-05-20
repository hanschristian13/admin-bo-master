import { defaultStartAndEndDateReport } from './date'

interface SearchParams {
  startDate: string
  endDate: string
  limit?: string
  page?: string
  q?: string
  dealer_id?: string
  parent_id?: string
  bet_state?: string
  type?: string
  id?: string
  username?: string
  status?: string
  period?: string
}

export const getSearchParams = (
  searchParams: Record<string, string | string[] | undefined>
): SearchParams => {
  const date = searchParams?.date?.toString().split('|') || []
  return {
    startDate: date[0] ?? defaultStartAndEndDateReport.startDate,
    endDate: date[1] ?? defaultStartAndEndDateReport.endDate,
    limit: searchParams?.limit as string,
    page: searchParams?.page as string,
    q: searchParams?.q as string,
    dealer_id: searchParams?.dealer_id as string,
    parent_id: searchParams?.parent_id as string,
    bet_state: searchParams?.bet_state as string,
    type: searchParams?.type as string,
    id: searchParams?.id as string,
    username: searchParams?.username as string,
    status: searchParams?.status as string,
    period: searchParams?.period as string
  }
}
