'use client'

import React, { useId, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogPortal,
  AlertDialogFooter,
  AlertDialogCancel
} from '@/components/ui/alert-dialog'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import AlertDialogHeaderTemplate from '@/components/alert-dialog-header-template'
import { Pencil } from 'lucide-react'
import BadgeStatus from '@/components/badge-status'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { Label } from '@/components/ui/label'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import useRoles from '@/hooks/useRoles'
import { usePost } from '@/hooks/usePost'
import { putUserAdmin } from '@/service/setting'

const FormSchema = z
  .object({
    password: z
      .string({ required_error: 'Please fill in this field.' })
      .min(6, { message: 'Password must be at least 6 characters' }),
    password_confirmation: z.string({ required_error: 'Please fill in this field.' }),
    role: z.string({ required_error: 'Please select role.' })
  })
  .refine(data => data.password === data.password_confirmation, {
    message: "Your passwords don't match",
    path: ['password_confirmation']
  })

const UpdateAdmin: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = useParams()
  const dealer_id = searchParams.get('dealer_id')
  const { post } = usePost(putUserAdmin)
  const { id: username } = params
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false)
  const id = useId()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: '',
      password_confirmation: '',
      role: ''
    }
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    post(
      {
        username: username?.toString() || '',
        dealer_id: dealer_id || '',
        payload: {
          password: data?.password,
          role: data?.role
        }
      },
      {
        onSuccess: () => {
          toast.success('user has been updated')
          setIsAlertDialogOpen(false)
          router.refresh()
        },
        onError: e => toast.error(e)
      }
    )
    toast('You submitted the following values:', {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      action: {
        label: 'Undo',
        onClick: () => console.log('Undo')
      }
    })
  }

  const { data: roles } = useRoles(dealer_id || '')
  return (
    <React.Fragment>
      <Button onClick={() => setIsAlertDialogOpen(true)} variant="outline" type="button" size="sm">
        <Pencil />
        Update User
      </Button>
      <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
        <AlertDialogPortal>
          <Form {...form}>
            <form className="space-y-6">
              <AlertDialogTitle></AlertDialogTitle>
              <AlertDialogContent className="flex gap-0 flex-col p-0 overflow-hidden">
                <AlertDialogHeaderTemplate
                  setDialogOpen={setIsAlertDialogOpen}
                  title="Update User"
                  subtitle="This method allows to create new maintenances."
                />
                <div className="p-4 border-b border-neutral-250 space-y-3">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Enter password..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password_confirmation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Repeat Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Re-enter password..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-3 p-4 max-h-[350px] overflow-auto">
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1">
                            {roles?.map((item, index) => (
                              <Label
                                key={index}
                                htmlFor={`${id}-${item?.role}`}
                                className="p-4 flex items-center justify-between gap-4 border border-neutral-250 rounded-lg cursor-pointer has-data-[state=checked]:border-neutral-400">
                                <div className="flex items-center gap-x-4">
                                  <div className="relative rounded-lg border border-neutral-250 size-16 overflow-hidden">
                                    <Image
                                      alt=""
                                      src={`/assets/images/bg-roles-super-agent.webp`}
                                      quality={100}
                                      fill
                                      sizes="100vw"
                                      style={{
                                        objectFit: 'cover',
                                        objectPosition: 'bottom right'
                                      }}
                                      unoptimized
                                    />
                                  </div>
                                  <BadgeStatus title={item?.role} styleDotStatus="orange" />
                                </div>
                                <RadioGroupItem
                                  value={item?.role}
                                  id={`${id}-${item?.role}`}
                                  aria-describedby={`${id}-${item}-description`}
                                />
                              </Label>
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <AlertDialogFooter className="w-full px-5 py-4 border-t border-neutral-200">
                  <AlertDialogCancel className="w-full" onClick={() => setIsAlertDialogOpen(false)}>
                    Cancel
                  </AlertDialogCancel>
                  <Button onClick={form.handleSubmit(onSubmit)} className="w-full">
                    Apply
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </form>
          </Form>
        </AlertDialogPortal>
      </AlertDialog>
    </React.Fragment>
  )
}

export default UpdateAdmin
