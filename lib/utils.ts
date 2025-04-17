/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { getCookie } from 'cookies-next'
import { deleteCookie } from 'cookies-next/client'
import {
  format,
  subDays,
  subMonths,
  subYears,
  addDays,
  addMonths,
  addYears,
  isEqual,
  isBefore,
  isAfter,
  startOfDay,
  startOfMonth,
  startOfYear,
  parseISO,
  endOfDay,
  endOfMonth,
  endOfYear,
  toDate,
  isValid
} from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getCookieValue = (key: string) => {
  return getCookie(key)
}

export const destroyCookie = async (key: string) => {
  deleteCookie(key)
}

type TimeUnit = 'days' | 'months' | 'years'

class FsDate {
  private date: Date

  constructor(date: Date | string = new Date()) {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date
    this.date = isValid(parsedDate) ? parsedDate : new Date()
  }

  subtract(value: number, unit: TimeUnit = 'days'): this {
    const units = { days: subDays, months: subMonths, years: subYears }
    this.date = units[unit](this.date, value)
    return this
  }

  add(value: number, unit: TimeUnit = 'days'): this {
    const units = { days: addDays, months: addMonths, years: addYears }
    this.date = units[unit](this.date, value)
    return this
  }

  format(fmt: string = 'yyyy-MM-dd'): string {
    return isValid(this.date) ? format(this.date, fmt) : 'Invalid Date'
  }

  toDate(): Date {
    return isValid(this.date) ? toDate(this.date) : new Date()
  }

  isSame(compareDate: Date | string = new Date(), unit: TimeUnit = 'days'): boolean {
    return isEqual(this.startOf(unit).date, new FsDate(compareDate).startOf(unit).date)
  }

  isBefore(compareDate: Date | string, unit: TimeUnit = 'days'): boolean {
    return isBefore(this.startOf(unit).date, new FsDate(compareDate).startOf(unit).date)
  }

  isAfter(compareDate: Date | string, unit: TimeUnit = 'days'): boolean {
    return isAfter(this.startOf(unit).date, new FsDate(compareDate).startOf(unit).date)
  }

  startOf(unit: TimeUnit): FsDate {
    const units = { days: startOfDay, months: startOfMonth, years: startOfYear }
    return new FsDate(units[unit](this.date))
  }

  endOf(unit: TimeUnit): FsDate {
    const units = { days: endOfDay, months: endOfMonth, years: endOfYear }
    return new FsDate(units[unit](this.date))
  }
}

export const timeFormat = (date?: Date | string) => new FsDate(date)

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout

  return (...args: Parameters<T>) => {
    clearTimeout(timer)
    timer = setTimeout(() => func(...args), delay)
  }
}

export function calculatePercentageChange(dataToday: number, dataYesterday: number): number {
  // Handle zero yesterday value
  if (dataYesterday === 0) {
    return dataToday === 0 ? 0 : 100 // Return 100% increase instead of Infinity
  }

  const change: number = dataToday - dataYesterday
  const percentageChange: number = (change / Math.abs(dataYesterday)) * 100
  return percentageChange
}
