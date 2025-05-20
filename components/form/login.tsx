'use client'
import React, { useActionState, useEffect } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { login } from '@/app/action/auth'
import { useForm } from '@/hooks'
import { toast } from 'sonner'

const FormLogin = () => {
  const [state, action, pending] = useActionState(login, undefined)

  const { formData, handleChange } = useForm({ username: '', password: '' })
  useEffect(() => {
    if (state?.message) {
      toast.error(state?.message as string, { position: 'top-right' })
    }
  }, [state])

  return (
    <form action={action} className="flex flex-col gap-y-6 w-full">
      <div className="flex flex-col gap-y-4">
        <div>
          <Label htmlFor="username" className="capitalize">
            username
          </Label>
          <Input
            onChange={handleChange}
            value={formData?.username}
            type="text"
            name="username"
            placeholder="enter your username"
            className="placeholder:capitalize"
          />
        </div>
        <div>
          <Label htmlFor="password" className="capitalize">
            password
          </Label>
          <Input
            onChange={handleChange}
            value={formData?.password}
            type="password"
            name="password"
            placeholder="enter your password"
            className="placeholder:capitalize"
          />
        </div>
      </div>
      <Button disabled={pending}>Login</Button>
    </form>
  )
}

export default FormLogin
