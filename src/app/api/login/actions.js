'use server'

import { cookies } from 'next/headers'

export async function loginUser(credentials) {
  console.log('credentials', credentials)
  console.log('baseurl: ', `${process.env.NEXT_BACKEND_URL}`)
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

  //   return true
}
