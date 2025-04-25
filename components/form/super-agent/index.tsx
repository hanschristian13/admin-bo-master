'use client'

import React, { useActionState, useEffect } from 'react'
import {
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { SuperAgentTypeV2 } from '@/types/super-agent'
import { createSuperAgent, updateSuperAgent } from '@/app/action/super-agent'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { AlertDialogDescription } from '@radix-ui/react-alert-dialog'
import { toast } from 'sonner'

interface FormSuperAgentProps {
  setIsAlertDialogOpen: (value: boolean) => void
  data: SuperAgentTypeV2 | undefined
}

const FormSuperAgent: React.FC<FormSuperAgentProps> = ({ setIsAlertDialogOpen, data }) => {
  const isTypeUpdate = typeof data === 'object'
  const initialInput = data || {
    agent_name: '',
    email: '',
    phone_number: '',
    type: '',
    short_code: '',
    active: false
  }

  const [state, formAction] = useActionState(
    typeof data === 'object' ? updateSuperAgent : createSuperAgent,
    {
      success: false,
      message: '',
      values: initialInput
    }
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleAlertDialogClose = () => {
    setIsAlertDialogOpen(false)
  }

  useEffect(() => {
    if (state.success) {
      toast.success(state.message)
      handleAlertDialogClose()
    } else if (!state.success && state.message !== '') {
      toast.warning(state.message)
    }
  }, [state, handleAlertDialogClose])

  const values = state.values || data

  // const handleAlertDialogConfirm = () => {
  //   setIsAlertDialogOpen(false);
  // };

  return (
    <form action={formAction}>
      <AlertDialogTitle className="flex items-start justify-between w-full px-4 py-5 border-b border-neutral-250">
        <div className="flex gap-x-3 items-start">
          <Image
            alt=""
            width={42}
            height={42}
            src="/assets/images/dialog-header.webp"
            unoptimized
            quality={100}
          />
          <div className="flex flex-col justify-center">
            <span className="text-base font-semibold text-neutral-400">
              {isTypeUpdate ? 'Update ' : 'Create new '} super agent
            </span>
            <p className="text-sm font-normal text-neutral-300">
              This method allows to{' '}
              {isTypeUpdate ? 'update data super agent' : 'create new super agent'}
            </p>
          </div>
        </div>
        <Button
          variant={'ghost'}
          type="button"
          className="has-[>svg]:p-1 size-5"
          onClick={() => setIsAlertDialogOpen(false)}>
          <X className="size-5 text-neutral-300" />
        </Button>
      </AlertDialogTitle>
      <AlertDialogDescription></AlertDialogDescription>
      <div className="space-y-3 p-4">
        <div className="grid gap-2.5 md:grid-cols-2">
          <Input type="hidden" name="id" value={values?.agent_name} />
          <Input type="hidden" name="type" value="superagent" />
          <div className="space-y-2">
            <div>
              <Label
                htmlFor="agent_name"
                className={state.validationErrors?.agent_name ? 'text-red-950' : ''}>
                Name
              </Label>
              <Input
                id="agent_name"
                name="agent_name"
                disabled={isTypeUpdate}
                placeholder="Enter name..."
                defaultValue={values?.agent_name}
                className={state.validationErrors?.agent_name ? 'border-red-950' : ''}
              />
              {state.validationErrors?.agent_name && (
                <p className="text-xs font-medium text-red-950">
                  {state.validationErrors?.agent_name[0]}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <Label
                htmlFor="short_code"
                className={state.validationErrors?.short_code ? 'text-red-950' : ''}>
                Short Code
              </Label>
              <Input
                id="short_code"
                name="short_code"
                disabled={isTypeUpdate}
                placeholder="Enter code..."
                defaultValue={values?.short_code}
                className={state.validationErrors?.short_code ? 'border-red-950' : ''}
              />
              {state.validationErrors?.short_code && (
                <p className="text-xs font-medium text-red-950">
                  {state.validationErrors?.short_code[0]}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div>
            <Label htmlFor="email" className={state.validationErrors?.email ? 'text-red-950' : ''}>
              Email
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="Enter email..."
              defaultValue={values?.email}
              className={state.validationErrors?.email ? 'border-red-950' : ''}
            />
            {state.validationErrors?.email && (
              <p className="text-xs font-medium text-red-950">{state.validationErrors?.email[0]}</p>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <div>
            <Label
              htmlFor="phone_number"
              className={state.validationErrors?.phone_number ? 'text-red-950' : ''}>
              Phone Number
            </Label>
            <Input
              id="phone_number"
              name="phone_number"
              placeholder="Enter phone_number..."
              className={state.validationErrors?.phone_number ? 'border-red-950' : ''}
            />
            {state.validationErrors?.phone_number && (
              <p className="text-xs font-medium text-red-950">
                {state.validationErrors?.phone_number[0]}
              </p>
            )}
          </div>
        </div>
        <div
          className={cn(
            'flex items-center justify-between py-2',
            state.validationErrors?.active && 'text-red-950'
          )}>
          <Label htmlFor="active">Account Status</Label>
          <Switch name="active" defaultChecked={values?.active} aria-readonly />
        </div>
      </div>
      <AlertDialogFooter className="w-full px-5 py-4 border-t border-neutral-200">
        <AlertDialogCancel className="w-full" onClick={handleAlertDialogClose}>
          Cancel
        </AlertDialogCancel>
        <Button variant="default" className="w-full" type="submit">
          Apply
        </Button>
      </AlertDialogFooter>
    </form>
  )
}

export default FormSuperAgent
