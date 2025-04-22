import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import LayoutHeader from '@/components/layout/header'
import { getCookie } from '@/app/action/libs'

async function Layout({ children }: { children: React.ReactNode }) {
  const web_role = await getCookie('WEB_ROLE')

  console.log('web_role', web_role)

  return (
    <SidebarProvider>
      <AppSidebar webRole={web_role} />
      <SidebarInset>
        <LayoutHeader />
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}

Layout.displayName = 'LayoutDashboard'

export default Layout
