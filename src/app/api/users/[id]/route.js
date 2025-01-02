import { NextResponse } from 'next/server'
const backEndUrl = process.env.NEXT_BACKEND_URL

// Fetches data for a specific user
export async function GET(req, { params }) {
  const authToken = req.headers.get('Authorization')
  if (!authToken) {
    return NextResponse.json({ message: 'Unauthorized: No token provided' }, { status: 401 })
  }

  const userId = params.id

  try {
    const response = await fetch(`${backEndUrl}/UserComplete/GetUsers/${userId}/false`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken,
      },
    })

    if (!response.ok) {
      console.error('Error fetching data:', response.status, response.statusText)
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.log('Error in GET function:', error.message)
    return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 })
  }
}

// Updates data for a specific user
export async function POST(req) {
  const authToken = req.headers.get('Authorization')
  if (!authToken) {
    return NextResponse.json({ message: 'Unauthorized: No token provided' }, { status: 401 })
  }

  try {
    const userData = await req.json()
    const response = await fetch(`${backEndUrl}/UserComplete/UpsertUser`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken,
      },
      body: JSON.stringify({
        ...userData,
      }),
    })

    if (!response.ok) {
      console.error('Error updating user:', response.status, response.statusText)
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const result = await response.json()
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error in POST function:', error.message)
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }
}

export async function DELETE(req, { params }) {
  const authToken = req.headers.get('Authorization')
  if (!authToken) {
    return NextResponse.json({ message: 'Unauthorized: No token provided' }, { status: 401 })
  }

  const userId = params.id

  try {
    const response = await fetch(`${backEndUrl}/UserComplete/DeleteUser/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken,
      },
    })

    if (!response.ok) {
      console.error('Error deleting user:', response.status, response.statusText)
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.log('Error in DELETE function:', error.message)
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 })
  }
}
