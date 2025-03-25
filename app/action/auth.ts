'use server'
import { redirect } from 'next/navigation'
import Request from '@/service'
import { AuthState, LoginFormSchema } from '@/lib/definitions'
import { createSessionToken, getCookie, getSessionToken, setCookie } from './libs'

export async function login(_: AuthState, formData: FormData) {
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
  const res = (await Request.post('users/tokens', validatedFields.data)) as TokenResponse

  if (res?.data?.token) {
    await createSessionToken(res?.data?.token)
    const roles = (await Request.get('/dealers/superadmin/me')) as { data: { _id: string } }
    if (roles?.data) {
      await setCookie('parentId', roles.data._id!)
    }

    return redirect('/')
  }
  if (res?.errors) {
    return { message: res.errors._error }
  }
}

export async function logout() {
  redirect('/')
}

export async function getCookieValue() {
  return await getSessionToken()
}

export async function getParentId() {
  return await getCookie('parentId')
}
