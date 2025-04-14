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
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import MultipleSelector from '@/components/ui/multiple-selector'
import MonthPicker from '@/components/form/month-picker'
import { useDealerList } from '@/hooks/useDealerList'
import { usePost } from '@/hooks/usePost'
import { postGenerateInvoice } from '@/service/invoice'
import { timeFormat } from '@/lib/utils'

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional()
})

const FormSchema = z.object({
  agent: z.array(optionSchema).min(1),
  month: z.date()
  // monthrange: z.object({
  //   start: z.date(),
  //   end: z.date(),
  // }),
})

interface FormGenerateInvoiceProps {
  setIsAlertDialogOpen: (value: boolean) => void
  data?: {
    agent_id: string[]
    month: Date
  }
}

const FormGenerateInvoice: React.FC<FormGenerateInvoiceProps> = ({
  setIsAlertDialogOpen,
  data
}) => {
  const handleAlertDialogClose = () => {
    setIsAlertDialogOpen(false)
  }

  // const today = new Date();
  // const threeMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 6, 1);
  const { post, error, isLoading } = usePost(postGenerateInvoice)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      agent: [],
      month: data ? data.month : new Date()
      // monthrange: ({
      //   start: threeMonthsAgo,
      //   end: today
      // })
    }
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    post(
      {
        dealers_id: data.agent?.map(x => x?.value),
        month: parseInt(timeFormat(data.month).format('MM')),
        year: parseInt(timeFormat(data.month).format('yyyy'))
      },
      {
        onSuccess: () => {
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
        },
        onError: e => {
          toast.error(e)
        }
      }
    )
  }

  const { data: filterByAgent } = useDealerList()

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
              <span className="text-base font-semibold text-neutral-400">Generate Invoice</span>
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
            name="month"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Choose Month</FormLabel>
                <FormControl>
                  <MonthPicker
                    onMonthSelect={newDate => form.setValue('month', newDate)}
                    selectedMonth={field.value}
                    align="start"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="agent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agent</FormLabel>
                <FormControl>
                  <MultipleSelector
                    {...field}
                    options={filterByAgent}
                    defaultOptions={filterByAgent}
                    placeholder="Select Agent"
                    selectVariant="inline"
                    emptyIndicator={
                      <p className="text-center text-sm font-medium leading-10 text-red-950 dark:text-gray-400">
                        no results found.
                      </p>
                    }
                  />
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

export default FormGenerateInvoice
