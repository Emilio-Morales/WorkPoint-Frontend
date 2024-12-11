import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'

export function middleware(req) {
  const { pathname } = req.nextUrl

  // Allow public routes like /login, /_next (assets), and /api
  if (
    pathname.startsWith('/login') || // Allow login page
    pathname.startsWith('/_next') || // Allow Next.js static files
    pathname.startsWith('/api') || // Allow API routes
    pathname.startsWith('/static') // Allow static files
  ) {
    return NextResponse.next()
  }

  // Check for token in cookies for protected dashboard routes
  const token = req.cookies.get('authToken')?.value

  if (!token) {
    // Redirect to login if token is missing
    const loginUrl = new URL('/login', req.url)
    return NextResponse.redirect(loginUrl)
  }

  try {
    // Decode the token to check claims (optional)
    const decodedToken = jwt.decode(token)

    // Optional: Check token expiration
    if (decodedToken?.exp && decodedToken.exp < Math.floor(Date.now() / 1000)) {
      // Token is expired, redirect to login
      const loginUrl = new URL('/login', req.url)
      return NextResponse.redirect(loginUrl)
    }

    // Token is valid, allow the request to proceed
    return NextResponse.next()
  } catch (error) {
    console.error('Failed to decode token:', error)
    const loginUrl = new URL('/login', req.url)
    return NextResponse.redirect(loginUrl)
  }
}

// Apply middleware only to /dashboard and its subroutes
export const config = {
  matcher: ['/dashboard/:path*'], // Protect /dashboard and all its nested routes
}
