"use client"

import React from "react"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { type NavGroupingType } from "@/components/app-sidebar/types"
import { usePathname } from "next/navigation"
import Link from "next/link"

function NavGrouping({
  data,
}: NavGroupingType ) {
  const pathname = usePathname()
  return (
    <SidebarGroup className="p-0">
      {data?.title &&
        <SidebarGroupLabel className="capitalize">{data?.title}</SidebarGroupLabel>
      }
      <SidebarMenu>
        {data.items.map((item) => (
          <Collapsible
            key={item.name}
            asChild
            defaultOpen={false}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton asChild className="capitalize" tooltip={item.name} isActive={pathname === item.url ? true : false}>
                  <Link href={item.url}>
                    <span className="flex gap-x-2 items-center text-sm font-normal">
                      {item.icon &&
                        <span
                          className="text-base"
                        >{item.icon}</span>
                      }
                      <span className="capitalize">{item.name}</span>
                    </span>
                  </Link>
                </SidebarMenuButton>
              </CollapsibleTrigger>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

export { NavGrouping }
