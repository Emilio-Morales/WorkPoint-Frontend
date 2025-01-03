import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'

export function middleware(req) {
  const { pathname } = req.nextUrl

  if (
    pathname.startsWith('/login') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/login') ||
    pathname.startsWith('/static')
  ) {
    return NextResponse.next()
  }

  const token = req.cookies.get('authToken')?.value

  if (!token) {
    // Redirect to login if token is missing
    const loginUrl = new URL('/login', req.url)
    return NextResponse.redirect(loginUrl)
  }

  try {
    const decodedToken = jwt.decode(token)

    if (decodedToken?.exp && decodedToken.exp < Math.floor(Date.now() / 1000)) {
      // Token is expired, redirect to login
      const loginUrl = new URL('/login', req.url)
      return NextResponse.redirect(loginUrl)
    }

    const response = NextResponse.next()
    response.cookies.set('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    })

    return response
    // Token is valid, allow the request to proceed
  } catch (error) {
    console.error('Failed to decode token:', error)
    const loginUrl = new URL('/login', req.url)
    return NextResponse.redirect(loginUrl)
  }
}

// Apply middleware only to /dashboard and its subroutes
export const config = {
  matcher: ['/dashboard/:path*'],
}
