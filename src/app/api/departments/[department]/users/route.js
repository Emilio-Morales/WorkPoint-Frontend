import { NextResponse } from 'next/server'
const backEndUrl = process.env.NEXT_BACKEND_URL

export async function GET(req, { params }) {
  const authToken = req.headers.get('Authorization')
  if (!authToken) {
    return NextResponse.json({ message: 'Unauthorized: No token provided' }, { status: 401 })
  }
  try {
    const department = decodeURIComponent(params.department)

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '10', 10)
    const query = searchParams.get('query') || ''
    const sort = searchParams.get('sort') || ''

    const response = await fetch(
      `${backEndUrl}/UserJobInfo/GetUsersInDepartments/${department}/${page}/${limit}?query=${query}&sort=${sort}`,
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

    const paginatedData = await response.json()

    return NextResponse.json(paginatedData)
  } catch (error) {
    console.error('Error in GET function:', error.message)
    return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 })
  }
}
