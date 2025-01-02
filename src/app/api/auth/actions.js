'use server'

import jwtDecode from 'jsonwebtoken'
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

  console.log('token inside of login: ', token)

  // Store JWT in an HTTP-only cookie
  cookies().set('authToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  })

  console.log('cookies inside login: ', cookies().get('authToken'))

  // Redirect to dashboard
  const redirectTo = '/dashboard'
  return { success: true, message: 'Login successful', redirectTo } // Return success stateo

  //   return true
}

export async function logoutUser() {
  cookies().delete('authToken', { path: '/' })

  console.log('authToken cookie deleted')
  return { success: true, message: 'Logout successful', redirectTo: '/' }
}

export async function checkUser() {
  const authToken = cookies().get('authToken')?.value
  if (!authToken) {
    return { status: 401, message: 'Unauthorized: No token provided' }
  }

  if (authToken) {
    try {
      // Decode the token (without verifying)
      const decodedToken = jwtDecode.decode(authToken)

      // Access the userId claim
      const userId = decodedToken?.userId
      return userId
    } catch (error) {
      console.error('Error decoding token:', error)
    }
  } else {
    console.error('No token found')
  }
}
