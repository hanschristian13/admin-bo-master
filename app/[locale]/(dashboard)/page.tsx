import { getWebRole } from '@/app/action/libs'
import PageDashboard from '@/components/page/dashboard/page'

import { redirect } from 'next/navigation'

export default async function Home() {
  const webRole = await getWebRole()
  if (webRole !== 'label') return redirect('/player-active')
  return <PageDashboard />
}
