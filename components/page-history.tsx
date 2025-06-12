'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { X, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useRouter } from 'next/navigation'
import { Separator } from './ui/separator'
import { cn } from '@/lib/utils'
import { usePathname } from '@/i18n/navigation'

const getPageTitleFromPath = (path: string): string => {
  const segment = path.split('/')[1] || 'Dashboard'
  return segment.charAt(0).toUpperCase() + segment.slice(1)
}

const getStoredHistory = (): HistoryItem[] => {
  if (typeof window === 'undefined') return []
  try {
    const saved = localStorage.getItem('pageHistory')
    return saved ? JSON.parse(saved) : []
  } catch (error) {
    console.error('Failed to parse page history:', error)
    return []
  }
}

type HistoryItem = {
  title: string
  url: string
}

export default function PageHistoryTabs() {
  const router = useRouter()
  const currentPath = usePathname()

  const [visitedPages, setVisitedPages] = useState<HistoryItem[]>(() => {
    return getStoredHistory()
  })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return
    const storedHistory = getStoredHistory()
    if (storedHistory.length > 0) {
      setVisitedPages(storedHistory)
    } else if (currentPath) {
      const currentTitle = getPageTitleFromPath(currentPath)
      setVisitedPages([{ title: currentTitle, url: currentPath }])
    }
  }, [currentPath, isMounted])

  useEffect(() => {
    if (!currentPath || !isMounted) return

    const currentTitle = getPageTitleFromPath(currentPath)
    const currentPage = { title: currentTitle, url: currentPath }

    setVisitedPages(prev => {
      // Check if the page already exists in history
      const existingIndex = prev.findIndex(page => page.url === currentPath)

      if (existingIndex !== -1) {
        // If exists, remove it from current position
        const updatedPages = [...prev]
        updatedPages.splice(existingIndex, 1)
        // Add to the beginning of the array
        return [currentPage, ...updatedPages]
      } else {
        // If doesn't exist, add to beginning and limit to 10 items
        return [currentPage, ...prev].slice(0, 10)
      }
    })
  }, [currentPath, isMounted])

  useEffect(() => {
    if (isMounted && visitedPages.length > 0) {
      localStorage.setItem('pageHistory', JSON.stringify(visitedPages))
    }
  }, [visitedPages, isMounted])

  const navigateTo = (url: string) => {
    router.push(url)
  }

  const removePage = (index: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setVisitedPages(prev => prev.filter((_, i) => i !== index))
  }

  const clearAll = () => {
    const currentTitle = getPageTitleFromPath(currentPath || '')
    setVisitedPages([{ title: currentTitle, url: currentPath || '/' }])
    localStorage.setItem(
      'pageHistory',
      JSON.stringify([{ title: currentTitle, url: currentPath || '/' }])
    )
  }

  const { visiblePages, dropdownPages } = useMemo(() => {
    return {
      visiblePages: visitedPages.slice(0, 4),
      dropdownPages: visitedPages.slice(4)
    }
  }, [visitedPages])

  if (!isMounted) {
    return <div className="h-12 bg-white dark:bg-gray-900"></div>
  }

  return (
    <div className="flex gap-2 items-center bg-white dark:bg-gray-900 px-1 h-12">
      {visiblePages.map((page, index) => {
        const isActive = page.url.toLowerCase() === currentPath.toLowerCase()
        return (
          <div key={index} className="inline-flex -space-x-px rounded-md">
            <Button
              className={cn(
                'text-sm rounded-none shadow-none first:rounded-s-md last:rounded-e-md',
                visiblePages.length < 1 && 'cursor-default'
              )}
              variant={isActive ? 'default' : 'outline'}
              size="xs"
              onClick={() => (visiblePages.length > 0 ? navigateTo(page.url) : {})}>
              {page.title}
            </Button>
            {visiblePages.length > 1 ? (
              <Button
                className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md"
                variant={isActive ? 'default' : 'outline'}
                onClick={e => {
                  removePage(index, e)
                }}
                size="xs">
                <X className="h-3 w-3 " />
              </Button>
            ) : null}
          </div>
        )
      })}

      {dropdownPages.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="xs">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {dropdownPages.map((page, index) => (
              <DropdownMenuItem
                key={index}
                className="flex justify-between items-center"
                onClick={() => navigateTo(page.url)}>
                <span>{page.title}</span>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={e => {
                    removePage(index + 4, e)
                  }}>
                  <X className="h-3 w-3" />
                </Button>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {visitedPages.length > 1 ? (
        <React.Fragment>
          <Separator orientation="vertical" className="data-[orientation=vertical]:h-[28px]" />
          <Button
            variant="outline"
            size="xs"
            className="ml-auto mr-2 text-sm text-red-950"
            onClick={clearAll}>
            Clear All
          </Button>
        </React.Fragment>
      ) : null}
    </div>
  )
}
