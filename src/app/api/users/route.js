import { NextResponse } from 'next/server'
const backEndUrl = process.env.NEXT_BACKEND_URL

// Returns paginated list of users
export async function GET(req) {
  const authToken = req.headers.get('Authorization')
  if (!authToken) {
    return NextResponse.json({ message: 'Unauthorized: No token provided' }, { status: 401 })
  }
  try {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '10', 10)
    const query = searchParams.get('query') || ''
    const sort = searchParams.get('sort') || ''

    const response = await fetch(
      `${backEndUrl}/UserComplete/GetUsersWithPagination/${page}/${limit}?query=${query}&sort=${sort}`,
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

// Creates a new user
export async function POST(req) {
  const authToken = req.headers.get('Authorization')

  /* Temporary fix for backend bug */
  const userId = 0
  const dateExited = '1900-01-01T00:00:00.000Z'
  const avgSalary = 0
  const active = true
  const dateHired = new Date().toISOString()

  if (!authToken) {
    return NextResponse.json({ message: 'Unauthorized: No token provided' }, { status: 401 })
  }

  try {
    const userData = await req.json()
    const bodyData = {
      ...userData,
      userId,
      avgSalary,
      active,
      dateExited,
      dateHired,
    }

    const response = await fetch(`${backEndUrl}/UserComplete/UpsertUser`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken,
      },
      body: JSON.stringify({
        ...bodyData,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Error creating user:', response.status, response.statusText)
      return NextResponse.json({ error: errorData.message }, { status: response.status })
    }

    const result = await response.json()
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error in POST function:', error.message)
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }
}
