/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Card, CardContent } from './ui/card'
import Image from 'next/image'
const CardRoleDetail = ({ children, label }: any) => {
  return (
    <Card className="w-full h-fit oveflow-hidden p-2 ">
      <CardContent className="flex flex-col items-center pt-6 pb-5 space-y-5 relative overflow-hidden bg-[url('/assets/images/background-card-super-agent.webp')] rounded-lg">
        <div className="relative flex items-center justify-center flex-col">
          <Image
            alt=""
            width={124}
            height={124}
            src="/assets/images/icon-settings.webp"
            unoptimized
            quality={100}
          />
          <h4 className="font-semibold mt-4">{label || 'Create new roles for user'}</h4>
        </div>
      </CardContent>
      <div className="-mx-2 border-t border-neutral-250 relative px-4 py-2">{children}</div>
    </Card>
  )
}

export default CardRoleDetail
