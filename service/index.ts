import { getCookieValue } from '@/app/action/auth'
import { isRedirectError } from 'next/dist/client/components/redirect-error'
import { redirect } from 'next/navigation'

export type ApiResponse<T> = null | {
  total_page: number
  total_items: number
  current_page: number
  data: T
}

class Request {
  private static BASE_URL: string = process.env.NEXT_PUBLIC_BASE_URL ?? ''
  private static API_KEY: string | undefined = process.env.NEXT_PUBLIC_API_TOKEN
  private static status: number | null = null

  private static getErrorMessage(obj: Record<string, unknown>): unknown[] {
    return Object.values(obj).flatMap(v =>
      v && typeof v === 'object' ? this.getErrorMessage(v as Record<string, unknown>) : v
    )
  }

  private static async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    endpoint: string,
    params: Record<string, string | number | boolean | string[]> = {},
    body?: Record<string, unknown> | FormData,
    headers: Record<string, string> = {},
    cache: RequestCache = 'no-store'
  ): Promise<ApiResponse<T> | null> {
    const token = await getCookieValue()

    try {
      const url = new URL(`${this.BASE_URL}/${endpoint}`)
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          if (Array.isArray(value)) {
            value.forEach(e => {
              url.searchParams.append(`${key}[]`, e.toString())
            })
          } else {
            url.searchParams.append(key, value.toString())
          }
        }
      })

      const response = await fetch(url.toString(), {
        method,
        headers: {
          'x-api-key': this.API_KEY ?? '',
          'Content-Type': body instanceof FormData ? 'multipart/form-data' : 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...headers
        },
        body: body ? (body instanceof FormData ? body : JSON.stringify(body)) : undefined,
        cache
      })

      if (!response.ok) {
        const errorResponse = await response.json()
        const errorMessage = this.getErrorMessage(errorResponse)
        throw new Error(`Request failed with status ${response.status}: ${errorMessage.join(', ')}`)
      }

      return (await response.json()) as ApiResponse<T>
    } catch (error) {
      if (isRedirectError(error)) {
        throw error
      }

      throw error
    } finally {
      if (this.status === 401) {
        this.status = 0
        redirect('/logout')
      }
      this.status = 0
    }
  }

  static get<T>(
    endpoint: string,
    params?: Record<string, string | number | boolean | string[]>,
    headers?: Record<string, string>,
    cache?: RequestCache
  ): Promise<ApiResponse<T> | null> {
    return this.request<T>('GET', endpoint, params, undefined, headers, cache)
  }

  static post<T>(
    endpoint: string,
    body: Record<string, unknown> | FormData,
    headers?: Record<string, string>,
    cache?: RequestCache
  ): Promise<ApiResponse<T> | null> {
    return this.request<T>('POST', endpoint, {}, body, headers, cache)
  }

  static patch<T>(
    endpoint: string,
    body: Record<string, unknown> | FormData,
    headers?: Record<string, string>,
    cache?: RequestCache
  ): Promise<ApiResponse<T> | null> {
    return this.request<T>('PATCH', endpoint, {}, body, headers, cache)
  }

  static put<T>(
    endpoint: string,
    body: Record<string, unknown> | FormData,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T> | null> {
    return this.request<T>('PUT', endpoint, {}, body, headers)
  }

  static delete<T>(
    endpoint: string,
    params?: Record<string, string | number | boolean | string[]>,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T> | null> {
    return this.request<T>('DELETE', endpoint, params, undefined, headers)
  }
}

export default Request
