/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { usePost } from '@/hooks/usePost'
import { putInvoiceAddOtherExpense } from '@/service/invoice'

const FormSchema = z.object({
  nominal: z.string().nonempty('Nominal is required'),
  note: z.string().nonempty('Note is required')
})

interface FormAddExpensesProps {
  setIsAlertDialogOpen: (value: boolean) => void
  data?: {
    agent_id: string
  }[]
}

const FormAddExpenses: React.FC<FormAddExpensesProps> = ({ setIsAlertDialogOpen, data }) => {
  const { post } = usePost(putInvoiceAddOtherExpense)

  const handleAlertDialogClose = () => {
    setIsAlertDialogOpen(false)
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nominal: '',
      note: ''
    }
  })
  function onSubmit(form: z.infer<typeof FormSchema>) {
    const formattedData = { [form.note]: form.nominal }

    const payload = {
      invoices_id: data?.map((item: any) => item?._id),
      other_expenses: formattedData
    }

    console.log(payload, 'payload')
    post(payload, {
      onSuccess: () => {
        toast.success('Expenses has been added!')
        handleAlertDialogClose()
      },
      onError: e => toast.error(e)
    })
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
              <span className="text-base font-semibold text-neutral-400">Add Expenses</span>
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
          <div className="flex items-center gap-x-2 bg-blue-100 rounded-md px-4 py-[9px]">
            <Badge className="bg-blue-950 rounded-full h-[18px] px-[5px]">
              {data?.length ? data?.length : 0}
            </Badge>
            <span className="text-blue-950 text-sm font-medium">Agent Selected</span>
          </div>
          <FormField
            control={form.control}
            name="nominal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nominal</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Rp" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Note</FormLabel>
                <FormControl>
                  <Textarea placeholder="Type your message here..." className="h-20" {...field} />
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
          <Button className="w-full" type="submit">
            Apply
          </Button>
        </AlertDialogFooter>
      </form>
    </Form>
  )
}

export default FormAddExpenses
