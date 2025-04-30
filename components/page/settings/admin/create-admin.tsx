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
import { Plus } from 'lucide-react'
import useRoles from '@/hooks/useRoles'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useDealerList } from '@/hooks/useDealerList'
import { usePost } from '@/hooks/usePost'
import { postCreateNewStaff } from '@/service/setting'
import { useRouter } from 'next/navigation'

const FormSchema = z
  .object({
    username: z.string().min(2, {
      message: 'Username must be at least 2 characters.'
    }),
    dealer: z.string().min(4, {
      message: 'need select dealer.'
    }),
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

const CreateAdmin: React.FC = () => {
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false)
  const id = useId()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      password: '',
      password_confirmation: '',
      role: '',
      dealer: ''
    }
  })
  const { data: dealer } = useDealerList()
  const { post } = usePost(postCreateNewStaff)
  const router = useRouter()
  function onSubmit(data: z.infer<typeof FormSchema>) {
    post(
      {
        dealer_id: data?.dealer,
        username: data?.username,
        role: data?.role,
        password: data?.password,
        repeatPassword: data?.password_confirmation
      },
      {
        onSuccess: () => {
          toast.success('User has been create')
          router?.refresh()
          setIsAlertDialogOpen(false)
        },
        onError: x => toast.error(x)
      }
    )
  }

  const dealer_id = form.watch('dealer')
  const { data: roles } = useRoles(dealer_id)

  return (
    <React.Fragment>
      <Button
        className="text-neutral-50"
        onClick={() => setIsAlertDialogOpen(true)}
        variant="default">
        <Plus />
        Create User
      </Button>
      <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
        <AlertDialogPortal>
          <Form {...form}>
            <div>
              <AlertDialogTitle></AlertDialogTitle>
              <AlertDialogContent className="flex gap-0 flex-col p-0 overflow-hidden">
                <AlertDialogHeaderTemplate
                  setDialogOpen={setIsAlertDialogOpen}
                  title="Create User"
                  subtitle="This method allows to create new maintenances."
                />
                <div className="p-4 border-b border-neutral-250 space-y-3  overflow-auto">
                  <FormField
                    control={form.control}
                    name="dealer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dealer</FormLabel>

                        <Select
                          value={field?.value}
                          onValueChange={field?.onChange}
                          name="dealer"
                          defaultValue={'id'}
                          aria-label="dealer">
                          <SelectTrigger
                            id="dealer"
                            className="w-full whitespace-nowrap capitalize">
                            <SelectValue placeholder="Select dealer" />
                          </SelectTrigger>
                          <SelectContent>
                            {dealer.map(item => (
                              <SelectItem
                                key={item?.value}
                                value={item?.value}
                                className="capitalize">
                                <div></div>
                                <span>{item.label}</span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="Enter username..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                  <Button className="w-full" onClick={form?.handleSubmit(onSubmit)}>
                    Create
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </div>
          </Form>
        </AlertDialogPortal>
      </AlertDialog>
    </React.Fragment>
  )
}

export default CreateAdmin
