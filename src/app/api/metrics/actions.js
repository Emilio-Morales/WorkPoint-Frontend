'use server'
import { cookies } from 'next/headers'
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

export async function getUsersJoinedByMonth(year) {
  const authToken = cookies().get('authToken')?.value
  if (!authToken) {
    return { status: 401, message: 'Unauthorized: No token provided' }
  }
  const status = true
  const res = await fetch(`${baseUrl}/api/metrics/employees/activity?year=${year}&status=${status}`, {
    cache: 'no-store', // Ensures fresh data every time
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })
  const data = await res.json()
  return data
}

export async function getUsersLeftByMonth(year) {
  const authToken = cookies().get('authToken')?.value
  if (!authToken) {
    return { status: 401, message: 'Unauthorized: No token provided' }
  }
  const status = false
  const res = await fetch(`${baseUrl}/api/metrics/employees/activity?year=${year}&status=${status}`, {
    cache: 'no-store', // Ensures fresh data every time
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })
  const data = await res.json()

  return data
}

export async function getTotalBudgetByMonth(year) {
  const authToken = cookies().get('authToken')?.value
  if (!authToken) {
    return { status: 401, message: 'Unauthorized: No token provided' }
  }
  const res = await fetch(`${baseUrl}/api/metrics/budget?year=${year}`, {
    cache: 'no-store', // Ensures fresh data every time
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })
  const data = await res.json()
  return data
}
