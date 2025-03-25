'use server'

import Request from '@/service'
import { SuperAgentTypeV2 } from '@/types/super-agent'
import { z } from 'zod'

const schema = z.object({
  agent_name: z.string().min(3, 'Agent Name must be at least 2 characters'),
  short_code: z.string().min(3, 'Short Code must be at least 2 characters'),
  type: z.string(),
  email: z.string().email({ message: 'Email must be a valid email address' }),
  phone_number: z.string().regex(/^\d+$/, { message: 'Phone number must contain only digits' }),
  active: z.boolean({ message: 'Active must be a boolean (true or false)' })
})

type SuperAgent = z.infer<typeof schema>

type ResSuperAgent = {
  data: SuperAgentTypeV2
  errors?: {
    [K in keyof SuperAgentTypeV2]?: string[]
  }
  message?: string
}

interface PrevStateType {
  success: boolean
  validationErrors?: Record<string, string[]>
  values?: Partial<SuperAgent>
  message?: string
}

export type State =
  | {
      error?: string
      message?: string
    }
  | undefined

const tagListSuperAgent = 'dealers/superadmin/agents'

export async function createSuperAgent(prevState: PrevStateType, formData: FormData) {
  try {
    const rawData = {
      agent_name: (formData.get('agent_name') as string) || '',
      short_code: (formData.get('short_code') as string) || '',
      email: (formData.get('email') as string) || '',
      phone_number: (formData.get('phone_number') as string) || '',
      type: (formData.get('type') as string) || '',
      active: Boolean(formData.get('active'))
    }
    const values = { ...rawData }
    const validatedFields = schema.safeParse(values)

    if (!validatedFields.success) {
      return {
        success: false,
        message: '',
        validationErrors: validatedFields.error.flatten().fieldErrors,
        values
      }
    }

    const res = (await Request.post(
      'dealers/superadmin/agents',
      validatedFields.data
    )) as ResSuperAgent
    if (res?.data) {
      const { revalidatePath, revalidateTag } = await import('next/cache')
      revalidateTag(tagListSuperAgent)
      revalidatePath('/super-agent')
    }
    if (res?.errors) {
      return {
        success: false,
        message: `Failed, ${res?.errors}`
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

export async function updateSuperAgent(prevState: PrevStateType, formData: FormData) {
  try {
    const id = formData.get('id') as string
    const rawData = {
      agent_name: (formData.get('agent_name') as string) || '',
      short_code: (formData.get('short_code') as string) || '',
      email: (formData.get('email') as string) || '',
      phone_number: (formData.get('phone_number') as string) || '',
      type: (formData.get('type') as string) || '',
      active: Boolean(formData.get('active'))
    }
    const values = { ...rawData }
    const validatedFields = schema.safeParse(values)

    if (!validatedFields.success) {
      return {
        success: false,
        message: '',
        validationErrors: validatedFields.error.flatten().fieldErrors,
        values
      }
    }
    const url = `dealers/superadmin/agents/${id}`
    const res = (await Request.put(url, validatedFields.data)) as ResSuperAgent
    if (res?.data) {
      const { revalidatePath, revalidateTag } = await import('next/cache')
      revalidateTag(tagListSuperAgent)
      revalidatePath('/super-agent')
    }
    if (res?.errors) {
      return {
        success: false,
        message: `Failed, ${JSON.stringify(res?.errors)}`
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
