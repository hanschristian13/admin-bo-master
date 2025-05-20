'use client'
import React from 'react'
import {
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
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
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { usePost } from '@/hooks/usePost'
import { addWhitelistIp } from '@/service/setting'

const FormSchema = z.object({
  ip: z.string().ip({
    message: 'IP Address not valid!'
  })
})

interface FormAddWhitelistIPProps {
  setIsAlertDialogOpen: (value: boolean) => void
  onSuccess: () => void
  parent_id: string
}

const FormAddWhitelistIP: React.FC<FormAddWhitelistIPProps> = ({
  setIsAlertDialogOpen,
  parent_id,
  onSuccess
}) => {
  const { post } = usePost(addWhitelistIp)
  const handleAlertDialogClose = () => {
    setIsAlertDialogOpen(false)
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ip: ''
    }
  })
  function onSubmit(data: z.infer<typeof FormSchema>) {
    post(
      {
        dealer_id: parent_id,
        ip: data.ip
      },
      {
        onSuccess: () => {
          toast.success('Success', {
            description: <p>New Whitelist IP saved</p>
          })
          onSuccess()
        },
        onError: () => {
          toast.error('Failed to Add new Whitelist IP', {
            description: <p>Failed to Add new Whitelist IP, Please try again</p>
          })
        }
      }
    )

    handleAlertDialogClose()
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
              <span className="text-base font-semibold text-neutral-400">Add New IP</span>
              <p className="text-sm font-normal text-neutral-300">
                This method allows to create new maintenances.
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
        <div className="space-y-3 p-4">
          <FormField
            control={form.control}
            name="ip"
            render={({ field }) => (
              <FormItem>
                <FormLabel>IP Address</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="10.10.10.1" inputMode="numeric" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <AlertDialogFooter className="w-full px-5 py-4 border-t border-neutral-200">
          <AlertDialogCancel className="w-full" onClick={handleAlertDialogClose}>
            Cancel
          </AlertDialogCancel>
          <Button type="submit" className="w-full">
            Add
          </Button>
        </AlertDialogFooter>
      </form>
    </Form>
  )
}

export default FormAddWhitelistIP
