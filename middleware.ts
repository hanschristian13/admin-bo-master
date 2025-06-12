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

  console.log(segments)
  const isLoginPath = locale === 'login' || segments.join('/') === 'login'
  if (token && isLoginPath) {
    req.nextUrl.pathname = `${locale && `/${locale}`}/`
  }
  if (!!!token && !isLoginPath) {
    req.nextUrl.pathname = `${locale && `/${locale}`}/login`
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
  // Redirect to /player-active if webRole !== 'label' and path is root (/)
  if (token && segments.length === 0) {
    if (webRole !== 'label') {
      req.nextUrl.pathname = `${locale ? `/${locale}` : ''}/player-active`
    }
  }

  const response = handleI18nRouting(req)

  return response

  // if (ispathLogin) {
  //   if (!token) {
  //     const response = NextResponse.next()
  //     const config = await fetch(BASE_URL + '/dealers/env/' + req.nextUrl?.host, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Accept: 'application/json'
  //       }
  //     })
  //     const data = await config.json()
  //     if (data?.data) {
  //       const { config } = data.data

  //       if (config) {
  //         await setCookie('WEB_ROLE', config.web_role)
  //       }
  //     }

  //     return response
  //   }
  //   if (webRole === 'label') return NextResponse.redirect(new URL('/', req.url))
  //   return NextResponse.redirect(new URL('/player-active', req.url))
  // } else {
  //   if (!token) {
  //     return NextResponse.redirect(new URL('/login', req.url))
  //   }
  // }
}
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|assets).*)',
    '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
  ]
}
