import React from 'react'
import {
  SidebarTrigger,
} from "@/components/ui/sidebar"
import PageHistory from '@/components/page-history'
import { ComboboxLang } from '@/components/form/combobox-lang'
import { ComboboxUserMenu } from '@/components/form/combobox-user-menu'

const LayoutHeader = () => {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b border-neutral-200 bg-white">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <PageHistory />
      </div>
      <div className='flex items-center pr-6'>
        <ComboboxLang />
        <ComboboxUserMenu />
      </div>
    </header>
  )
}

export default LayoutHeader
