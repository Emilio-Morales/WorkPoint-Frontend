'use server'
import { cookies } from 'next/headers'
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

export async function getDepartmentsInfo(query = '', sort = '') {
  const authToken = cookies().get('authToken')?.value
  if (!authToken) {
    return { status: 401, message: 'Unauthorized: No token provided' }
  }
  const res = await fetch(`${baseUrl}/api/departments?query=${query}&sort=${sort}`, {
    cache: 'no-store', // Ensures fresh data every time
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })
  const data = await res.json()
  return data
}

export async function getDepartmentInfo(department) {
  console.log('inside get department info: ', department)
  const authToken = cookies().get('authToken')?.value
  if (!authToken) {
    return { status: 401, message: 'Unauthorized: No token provided' }
  }
  const res = await fetch(`${baseUrl}/api/departments?department=${department}`, {
    cache: 'no-store', // Ensures fresh data every time
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })
  const data = await res.json()
  return data
}

export async function fetchUsersInDepartment(department, page = 1, limit = 10, query = '', sort = '') {
  const authToken = cookies().get('authToken')?.value
  if (!authToken) {
    return { status: 401, message: 'Unauthorized: No token provided' }
  }
  const res = await fetch(
    `${baseUrl}/api/departments/${department}/users?page=${page}&limit=${limit}&query=${query}&sort=${sort}`,
    {
      cache: 'no-store', // Ensures fresh data every time
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  )
  const data = await res.json()
  return data
}
