import { timeFormat } from '@/lib/utils'

export const filterDateOptions = [
  { value: `${timeFormat().format()}|${timeFormat().format()}`, label: 'Today' },
  {
    value: `${timeFormat().subtract(1, 'days').format()}|${timeFormat()
      .subtract(1, 'days')
      .format()}`,
    label: 'Yesterday'
  },
  {
    value: `${timeFormat().subtract(7, 'days').format()}|${timeFormat().format()}`,
    label: 'Last 7 Days'
  },
  {
    value: `${timeFormat().subtract(30, 'days').format()}|${timeFormat().format()}`,
    label: 'Last 30 Days'
  },
  {
    value: `${timeFormat().startOf('months').format()}|${timeFormat().format()}`,
    label: 'This Month'
  },
  {
    value: `${timeFormat().subtract(1, 'months').startOf('months').format()}|${timeFormat()
      .subtract(1, 'months')
      .endOf('months')
      .format()}`,
    label: 'Last Month'
  }
]

export const defaultStartAndEndDateReport = {
  //startDate: timeFormat().subtract(7, 'days').format(),
  //default today
  startDate: timeFormat().format(), 
  endDate: timeFormat().format()
}

export const languageOptions = [
  { value: 'id', label: 'Indonesia' },
  { value: 'en', label: 'English' }
]

export const currencyOptions = [
  { value: 'idr', label: 'IDR' },
  { value: 'usd', label: 'USD' }
]
