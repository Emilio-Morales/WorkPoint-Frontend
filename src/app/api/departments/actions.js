import { cookies } from 'next/headers'
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

export async function getDepartmentInfo(department) {
  const authToken = cookies().get('authToken')?.value
  const res = await fetch(`${baseUrl}/api/departments`, {
    cache: 'no-store', // Ensures fresh data every time
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })
  const data = await res.json()

  console.log('data:', data)
  return data
}
