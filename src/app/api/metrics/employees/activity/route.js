import { NextResponse } from 'next/server'
const backEndUrl = process.env.NEXT_BACKEND_URL
export async function GET(req) {
  const authToken = req.headers.get('Authorization')
  if (!authToken) {
    return NextResponse.json({ message: 'Unauthorized: No token provided' }, { status: 401 })
  }
  try {
    const { searchParams } = new URL(req.url)
    const year = searchParams.get('year') || ''
    const status = searchParams.get('status') || ''
    const response = await fetch(`${backEndUrl}/Company/GetMetrics/${year}/${status}`, {
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
    console.error('Error in GET function:', error.message)
    return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 })
  }
}
