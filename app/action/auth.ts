'use server'
import { redirect } from 'next/navigation'
import Request from '@/service'
import { AuthState, LoginFormSchema } from '@/lib/definitions'
import { createSessionToken, getCookie, getSessionToken, getWebRole, setCookie } from './libs'

export async function login(_: AuthState, formData: FormData) {
  let token = null
  const webRole = await getWebRole()
  const validatedFields = LoginFormSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password')
  })
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors
    }
  }
  type TokenResponse = {
    data?: { token?: string; _id?: string }
    errors?: { _error?: string }
  }

  try {
    const res = (await Request.post('users/tokens', validatedFields.data)) as TokenResponse

    if (res?.data?.token) {
      await createSessionToken(res?.data?.token)
      const roles = (await Request.get('/dealers/superadmin/me')) as { data: { _id: string } }
      if (roles?.data) {
        await setCookie('username', validatedFields.data.username)
        await setCookie('parentId', roles.data._id!)
        token = roles.data._id
      }
    }
    if (res?.errors) {
      console.log('res error', res.errors)
      return { message: res.errors._error }
    }
  } catch (error) {
    console.log('error', error)
    return { message: error instanceof Error ? error.message : 'An error occurred during login' }
  } finally {
    if (!!token) {
      if (webRole === 'label') {
        redirect('/')
      }
      redirect('/player-active')
    }
    token = null
  }
}

export async function logout() {
  redirect('/')
}

export async function getCookieValue() {
  return await getSessionToken()
}

export async function getCookieApiToken() {
  return await getCookie('API_TOKEN')
}

export async function getParentId() {
  return await getCookie('parentId')
}
