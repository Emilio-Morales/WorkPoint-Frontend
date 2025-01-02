'use server'
import { cookies } from 'next/headers'
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

export async function fetchUsers(page = 1, limit = 10, query = '', sort = '') {
  const authToken = cookies().get('authToken')?.value
  if (!authToken) {
    return { status: 401, message: 'Unauthorized: No token provided' }
  }

  const res = await fetch(`${baseUrl}/api/users?page=${page}&limit=${limit}&query=${query}&sort=${sort}`, {
    cache: 'no-store', // Ensures fresh data every time
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })
  const data = await res.json()

  // console.log('data:', data)
  return data
}

export async function fetchUser(userId) {
  const authToken = cookies().get('authToken')?.value
  if (!authToken) {
    return { status: 401, message: 'Unauthorized: No token provided' }
  }

  const res = await fetch(`${baseUrl}/api/users/${userId}`, {
    cache: 'no-store', // Ensures fresh data every time
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })
  const data = await res.json()

  // console.log('data:', data)
  return data
}

export async function createUser(data) {
  const authToken = cookies().get('authToken')?.value
  if (!authToken) {
    return { status: 401, message: 'Unauthorized: No token provided' }
  }
  console.log('inside create user action: ', data)

  const res = await fetch(`${baseUrl}/api/users`, {
    cache: 'no-store', // Ensures fresh data every time
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    method: 'POST',
    body: JSON.stringify(data),
  })

  console.log('res from action: ', res)
  const responseData = await res.json()
  const message = responseData.error
  console.log('checking message: ', message)
  const status = res.status
  const result = { status, message }

  if (status === 409) {
    throw new Error(`${message}`)
  }

  return result
}

export async function updateUser(data) {
  const authToken = cookies().get('authToken')?.value
  if (!authToken) {
    return { status: 401, message: 'Unauthorized: No token provided' }
  }
  console.log('inside create user action: ', data)
  const { userId } = data
  const res = await fetch(`${baseUrl}/api/users/${userId}`, {
    cache: 'no-store', // Ensures fresh data every time
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    method: 'POST',
    body: JSON.stringify(data),
  })

  const message = res.json()
  const status = res.status
  const result = { status, message }

  return result
}

export async function deleteUser(userId) {
  const authToken = cookies().get('authToken')?.value
  if (!authToken) {
    return { status: 401, message: 'Unauthorized: No token provided' }
  }

  const res = await fetch(`${baseUrl}/api/users/${userId}`, {
    cache: 'no-store', // Ensures fresh data every time
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    method: 'DELETE',
  })

  const message = res.json()
  const status = res.status
  const result = { status, message }

  return result
}
