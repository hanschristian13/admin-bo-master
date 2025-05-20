import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { destroySessionToken, setCookie } from './app/action/libs'

const ERROR_FALLBACK = '/logout'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? ''
export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  const webRole = req.cookies.get('WEB_ROLE')?.value
  const ispathLogin = req.nextUrl.pathname.startsWith('/login')
  if (req.nextUrl.pathname.startsWith(ERROR_FALLBACK)) {
    await destroySessionToken()
    return NextResponse.redirect(new URL('/login', req.url))
  }
  if (ispathLogin) {
    if (!token) {
      const response = NextResponse.next()
      const config = await fetch(BASE_URL + '/dealers/env/' + req.nextUrl?.host, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })
      const data = await config.json()
      if (data?.data) {
        const { config } = data.data

        if (config) {
          await setCookie('WEB_ROLE', config.web_role)
        }
      }

      return response
    }
    if (webRole === 'label') return NextResponse.redirect(new URL('/', req.url))
    return NextResponse.redirect(new URL('/player-active', req.url))
  } else {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }
}
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|assets).*)']
}
