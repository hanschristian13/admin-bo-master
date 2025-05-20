import React from 'react'
import type { Metadata } from "next"
import PageSuperAgent from '@/components/page/super-agent'
import { PageProps } from '@/types/page';
export const metadata: Metadata = {
  title: "Super Agent",
  description: "Super Agent",
};

const page = async ({ ...props }: PageProps) => {
  return (
    <PageSuperAgent
      {...props}
    />
  )
}

page.displayName = 'PageSuperAgent'

export default page
