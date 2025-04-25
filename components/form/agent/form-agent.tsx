'use client'
import React, { useActionState, useEffect, useMemo } from 'react'
import ButtonBack from '@/components/form/button-back'
import { Card, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SuperAgentType } from '@/types/super-agent'
import { createAgent, updateAgent } from '@/app/action/agent'
import { intialForm } from '@/components/form/agent/initial-form'
import { Label } from '@/components/ui/label'
import { currencyOptions, languageOptions } from '@/constant/date'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { Switch } from '@/components/ui/switch'
import { useRouter } from 'next/navigation'

interface FormAgentProps {
  data: SuperAgentType[] | undefined
  superAgentId: string
  agentId: string
}

const CreateClient: React.FC<FormAgentProps> = ({ data, superAgentId, agentId }) => {
  const getAgentById: SuperAgentType | undefined = useMemo(() => {
    if (agentId && typeof data === 'object') {
      return data.find(agent => agent._id === agentId)
    }
  }, [data, agentId])

  if (getAgentById) {
    getAgentById.agent_name = getAgentById._id
  }

  const modeEdit = typeof getAgentById === 'object' ? true : false

  const initialInput = modeEdit ? getAgentById : intialForm

  function removeProperties<T extends object, K extends keyof T>(
    obj: T | undefined,
    properties: K[]
  ): Omit<T, K> | undefined {
    if (obj === undefined) {
      return undefined
    }

    const newObj = { ...obj }
    properties.forEach(prop => delete newObj[prop])
    return newObj as Omit<T, K>
  }
  const handelData = removeProperties(initialInput, [
    '_id',
    'api_key',
    'secret',
    'mutasiku_api_key',
    'mutasiku_secret_key',
    'mutasiku_endpoint',
    'wallet_type',
    'client_url',
    'ip',
    'subdealer_id',
    'balance',
    'cashier_url',
    'base_url',
    'brand_name',
    'occurrence',
    'auto_deposit',
    'live_event',
    'mailgun_domain',
    'mailgun_status',
    'vercel_project',
    'brand_logo',
    'brand_logo_mobile',
    'brand_favicon',
    'minimum_deposit'
  ])

  const router = useRouter()
  // @ts-expect-error error type
  const [state, formAction, isPending] = useActionState(modeEdit ? updateAgent : createAgent, {
    success: false,
    message: '',
    values: handelData
  })

  useEffect(() => {
    if (state.success) {
      router.push(`/super-agent?superAgentId=${superAgentId}`)
      toast.success(state.message)
    } else if (!state.success && state.message !== '') {
      toast.warning(state.message)
    }
  }, [state, router, superAgentId])

  const values = state.values || getAgentById

  return (
    <div className="space-y-6">
      <ButtonBack url={`/super-agent?superAgentId=${superAgentId}`} />
      <form action={formAction} className="space-y-6">
        <Input type="hidden" name="id" value={agentId} />
        <Input type="hidden" name="type" value="agent" />
        {modeEdit ? (
          <React.Fragment>
            <Input type="hidden" name="parent_id" value={superAgentId} />
            <Input type="hidden" name="agent_name" value={values?.agent_name} />
            <Input type="hidden" name="short_code" value={values?.agent_name} />
          </React.Fragment>
        ) : null}
        <Card>
          <CardHeader className="px-3 py-[14px] border-b border-neutral-200">
            <div className="flex items-center justify-between gap-1.5">
              <div className="text-neutral-300 flex items-center gap-x-3">
                <Image
                  alt=""
                  width={32}
                  height={32}
                  src="/assets/images/icon-agent.webp"
                  unoptimized
                  quality={100}
                />
                <span className="text-base font-medium text-neutral-400">Agent information</span>
              </div>
              <div>
                <div
                  className={cn(
                    'flex flex-col items-end justify-center gap-y-2',
                    state.validationErrors?.active && 'text-red-950'
                  )}>
                  <Label htmlFor="active" className="text-neutral-300">
                    Status Agent
                  </Label>
                  <Switch name="active" defaultChecked={values?.active} aria-readonly />
                </div>
              </div>
            </div>
          </CardHeader>
          <div className="p-4 grid gap-4 lg:grid-cols-2">
            <div>
              <div className="space-y-2">
                <Label
                  htmlFor="agent_name"
                  className={state.validationErrors?.agent_name ? 'text-red-950' : ''}>
                  Agent Name
                </Label>
                <Input
                  id="agent_name"
                  name="agent_name"
                  placeholder="Enter name..."
                  disabled={modeEdit ? true : false}
                  defaultValue={values?.agent_name}
                  className={state.validationErrors?.agent_name ? 'border-red-950' : ''}
                />
              </div>
              {state.validationErrors?.agent_name && (
                <p className="text-xs font-medium text-red-950">
                  {state.validationErrors?.agent_name[0]}
                </p>
              )}
            </div>
            <div>
              <div className="space-y-2">
                <Label
                  htmlFor="short_code"
                  className={state.validationErrors?.short_code ? 'text-red-950' : ''}>
                  Short Code
                </Label>
                <Input
                  id="short_code"
                  name="short_code"
                  placeholder="Enter name..."
                  disabled={modeEdit ? true : false}
                  defaultValue={values?.short_code}
                  className={state.validationErrors?.short_code ? 'border-red-950' : ''}
                />
              </div>
              {state.validationErrors?.short_code && (
                <p className="text-xs font-medium text-red-950">
                  {state.validationErrors?.short_code[0]}
                </p>
              )}
            </div>
          </div>
        </Card>
        <Card>
          <CardHeader className="px-3 py-[14px] border-b border-neutral-200">
            <div className="flex items-center justify-between gap-1.5">
              <div className="text-neutral-300 flex items-center gap-x-3">
                <Image
                  alt=""
                  width={32}
                  height={32}
                  src="/assets/images/icon-settings.webp"
                  unoptimized
                  quality={100}
                />
                <span className="text-base font-medium text-neutral-400">Global Settings</span>
              </div>
            </div>
          </CardHeader>
          <div className="p-4 grid gap-4 lg:grid-cols-4">
            <div>
              <div className="space-y-2">
                <Label
                  htmlFor="language"
                  className={state.validationErrors?.language ? 'text-red-950' : ''}>
                  Language
                </Label>
                <Select
                  name="language"
                  defaultValue={values?.language?.[0]?.toLowerCase() || 'id'}
                  aria-label="language">
                  <SelectTrigger id="language" className="w-full whitespace-nowrap capitalize">
                    <SelectValue placeholder="Select Language wkwkwk" />
                  </SelectTrigger>
                  <SelectContent>
                    {languageOptions.map(item => (
                      <SelectItem
                        key={item.value}
                        value={item.value.toString()}
                        className="capitalize">
                        <div></div>
                        <span>{item.label}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {state.validationErrors?.language && (
                <p className="text-xs font-medium text-red-950">
                  {state.validationErrors?.language[0]}
                </p>
              )}
            </div>
            <div>
              <div className="space-y-2">
                <Label
                  htmlFor="currency"
                  className={state.validationErrors?.currency ? 'text-red-950' : ''}>
                  Currency
                </Label>
                <Select
                  name="currency"
                  defaultValue={values?.currency.toLowerCase() || 'idr'}
                  aria-label="currency">
                  <SelectTrigger id="currency" className="w-full whitespace-nowrap capitalize">
                    <SelectValue placeholder="Select Currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencyOptions.map(item => (
                      <SelectItem
                        key={item.value}
                        value={item.value.toString()}
                        className="capitalize">
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {state.validationErrors?.currency && (
                <p className="text-xs font-medium text-red-950">
                  {state.validationErrors?.currency[0]}
                </p>
              )}
            </div>
            <div>
              <div className="space-y-2">
                <Label
                  htmlFor="lobby_url"
                  className={
                    state.validationErrors?.['client_environments.0.lobby_url']?.[0]
                      ? 'text-red-950'
                      : ''
                  }>
                  Lobby Url
                </Label>
                <div className="flex rounded-md shadow-xs">
                  <span
                    className={cn(
                      'border-input bg-background text-muted-foreground inline-flex items-center rounded-s-md border px-3 text-sm',
                      state.validationErrors?.['client_environments.0.lobby_url']?.[0] &&
                        'border-red-950'
                    )}>
                    https://
                  </span>
                  <Input
                    id="lobby_url"
                    name="lobby_url"
                    placeholder="Enter name..."
                    defaultValue={
                      values?.client_environments?.[0]?.lobby_url
                        ? values?.client_environments?.[0]?.lobby_url.split('//')[1]
                        : ''
                    }
                    className={cn(
                      '-ms-px rounded-s-none shadow-none',
                      state.validationErrors?.['client_environments.0.lobby_url']?.[0] &&
                        'border-red-950'
                    )}
                  />
                </div>
              </div>
              {state.validationErrors?.['client_environments.0.lobby_url']?.[0] && (
                <p className="text-xs font-medium text-red-950">
                  {state.validationErrors?.['client_environments.0.lobby_url']?.[0]}
                </p>
              )}
            </div>
            <div>
              <div className="space-y-2">
                <Label
                  htmlFor="api_endpoint"
                  className={
                    state.validationErrors?.['client_environments.0.api_endpoint']?.[0]
                      ? 'text-red-950'
                      : ''
                  }>
                  API URL Endpoint
                </Label>

                <div className="flex rounded-md shadow-xs">
                  <span
                    className={cn(
                      'border-input bg-background text-muted-foreground inline-flex items-center rounded-s-md border px-3 text-sm',
                      state.validationErrors?.['client_environments.0.lobby_url']?.[0] &&
                        'border-red-950'
                    )}>
                    https://
                  </span>
                  <Input
                    id="api_endpoint"
                    name="api_endpoint"
                    placeholder="Enter name..."
                    defaultValue={
                      values?.client_environments?.[0]?.api_endpoint
                        ? values?.client_environments?.[0]?.api_endpoint.split('//')[1]
                        : ''
                    }
                    className={cn(
                      '-ms-px rounded-s-none shadow-none',
                      state.validationErrors?.['client_environments.0.api_endpoint']?.[0]
                        ? 'border-red-950'
                        : ''
                    )}
                  />
                </div>
              </div>
              {state.validationErrors?.['client_environments.0.api_endpoint']?.[0] && (
                <p className="text-xs font-medium text-red-950">
                  {state.validationErrors?.['client_environments.0.api_endpoint']?.[0]}
                </p>
              )}
            </div>
            <div>
              <div className="space-y-2">
                <Label
                  htmlFor="host"
                  className={state.validationErrors?.host ? 'text-red-950' : ''}>
                  Host
                </Label>

                <div className="flex rounded-md shadow-xs">
                  <span
                    className={cn(
                      'border-input bg-background text-muted-foreground inline-flex items-center rounded-s-md border px-3 text-sm',
                      state.validationErrors?.host && 'border-red-950'
                    )}>
                    https://
                  </span>
                  <Input
                    id="host"
                    name="host"
                    placeholder="Enter host..."
                    defaultValue={values?.host.split('//')?.[1]}
                    className={cn(
                      '-ms-px rounded-s-none shadow-none',
                      state.validationErrors?.host && 'border-red-950'
                    )}
                  />
                </div>
              </div>
              {state.validationErrors?.host && (
                <p className="text-xs font-medium text-red-950">{state.validationErrors?.host}</p>
              )}
            </div>
          </div>
        </Card>
        <Card>
          <CardHeader className="px-3 py-[14px] border-b border-neutral-200">
            <div className="flex items-center justify-between gap-1.5">
              <div className="text-neutral-300 flex items-center gap-x-3">
                <Image
                  alt=""
                  width={32}
                  height={32}
                  src="/assets/images/icon-profit.webp"
                  unoptimized
                  quality={100}
                />
                <span className="text-base font-medium text-neutral-400">Profit Sharing</span>
              </div>
            </div>
          </CardHeader>
          <div className="p-4 grid gap-4 lg:grid-cols-3">
            <div>
              <div className="space-y-2">
                <Label
                  htmlFor="company_percentage"
                  className={
                    state.validationErrors?.company_percentage ||
                    state.validationErrors?.['company_percentage.master_agent_percentage']?.[0]
                      ? 'text-red-950'
                      : ''
                  }>
                  Profit Sharing Label
                </Label>
                <Input
                  id="company_percentage"
                  name="company_percentage"
                  placeholder="Enter profit sharing..."
                  defaultValue={values?.company_percentage}
                  className={
                    state.validationErrors?.company_percentage ||
                    state.validationErrors?.['company_percentage.master_agent_percentage']?.[0]
                      ? 'border-red-950'
                      : ''
                  }
                />
              </div>
              {state.validationErrors?.company_percentage && (
                <p className="text-xs font-medium text-red-950">
                  {state.validationErrors?.company_percentage[0]}
                </p>
              )}
              {state.validationErrors?.['company_percentage.master_agent_percentage']?.[0] && (
                <p className="text-xs font-medium text-red-950">
                  {state.validationErrors?.['company_percentage.master_agent_percentage']?.[0]}
                </p>
              )}
            </div>
            <div>
              <div className="space-y-2">
                <Label
                  htmlFor="master_agent_percentage"
                  className={
                    state.validationErrors?.master_agent_percentage ||
                    state.validationErrors?.['company_percentage.master_agent_percentage']?.[0]
                      ? 'text-red-950'
                      : ''
                  }>
                  Profit Sharing Agent
                </Label>
                <Input
                  id="master_agent_percentage"
                  name="master_agent_percentage"
                  placeholder="Enter profit sharing..."
                  defaultValue={values?.master_agent_percentage}
                  className={
                    state.validationErrors?.master_agent_percentage ||
                    state.validationErrors?.['company_percentage.master_agent_percentage']?.[0]
                      ? 'border-red-950'
                      : ''
                  }
                />
              </div>
              {state.validationErrors?.master_agent_percentage && (
                <p className="text-xs font-medium text-red-950">
                  {state.validationErrors?.master_agent_percentage[0]}
                </p>
              )}
              {state.validationErrors?.['company_percentage.master_agent_percentage']?.[0] && (
                <p className="text-xs font-medium text-red-950">
                  {state.validationErrors?.['company_percentage.master_agent_percentage']?.[0]}
                </p>
              )}
            </div>
            <div>
              <div className="space-y-2">
                <Label
                  htmlFor="master_company_percentage"
                  className={
                    state.validationErrors?.master_company_percentage ? 'text-red-950' : ''
                  }>
                  Super Agent Referral Fee
                </Label>
                <Input
                  id="master_company_percentage"
                  name="master_company_percentage"
                  placeholder="Enter fee..."
                  defaultValue={values?.master_company_percentage}
                  className={
                    state.validationErrors?.master_company_percentage ? 'border-red-950' : ''
                  }
                />
              </div>
              {state.validationErrors?.master_company_percentage && (
                <p className="text-xs font-medium text-red-950">
                  {state.validationErrors?.master_company_percentage[0]}
                </p>
              )}
            </div>
          </div>
        </Card>
        <Card>
          <CardHeader className="px-3 py-[14px] border-b border-neutral-200">
            <div className="flex items-center justify-between gap-1.5">
              <div className="text-neutral-300 flex items-center gap-x-3">
                <Image
                  alt=""
                  width={32}
                  height={32}
                  src="/assets/images/icon-user.webp"
                  unoptimized
                  quality={100}
                />
                <span className="text-base font-medium text-neutral-400">PIC Finance</span>
              </div>
            </div>
          </CardHeader>
          <div className="p-4 grid gap-4 lg:grid-cols-3">
            <div>
              <div className="space-y-2">
                <Label
                  htmlFor="agent_pic_finance_name"
                  className={
                    state.validationErrors?.['agent_pic.0.pic_name']?.[0] ? 'text-red-950' : ''
                  }>
                  Name
                </Label>
                <Input
                  id="agent_pic_finance_name"
                  name="agent_pic_finance_name"
                  placeholder="Enter name..."
                  defaultValue={
                    values?.agent_pic?.find(item => item.pic_type === 'finance')?.pic_name
                  }
                  className={
                    state.validationErrors?.['agent_pic.0.pic_name']?.[0] ? 'border-red-950' : ''
                  }
                />
              </div>
              {state.validationErrors?.['agent_pic.0.pic_name']?.[0] && (
                <p className="text-xs font-medium text-red-950">
                  {state.validationErrors?.['agent_pic.0.pic_name']?.[0]}
                </p>
              )}
            </div>
            <div>
              <div className="space-y-2">
                <Label
                  htmlFor="agent_pic_finance_email"
                  className={
                    state.validationErrors?.['agent_pic.0.pic_email']?.[0] ? 'text-red-950' : ''
                  }>
                  Email
                </Label>
                <Input
                  id="agent_pic_finance_email"
                  name="agent_pic_finance_email"
                  placeholder="Enter email..."
                  defaultValue={
                    values?.agent_pic?.find(item => item.pic_type === 'finance')?.pic_email
                  }
                  className={
                    state.validationErrors?.['agent_pic.0.pic_email']?.[0] ? 'border-red-950' : ''
                  }
                />
              </div>
              {state.validationErrors?.['agent_pic.0.pic_email']?.[0] && (
                <p className="text-xs font-medium text-red-950">
                  {state.validationErrors?.['agent_pic.0.pic_email']?.[0]}
                </p>
              )}
            </div>
            <div>
              <div className="space-y-2">
                <Label
                  htmlFor="agent_pic_finance_telegram"
                  className={
                    state.validationErrors?.['agent_pic.0.pic_telegram']?.[0] ? 'text-red-950' : ''
                  }>
                  Telegram
                </Label>
                <Input
                  id="agent_pic_finance_telegram"
                  name="agent_pic_finance_telegram"
                  placeholder="Enter telegram..."
                  defaultValue={
                    values?.agent_pic?.find(item => item.pic_type === 'finance')?.pic_telegram
                  }
                  className={
                    state.validationErrors?.['agent_pic.0.pic_telegram']?.[0]
                      ? 'border-red-950'
                      : ''
                  }
                />
              </div>
              {state.validationErrors?.['agent_pic.0.pic_telegram']?.[0] && (
                <p className="text-xs font-medium text-red-950">
                  {state.validationErrors?.['agent_pic.0.pic_telegram']?.[0]}
                </p>
              )}
            </div>
          </div>
        </Card>
        <Card>
          <CardHeader className="px-3 py-[14px] border-b border-neutral-200">
            <div className="flex items-center justify-between gap-1.5">
              <div className="text-neutral-300 flex items-center gap-x-3">
                <Image
                  alt=""
                  width={32}
                  height={32}
                  src="/assets/images/icon-user.webp"
                  unoptimized
                  quality={100}
                />
                <span className="text-base font-medium text-neutral-400">PIC Technical</span>
              </div>
            </div>
          </CardHeader>
          <div className="p-4 grid gap-4 lg:grid-cols-3">
            <div>
              <div className="space-y-2">
                <Label
                  htmlFor="agent_pic_technical_name"
                  className={
                    state.validationErrors?.['agent_pic.1.pic_name']?.[0] ? 'text-red-950' : ''
                  }>
                  Name
                </Label>
                <Input
                  id="agent_pic_technical_name"
                  name="agent_pic_technical_name"
                  placeholder="Enter name..."
                  defaultValue={
                    values?.agent_pic?.find(item => item.pic_type === 'technical')?.pic_name
                  }
                  className={
                    state.validationErrors?.['agent_pic.1.pic_name']?.[0] ? 'border-red-950' : ''
                  }
                />
              </div>
              {state.validationErrors?.['agent_pic.1.pic_name']?.[0] && (
                <p className="text-xs font-medium text-red-950">
                  {state.validationErrors?.['agent_pic.1.pic_name']?.[0]}
                </p>
              )}
            </div>
            <div>
              <div className="space-y-2">
                <Label
                  htmlFor="agent_pic_technical_email"
                  className={
                    state.validationErrors?.['agent_pic.1.pic_email']?.[0] ? 'text-red-950' : ''
                  }>
                  Email
                </Label>
                <Input
                  id="agent_pic_technical_email"
                  name="agent_pic_technical_email"
                  placeholder="Enter email..."
                  defaultValue={
                    values?.agent_pic?.find(item => item.pic_type === 'technical')?.pic_email
                  }
                  className={
                    state.validationErrors?.['agent_pic.1.pic_email']?.[0] ? 'border-red-950' : ''
                  }
                />
              </div>
              {state.validationErrors?.['agent_pic.1.pic_email']?.[0] && (
                <p className="text-xs font-medium text-red-950">
                  {state.validationErrors?.['agent_pic.1.pic_email']?.[0]}
                </p>
              )}
            </div>
            <div>
              <div className="space-y-2">
                <Label
                  htmlFor="agent_pic_technical_telegram"
                  className={
                    state.validationErrors?.['agent_pic.1.pic_telegram']?.[0] ? 'text-red-950' : ''
                  }>
                  Telegram
                </Label>
                <Input
                  id="agent_pic_technical_telegram"
                  name="agent_pic_technical_telegram"
                  placeholder="Enter telegram..."
                  defaultValue={
                    values?.agent_pic?.find(item => item.pic_type === 'technical')?.pic_telegram
                  }
                  className={
                    state.validationErrors?.['agent_pic.1.pic_telegram']?.[0]
                      ? 'border-red-950'
                      : ''
                  }
                />
              </div>
              {state.validationErrors?.['agent_pic.1.pic_telegram']?.[0] && (
                <p className="text-xs font-medium text-red-950">
                  {state.validationErrors?.['agent_pic.1.pic_telegram']?.[0]}
                </p>
              )}
            </div>
          </div>
        </Card>
        <div className="flex justify-end gap-x-2.5">
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button variant="default" type="submit" disabled={isPending ? true : false}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreateClient
