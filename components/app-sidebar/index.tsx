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
import { useTranslations } from 'next-intl'


export function AppSidebar({ webRole, ...props }: any) {
  const t = useTranslations()

  const data: any = {
    navDashboard: {
      title: t('nav.dashboard'),
      items: [
        {
          name: t('nav.dashboard'),
          url: '/',
          icon: <IconHome />
        }
      ]
    },
    navMain: [
      {
        title: t('nav.report'),
        url: '#',
        icon: <IconReport />,
        isActive: true,
        items: [
          {
            title: t('nav.player_active'),
            url: '/player-active'
          },
          {
            title: t('nav.clients'),
            url: '/clients'
          },
          {
            title: t('nav.slot'),
            url: '/slot'
          },
          {
            title: t('nav.profit_report'),
            url: '/profit'
          },
          {
            title: t('nav.client_shared'),
            url: '/client-shared'
          }
        ]
      }
    ],
    navSuperAgent: {
      title: t('nav.super_agent'),
      items: [
        {
          name: t('nav.super_agent'),
          url: '/super-agent',
          icon: <IconSuperAgent />
        }
      ]
    },
    gameManagement: {
      title: t('nav.game_management'),
      items: [
        {
          name: t('nav.slot_games'),
          url: '/slot-games',
          icon: <IconSlotGames />
        }
      ]
    },
    playersManagement: {
      title: t('nav.players_management'),
      items: [
        {
          name: t('nav.player_pending_transaction'),
          url: '/player-pending-transaction',
          icon: <IconPendingTransaction />
        }
      ]
    },
    websiteManagement: {
      title: t('nav.website_management'),
      items: [
        ...(webRole === 'label'
          ? [
              {
                name: t('nav.player'),
                url: '/player',
                icon: <IconPlayer />
              }
            ]
          : []),
        {
          name: t('nav.invoice'),
          url: '/invoice',
          icon: <IconInvoice />
        }
      ]
    },
    navSetting: {
      title: t('nav.settings'),
      items: [
        {
          name: t('nav.settings'),
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
