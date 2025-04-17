/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import CardRoleDetail from '@/components/card-role-detail'
import ButtonBack from '@/components/form/button-back'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useDealerList } from '@/hooks/useDealerList'
import { usePost } from '@/hooks/usePost'
import { patchPermission } from '@/service/setting'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const FormPatchRole = ({ permission, initialValue }: { permission: any; initialValue: any }) => {
  const { post } = usePost(patchPermission)
  const FormSchema = z.object({
    role: z
      .string()
      .min(1, { message: 'Please fill in this field.' })
      .regex(/^\S+$/, { message: 'Role cannot contain spaces.' }),
    dealer_id: z.string().min(1, {
      message: 'Need select dealer.'
    }),
    permission: z.any()
  })
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      permission: {} as any,
      role: '',
      dealer_id: initialValue?.dealer_id || ''
    }
  })

  const router = useRouter()

  const onSubmit = (data: any) => {
    const filteredPermissions = Object.keys(data?.permission).filter(
      key => data?.permission[key] === true
    )
    if (filteredPermissions.length > 0) {
      post(
        {
          dealer_id: data?.dealer_id,
          payload: {
            role: data?.role,
            permission: filteredPermissions
          }
        },
        {
          onSuccess: () => {
            toast.success(
              initialValue?.role ? 'Permission has been updated' : 'Role has been created'
            )
            router.back()
          },
          onError: e => toast.error(e)
        }
      )
    } else {
      toast.error('At least one permission must be enabled ')
    }
  }
  const { data: dealer } = useDealerList()

  useEffect(() => {
    if (initialValue?.role) {
      form.reset({ ...initialValue })
      form.setValue('dealer_id', initialValue?.dealer_id)
    }
  }, [initialValue, form])
  return (
    <Form {...form}>
      <form className="space-y-4">
        <div className="flex items-center justify-between">
          <ButtonBack url="/settings" />
          <div className="flex items-center gap-x-2.5">
            <Button
              variant="default"
              size="sm"
              onClick={form.handleSubmit(onSubmit)}
              className="capitalize"
              type="submit">
              {initialValue?.role ? 'Update role' : 'Create role'}
            </Button>
          </div>
        </div>
        <div className="grid auto-rows-min gap-4 xl:grid-cols-3 2xl:grid-cols-4">
          <CardRoleDetail
            label={initialValue?.role && `Update permission for ${initialValue?.role}`}>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="dealer_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dealer</FormLabel>

                    <Select
                      disabled={initialValue?.dealer_id}
                      value={field?.value}
                      onValueChange={field?.onChange}
                      name="dealer"
                      aria-label="dealer">
                      <SelectTrigger id="dealer" className="w-full whitespace-nowrap capitalize">
                        <SelectValue placeholder="Select dealer" />
                      </SelectTrigger>
                      <SelectContent>
                        {dealer.map(item => (
                          <SelectItem key={item?.value} value={item?.value} className="capitalize">
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
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Roles name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={initialValue?.role}
                        type="text"
                        placeholder="Enter name..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardRoleDetail>

          <div className="grid auto-rows-min gap-4 xl:col-span-2 2xl:col-span-3">
            {Object.entries(permission)?.map(([key, val]: any) => (
              <Card key={key}>
                <CardHeader className="p-4">
                  <CardTitle className="text-base text-neutral-400 font-medium capitalize">
                    {key}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 flex flex-wrap gap-2 border-t border-neutral-250">
                  {val?.map((value: any) => (
                    <Badge
                      key={value?.key}
                      variant="outline"
                      className="flex items-center space-x-2 px-3 h-8">
                      <Controller
                        name={`permission.${value?.key}`}
                        control={form.control}
                        render={({ field }) => (
                          <Checkbox
                            id={`${key}.${value?.key}`}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                      <Label
                        htmlFor={`${key}.${value?.key}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {value?.key}
                      </Label>
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </form>
    </Form>
  )
}

export default FormPatchRole
