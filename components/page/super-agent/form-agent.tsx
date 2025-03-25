'use client'
import React from 'react'
import ButtonBack from '@/components/form/button-back'
import { Card, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'
import { dataSuperAgent } from '@/mock/games'

const FormSchema = z.object({
  agent_name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  short_code: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  language: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  currency: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  lobby_url: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  api_url_endpoint: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  profit_sharing_label: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  profit_sharing_agent: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  super_agent_referral_fee: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  finance_name: z.string(),
  finance_email: z.string(),
  finance_telegram: z.string(),
  tech_name: z.string(),
  tech_email: z.string(),
  tech_telegram: z.string(),
})

const CreateClient: React.FC = () => {
  const params = useParams();
  const agentId = params.agentId;

  const handleInitialDataAgent = dataSuperAgent.find((item) => item.code.toLowerCase() === agentId) || {
    name: '',
    code: '',
    status: '',
    total_agent: 0
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      agent_name: handleInitialDataAgent.name,
      short_code: handleInitialDataAgent.code,
      language: "",
      currency: "",
      lobby_url: "",
      api_url_endpoint: "",
      profit_sharing_label: "",
      profit_sharing_agent: "",
      super_agent_referral_fee: "",
      finance_name: "",
      finance_email: "",
      finance_telegram: "",
      tech_name: "",
      tech_email: "",
      tech_telegram: "",
    },
  })
  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    })
  }

  return (
    <div className='space-y-6'>
      <ButtonBack url={`/super-agent?agentId=${agentId}`} />
      <Form {...form}>
        <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader
              className='px-3 py-[14px] border-b border-neutral-200'>
              <div className='flex items-center justify-between gap-1.5'>
                <div className='text-neutral-300 flex items-center gap-x-3'>
                  <Image
                    alt=''
                    width={32}
                    height={32}
                    src='/assets/images/dialog-header.webp'
                    unoptimized
                  />
                  <span className='text-base font-medium text-neutral-400'>Agent information</span>
                </div>
              </div>
            </CardHeader>
            <div className='p-4 grid gap-4 lg:grid-cols-2'>
              <FormField
                control={form.control}
                name="agent_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agent Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter agent name..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="short_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter code..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>
          <Card>
            <CardHeader
              className='px-3 py-[14px] border-b border-neutral-200'>
              <div className='flex items-center justify-between gap-1.5'>
                <div className='text-neutral-300 flex items-center gap-x-3'>
                  <Image
                    alt=''
                    width={32}
                    height={32}
                    src='/assets/images/dialog-header.webp'
                    unoptimized
                  />
                  <span className='text-base font-medium text-neutral-400'>Global Settings</span>
                </div>
              </div>
            </CardHeader>
            <div className='p-4 grid gap-4 lg:grid-cols-4'>
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Language</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter agent name..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currency</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter agent name..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lobby_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lobby URL</FormLabel>
                    <FormControl>
                      <div className="flex rounded-md shadow-xs">
                        <span className="border-input bg-neutral-100 text-neutral-300 inline-flex items-center rounded-s-md border px-3 text-sm">
                          https://
                        </span>
                        <Input
                          {...field}
                          className="-ms-px rounded-s-none shadow-none"
                          placeholder="Enter Lobby URL..."
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="api_url_endpoint"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>API URL Endpoint</FormLabel>
                    <FormControl>
                      <div className="flex rounded-md shadow-xs">
                        <span className="border-input bg-neutral-100 text-neutral-300 inline-flex items-center rounded-s-md border px-3 text-sm">
                          https://
                        </span>
                        <Input
                          {...field}
                          className="-ms-px rounded-s-none shadow-none"
                          placeholder="Enter API URL Endpoint..."
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>
          <Card>
            <CardHeader
              className='px-3 py-[14px] border-b border-neutral-200'>
              <div className='flex items-center justify-between gap-1.5'>
                <div className='text-neutral-300 flex items-center gap-x-3'>
                  <Image
                    alt=''
                    width={32}
                    height={32}
                    src='/assets/images/dialog-header.webp'
                    unoptimized
                  />
                  <span className='text-base font-medium text-neutral-400'>Profit Sharing</span>
                </div>
              </div>
            </CardHeader>
            <div className='p-4 grid gap-4 lg:grid-cols-3'>
              <FormField
                control={form.control}
                name="profit_sharing_label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profit Sharing Label</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter profit sharing label..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="profit_sharing_agent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profit Sharing Agent</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter profit sharing agent..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="super_agent_referral_fee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Super Agent Referral Fee</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter fee..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>
          <Card>
            <CardHeader
              className='px-3 py-[14px] border-b border-neutral-200'>
              <div className='flex items-center justify-between gap-1.5'>
                <div className='text-neutral-300 flex items-center gap-x-3'>
                  <Image
                    alt=''
                    width={32}
                    height={32}
                    src='/assets/images/dialog-header.webp'
                    unoptimized
                  />
                  <span className='text-base font-medium text-neutral-400'>PIC Finance</span>
                </div>
              </div>
            </CardHeader>
            <div className='p-4 grid gap-4 lg:grid-cols-3'>
              <FormField
                control={form.control}
                name="finance_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter name..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="finance_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="finance_telegram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telegram</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter telegram..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>
          <Card>
            <CardHeader
              className='px-3 py-[14px] border-b border-neutral-200'>
              <div className='flex items-center justify-between gap-1.5'>
                <div className='text-neutral-300 flex items-center gap-x-3'>
                  <Image
                    alt=''
                    width={32}
                    height={32}
                    src='/assets/images/dialog-header.webp'
                    unoptimized
                  />
                  <span className='text-base font-medium text-neutral-400'>PIC Tech</span>
                </div>
              </div>
            </CardHeader>
            <div className='p-4 grid gap-4 lg:grid-cols-3'>
              <FormField
                control={form.control}
                name="tech_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter name..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tech_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tech_telegram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telegram</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter telegram..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>
          <div className='flex justify-end gap-x-2.5'>
            <Button variant="outline" type='button'>Cancel</Button>
            <Button variant="default" type='submit'>Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default CreateClient
