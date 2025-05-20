import React from 'react'
import { AlertDialogCancel, AlertDialogFooter } from '@/components/ui/alert-dialog'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Image from 'next/image'
import { Trash } from 'lucide-react'
import { Button } from './ui/button'

const FormSchema = z.object({
  nominal: z.string(),
  note: z.string()
})

interface ContentConfirmationProps {
  setIsAlertDialogOpen: (value: boolean) => void
  data: string
  handleOnSubmit: (data: string) => void
}

const ContentConfirmation: React.FC<ContentConfirmationProps> = ({
  setIsAlertDialogOpen,
  data,
  handleOnSubmit
}) => {
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
  function onSubmit() {
    handleOnSubmit(data)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="p-2">
          <div className="px-4 py-9 flex flex-col items-center justify-center gap-y-4 overflow-hidden relative">
            <Image
              alt=""
              src={`/assets/images/background-confirmation-dialog.webp`}
              fill
              unoptimized
              quality={100}
              sizes="100vw"
              style={{
                objectFit: 'cover',
                objectPosition: 'top center',
                zIndex: 0
              }}
            />
            <div className="relative size-20 rounded-full border border-neutral-250 flex items-center justify-center overflow-hidden bg-white">
              <Image
                alt=""
                src={`/assets/images/background-icon-dialog.webp`}
                fill
                unoptimized
                quality={100}
                sizes="100vw"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'top center'
                }}
              />
              <Trash className="size-[50px] text-red-950 relative z-20" />
            </div>
            <div className="flex flex-col items-center justify-center relative z-20">
              <h3 className="text-base font-semibold text-neutral-400">Are you sure?</h3>
              <p className="text-sm font-medium text-neutral-300 text-center">
                You&apos;re about to delete IP Address &quot;{data}&quot;, Do you want to continue?
              </p>
            </div>
          </div>
        </div>
        <AlertDialogFooter className="w-full px-5 py-4 border-t border-neutral-200 relative z-20">
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

export default ContentConfirmation
