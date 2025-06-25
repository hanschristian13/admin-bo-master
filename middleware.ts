import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { destroySessionToken, setCookie } from './app/action/libs'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import Request from '@/service'
const ERROR_FALLBACK = '/logout'
const handleI18nRouting = createMiddleware(routing)

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  const webRole = req.cookies.get('WEB_ROLE')?.value
  if (req.nextUrl.pathname.startsWith(ERROR_FALLBACK)) {
    await destroySessionToken()
    return NextResponse.redirect(new URL('/login', req.url))
  }
  const [, locale, ...segments] = req.nextUrl.pathname.split('/')
  const isLoginPath = locale === 'login' || segments.join('/') === 'login'
  if (token && isLoginPath) {
    if (webRole === 'label') return NextResponse.redirect(new URL('/', req.url))
    if (webRole !== 'label') return NextResponse.redirect(new URL('/player-active', req.url))
  }
  if (!!!token && !isLoginPath) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  if (!!!token && isLoginPath) {
    const data = (await Request.get('dealers/env/' + req.nextUrl?.host)) as {
      data?: { api_key: string; config: { web_role: string } }
    }
    if (data?.data) {
      await setCookie('API_TOKEN', data?.data.api_key)
      await setCookie('WEB_ROLE', data?.data.config.web_role)
    }
  }
  const response = handleI18nRouting(req)
  return response
}
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|assets).*)',
    '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
  ]
}
