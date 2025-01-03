'use server'

import jwtDecode from 'jsonwebtoken'
import { cookies } from 'next/headers'

export async function loginUser(credentials) {
  const response = await fetch(`${process.env.NEXT_BACKEND_URL}/Auth/Login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })

  if (!response.ok) {
    throw new Error('Invalid credentials')
  }

  const { token } = await response.json()

  // Store JWT in an HTTP-only cookie
  cookies().set('authToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  })

  // Redirect to dashboard
  const redirectTo = '/dashboard'
  return { success: true, message: 'Login successful', redirectTo } // Return success stateo
}

export async function logoutUser() {
  cookies().delete('authToken', { path: '/' })
  return { success: true, message: 'Logout successful', redirectTo: '/' }
}

export async function checkUser() {
  const authToken = cookies().get('authToken')?.value
  if (!authToken) {
    return { status: 401, message: 'Unauthorized: No token provided' }
  }

  if (authToken) {
    try {
      const decodedToken = jwtDecode.decode(authToken)

      const userId = decodedToken?.userId
      return userId
    } catch (error) {
      console.error('Error decoding token:', error)
    }
  } else {
    console.error('No token found')
  }
}
