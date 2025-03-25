'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import ButtonBack from '@/components/form/button-back'
import { Check, Pencil, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CardAgentDetail from '@/components/card-agent-detail'
import { AdminPermissionData, dataAdminPermission, Permission, PermissionGroup } from '@/mock/admin'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from 'sonner'
import { Label } from '@/components/ui/label'
import UpdateAdmin from '@/components/page/settings/admin/update-admin'


function createDynamicFormSchema(permissionsData: AdminPermissionData): z.ZodObject<any> {
  const schemaShape: Record<string, z.ZodObject<any>> = {};

  permissionsData.data.forEach((group: PermissionGroup) => {
    const groupName = group.permission_group_name;
    const permissions = group.permissions[0];

    const permissionSchema: Record<string, z.ZodDefault<z.ZodBoolean>> = {};
    for (const permissionKey in permissions) {
      permissionSchema[permissionKey] = z.boolean().default(false);
    }

    schemaShape[groupName] = z.object(permissionSchema);
  });

  return z.object(schemaShape);
}

const FormSchema = createDynamicFormSchema(dataAdminPermission);

const Page: React.FC = ({
}) => {
  const pathname = usePathname()
  const handleName = pathname.split('/')[2]
  const status = 'active'
  const [editMode, setEditMode] = useState<boolean>(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: getDefaultValuesFromPermissions(dataAdminPermission),
  })

  const { control } = form;

  function getDefaultValuesFromPermissions(permissionsData: AdminPermissionData): Record<string, Permission> {
    const defaultValues: Record<string, Permission> = {};

    permissionsData.data.forEach((group: PermissionGroup) => {
      const groupName = group.permission_group_name;
      const permissions = group.permissions[0]; // Asumsi hanya ada satu objek permissions dalam array

      defaultValues[groupName] = permissions;
    });

    return defaultValues;
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("Submitted value:", {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      )
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <div className='flex items-center justify-between'>
          <ButtonBack url='/setting/admin' />
          <div className='flex items-center gap-x-2.5'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => setEditMode(!editMode)}
              className='capitalize'
              type='button'
            >
              <Pencil />
              {editMode ? 'cancel edit' : 'edit permission'}
            </Button>
            <Button
              variant='default'
              size='sm'
              onClick={() => { }}
              className='capitalize'
              disabled={editMode ? false : true}
              type='submit'
            >
              apply
            </Button>
            <UpdateAdmin />
          </div>
        </div>
        <div className='grid auto-rows-min gap-4 xl:grid-cols-3 2xl:grid-cols-4'>
          <CardAgentDetail
            name={handleName}
            status={status}
          />
          <div className='grid auto-rows-min gap-4 xl:col-span-2 2xl:col-span-3'>

            {dataAdminPermission.data.map((group) => (
              <Card key={group.permission_group_name}>
                <CardHeader className='p-4'>
                  <CardTitle className='text-base text-neutral-400 font-medium capitalize'>{group.permission_group_name}</CardTitle>
                </CardHeader>
                <CardContent className='p-4 flex flex-wrap gap-2 border-t border-neutral-250'>
                  {Object.entries(group.permissions[0]).map(([permissionKey, permissionValue]) => (
                    <Badge key={permissionKey} variant='outline' className="flex items-center space-x-2 px-3 h-8">
                      {editMode ?
                        <Controller
                          name={`${group.permission_group_name}.${permissionKey}`}
                          control={control}
                          render={({ field }) => (
                            <Checkbox
                              id={`${group.permission_group_name}-${permissionKey}`}
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          )}
                        />
                        : permissionValue ? <Check className='text-green-950 text-base' /> : <X className='text-red-950 text-base' />
                      }
                      <Label
                        htmlFor={`${group.permission_group_name}-${permissionKey}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {permissionKey}
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

Page.displayName = 'PageSettingAdminDetail'

export default Page
