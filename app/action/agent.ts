'use server'

import Request from '@/service'
import { ResDetailSuperAgentType } from '@/types/super-agent'
import { z } from 'zod'

const agentPicSchema = z.object({
  pic_name: z.string().min(3, 'Agent Name must be at least 3 characters'),
  pic_email: z.string().min(3, 'Agent Name must be at least 3 characters'),
  pic_telegram: z.string().min(3, 'Agent Name must be at least 3 characters'),
  pic_type: z.string()
})

const configSchema = z.object({
  title: z.string(),
  web_role: z.string()
})

const domainSchema = z.object({
  domain: z.string()
})

const clientEnvironmentsSchema = z.object({
  config: configSchema,
  api_endpoint: z.string().url(),
  lobby_url: z.string().url(),
  domains: z.array(domainSchema)
})

const schema = z.object({
  type: z.string(),
  parent_id: z.string(),
  active: z.boolean({ message: 'Active must be a boolean (true or false)' }),
  agent_name: z.string().min(3, 'Agent Name must be at least 3 characters'),
  brand_name: z.string(),
  short_code: z.string().min(3, 'Short Code must be at least 3 characters'),
  language: z.string(),
  currency: z.string(),
  host: z.string().url(),
  company_percentage: z.preprocess(
    val => Number(val),
    z.number({ required_error: 'Field a is required' }).min(0, 'Field a cannot be empty')
  ),
  master_agent_percentage: z.preprocess(
    val => Number(val),
    z.number({ required_error: 'Field a is required' }).min(0, 'Field a cannot be empty')
  ),
  master_company_percentage: z.number(),
  agent_pic: z.array(agentPicSchema),
  client_environments: z.array(clientEnvironmentsSchema)
})

const schemaUpdate = z.object({
  type: z.string(),
  parent_id: z.string(),
  active: z.boolean({ message: 'Active must be a boolean (true or false)' }),
  agent_name: z.string().min(3, 'Agent Name must be at least 3 characters'),
  short_code: z.string().min(3, 'Short Code must be at least 3 characters'),
  language: z.string(),
  currency: z.string(),
  host: z.string().url(),
  company_percentage: z.preprocess(
    val => Number(val),
    z.number({ required_error: 'Field a is required' }).min(0, 'Field a cannot be empty')
  ),
  master_agent_percentage: z.preprocess(
    val => Number(val),
    z.number({ required_error: 'Field a is required' }).min(0, 'Field a cannot be empty')
  ),
  master_company_percentage: z.number(),
  agent_pic: z.array(agentPicSchema),
  client_environments: z.array(clientEnvironmentsSchema)
})

type Agent = z.infer<typeof schema>

interface PrevStateType {
  success: boolean
  validationErrors?: Record<string, string[]>
  message?: string
  values?: Partial<Agent>
}

export type State =
  | {
      error?: string
      message?: string
    }
  | undefined

const tagListSuperAgent = 'dealers/superadmin/agents'

export async function createAgent(prevState: PrevStateType, formData: FormData) {
  try {
    const rawData = {
      type: (formData.get('type') as string) || '',
      parent_id: (formData.get('parent_id') as string) || '',
      active: Boolean(formData.get('active')),
      agent_name: (formData.get('agent_name') as string) || '',
      brand_name: (formData.get('agent_name') as string) || '',
      short_code: (formData.get('short_code') as string) || '',
      language: (formData.get('language') as string) || '',
      currency: formData.get('currency')?.toString().toUpperCase() || '',
      host: (('https://' + formData.get('host')) as string) || '',
      company_percentage: Number(formData.get('company_percentage')) || 0,
      master_agent_percentage: Number(formData.get('master_agent_percentage')) || 0,
      master_company_percentage: Number(formData.get('master_company_percentage')) || 0,
      agent_pic: [
        {
          pic_name: (formData.get('agent_pic_finance_name') as string) || '',
          pic_email: (formData.get('agent_pic_finance_email') as string) || '',
          pic_telegram: (formData.get('agent_pic_finance_telegram') as string) || '',
          pic_type: 'finance'
        },
        {
          pic_name: (formData.get('agent_pic_technical_name') as string) || '',
          pic_email: (formData.get('agent_pic_technical_email') as string) || '',
          pic_telegram: (formData.get('agent_pic_technical_telegram') as string) || '',
          pic_type: 'technical'
        }
      ],
      client_environments: [
        {
          config: {
            title: 'agent',
            web_role: 'agent'
          },
          api_endpoint: (('https://' + formData.get('api_endpoint')) as string) || '',
          lobby_url: (('https://' + formData.get('lobby_url')) as string) || '',
          domains: [
            {
              domain: formData.get('host')?.toString() || ''
            }
          ]
        }
      ]
    }

    const values = { ...rawData }
    const validatedFields = schema.safeParse(values)

    if (!validatedFields.success) {
      const formattedErrors: Record<string, string[]> = {}

      validatedFields.error.issues.forEach(issue => {
        const path = issue.path.join('.')
        if (!formattedErrors[path]) {
          formattedErrors[path] = []
        }
        formattedErrors[path].push(issue.message)
      })

      return {
        success: false,
        message: '',
        validationErrors: formattedErrors,
        values
      }
    }

    const res = (await Request.post(
      'dealers/superadmin/agents',
      validatedFields.data
    )) as ResDetailSuperAgentType

    if (res?.data) {
      const { revalidateTag } = await import('next/cache')
      revalidateTag(tagListSuperAgent)
    }
    if (res?.errors) {
      return {
        success: false,
        message: `Failed, ${JSON.stringify(res?.errors)}`,
        values
      }
    }

    return {
      success: true,
      message: `Success to create SuperAgent ${values.agent_name}`,
      values
    }
  } catch (errors) {
    return {
      success: false,
      message: `Failed to create data super agent, ${errors}`
    }
  }
}

export async function updateAgent(prevState: PrevStateType, formData: FormData) {
  try {
    const id = formData.get('id') as string
    const domainLink = formData.get('host') as string
    const rawData = {
      type: (formData.get('type') as string) || '',
      parent_id: (formData.get('parent_id') as string) || '',
      active: Boolean(formData.get('active')),
      agent_name: (formData.get('agent_name') as string) || '',
      short_code: (formData.get('short_code') as string) || '',
      language: (formData.get('language') as string) || '',
      currency: formData.get('currency')?.toString().toUpperCase() || '',
      host: (('https://' + formData.get('host')) as string) || '',
      company_percentage: Number(formData.get('company_percentage')) || 0,
      master_agent_percentage: Number(formData.get('master_agent_percentage')) || 0,
      master_company_percentage: Number(formData.get('master_company_percentage')) || 0,
      agent_pic: [
        {
          pic_name: (formData.get('agent_pic_finance_name') as string) || '',
          pic_email: (formData.get('agent_pic_finance_email') as string) || '',
          pic_telegram: (formData.get('agent_pic_finance_telegram') as string) || '',
          pic_type: 'finance'
        },
        {
          pic_name: (formData.get('agent_pic_technical_name') as string) || '',
          pic_email: (formData.get('agent_pic_technical_email') as string) || '',
          pic_telegram: (formData.get('agent_pic_technical_telegram') as string) || '',
          pic_type: 'technical'
        }
      ],
      client_environments: [
        {
          config: {
            title: 'agent',
            web_role: 'agent'
          },
          api_endpoint: (('https://' + formData.get('api_endpoint')) as string) || '',
          lobby_url: (('https://' + formData.get('lobby_url')) as string) || '',
          domains: [
            {
              domain: domainLink
            }
          ]
        }
      ]
    }
    const values = { ...rawData }
    const validatedFields = schemaUpdate.safeParse(values)

    if (!validatedFields.success) {
      const formattedErrors: Record<string, string[]> = {}
      console.log('error validation', validatedFields.error.issues)
      validatedFields.error.issues.forEach(issue => {
        const path = issue.path.join('.')
        if (!formattedErrors[path]) {
          formattedErrors[path] = []
        }
        formattedErrors[path].push(issue.message)
      })

      return {
        success: false,
        message: '',
        validationErrors: formattedErrors,
        values
      }
    }

    const url = `dealers/superadmin/agents/${id}`
    const res = (await Request.put(url, validatedFields.data)) as ResDetailSuperAgentType

    if (res?.data) {
      const { revalidateTag } = await import('next/cache')
      revalidateTag(tagListSuperAgent)
    }
    if (res?.errors) {
      return {
        success: false,
        message: `Failed, ${JSON.stringify(res?.errors)}`,
        values
      }
    }

    return {
      success: true,
      message: `Success to update SuperAgent ${values.agent_name}`,
      values
    }
  } catch (errors) {
    return {
      success: false,
      message: `Failed to update data super agent, ${errors}`
    }
  }
}
