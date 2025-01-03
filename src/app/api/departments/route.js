import { NextResponse } from 'next/server'
const backEndUrl = process.env.NEXT_BACKEND_URL
export async function GET(req) {
  const authToken = req.headers.get('Authorization')
  if (!authToken) {
    return NextResponse.json({ message: 'Unauthorized: No token provided' }, { status: 401 })
  }
  try {
    const { searchParams } = new URL(req.url)
    const department = searchParams.get('department') || ''
    const query = searchParams.get('query') || ''
    const sort = searchParams.get('sort') || ''

    const response = await fetch(
      `${backEndUrl}/UserSalary/GetDepartmentsInfo/${department}?query=${query}&sort=${sort}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: authToken,
        },
      }
    )

    if (!response.ok) {
      console.error('Error fetching data:', response.status, response.statusText)
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in GET function:', error.message)
    return NextResponse.json({ error: 'Failed to fetch departments data' }, { status: 500 })
  }
}
