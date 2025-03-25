import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { destroySessionToken } from './app/action/libs'
const ERROR_FALLBACK = '/logout'
export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  const ispathLogin = req.nextUrl.pathname.startsWith('/login')
  if (req.nextUrl.pathname.startsWith(ERROR_FALLBACK)) {
    await destroySessionToken()
    return NextResponse.redirect(new URL('/login', req.url))
  }
  if (ispathLogin) {
    if (!token) return NextResponse.next()
    return NextResponse.redirect(new URL('/', req.url))
  } else {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }
}
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|assets).*)']
}
