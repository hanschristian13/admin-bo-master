/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import * as React from 'react'
import {
  IconHome,
  IconReport,
  IconSuperAgent,
  IconSlotGames,
  IconPendingTransaction,
  IconPlayer,
  IconInvoice,
  IconSettings
} from '@/components/icon'
import { NavMain } from '@/components/app-sidebar/nav-main'
import { NavGrouping } from '@/components/app-sidebar/nav-grouping'
import { Sidebar, SidebarContent, SidebarRail } from '@/components/ui/sidebar'
import ContainerLogo from '../container-logo'
import DateTimeDisplay from '../data-time-display'
import { Separator } from '../ui/separator'

export function AppSidebar({ webRole, ...props }: any) {
  const data: any = {
    navDashboard: {
      title: undefined,
      items: [
        {
          name: 'dashboard',
          url: '/',
          icon: <IconHome />
        }
      ]
    },
    navMain: [
      {
        title: 'Report',
        url: '#',
        icon: <IconReport />,
        isActive: true,
        items: [
          {
            title: 'Player Active',
            url: '/player-active'
          },
          {
            title: 'Clients',
            url: '/clients'
          },
          {
            title: 'Slot',
            url: '/slot'
          },
          {
            title: 'Profit Report',
            url: '/profit'
          },
          {
            title: 'Client Shared',
            url: '/client-shared'
          }
        ]
      }
    ],
    navSuperAgent: {
      title: undefined,
      items: [
        {
          name: 'super agent',
          url: '/super-agent',
          icon: <IconSuperAgent />
        }
      ]
    },
    gameManagement: {
      title: 'game management',
      items: [
        {
          name: 'slot games',
          url: '/slot-games',
          icon: <IconSlotGames />
        }
      ]
    },
    playersManagement: {
      title: 'players management',
      items: [
        {
          name: 'player pending transaction',
          url: '/player-pending-transaction',
          icon: <IconPendingTransaction />
        }
      ]
    },
    websiteManagement: {
      title: 'website management',
      items: [
        ...(webRole === 'label'
          ? [
              {
                name: 'player',
                url: '/player',
                icon: <IconPlayer />
              }
            ]
          : []),
        {
          name: 'invoice',
          url: '/invoice',
          icon: <IconInvoice />
        }
      ]
    },
    navSetting: {
      title: undefined,
      items: [
        {
          name: 'settings',
          url: '/settings',
          icon: <IconSettings />
        }
      ]
    }
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <div
        data-slot="sidebar-content"
        data-sidebar="content"
        className="flex flex-col gap-y-[1.125rem] px-2 group-data-[collapsible=icon]:px-2">
        <div className="flex flex-col gap-y-2">
          <ContainerLogo />
          <Separator orientation="horizontal" />
          <DateTimeDisplay />
        </div>
        <SidebarContent>
          {webRole === 'label' && <NavGrouping data={data.navDashboard} />}

          <NavMain items={data.navMain} />
          <NavGrouping data={data.navSuperAgent} />
          {webRole === 'label' && <NavGrouping data={data.gameManagement} />}
          {webRole === 'label' && <NavGrouping data={data.playersManagement} />}

          <NavGrouping data={data.websiteManagement} />
          <Separator orientation="horizontal" />
          {webRole === 'label' && <NavGrouping data={data.navSetting} />}
        </SidebarContent>
      </div>
      <SidebarRail />
    </Sidebar>
  )
}
