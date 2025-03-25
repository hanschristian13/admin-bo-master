import { cookies } from 'next/headers'
import 'server-only'
export async function createSessionToken(token: string) {
  const cookieStore = await cookies()
  cookieStore.set('token', token)
}
export async function getSessionToken() {
  const token = (await cookies()).get('token')?.value
  return token
}
export async function destroySessionToken() {
  const cookieStore = await cookies()
  cookieStore.delete('token')
}

export async function setCookie(key: string, value: string) {
  const cookieStore = await cookies()
  cookieStore.set(key, value)
}

export async function getCookie(key: string) {
  const value = (await cookies()).get(key)?.value
  return value
}
