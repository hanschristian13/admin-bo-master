import React, { JSX } from 'react'
import PageSettings from '@/components/page/settings'
import { PageProps } from '@/types/page'

const page = async ({ searchParams }: PageProps): Promise<JSX.Element> => {
  const currentSearchParams = await searchParams

  return <PageSettings currentSearchParams={currentSearchParams} />
}

export default page
