import React from 'react'
import { Card } from '@/components/ui/card'
import InitialAvatar from '@/components/initial-avatar'
import { Admin } from '@/types/user'
import BadgeStatus from '@/components/badge-status'
import { Badge } from '@/components/ui/badge'

interface CardAdminProps {
  data: Admin
}

const CardAdmin: React.FC<CardAdminProps> = ({ data }) => {
  return (
    <Card className="flex flex-col overflow-hidden text-sm text-neutral-400 cursor-pointer">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <InitialAvatar name={data?.username} />
          <div className="flex flex-col text-sm font-medium">
            <span>{data?.username}</span>
          </div>
        </div>
        <BadgeStatus
          title={data?.role}
          styleDotStatus={
            data?.role.toLowerCase() === 'master'
              ? 'green'
              : data?.role.toLowerCase() === 'super agent'
              ? 'orange'
              : 'blue'
          }
        />
      </div>
      <div className="bg-neutral-100 border-t border-neutral-200 p-4 flex items-center justify-between gap-x-4 text-neutral-400 capitalize">
        <Badge variant="outline" className="text-sm font-medium text-neutral-300">
          dealer: {data?.dealer_id}
        </Badge>
      </div>
    </Card>
  )
}

export default CardAdmin
