import { NextResponse } from 'next/server'
const backEndUrl = process.env.NEXT_BACKEND_URL
export async function GET(req) {
  // Bearer ${token}
  const authToken = req.headers.get('Authorization')
  if (!authToken) {
    return NextResponse.json({ message: 'Unauthorized: No token provided' }, { status: 401 })
  }
  try {
    const { searchParams } = new URL(req.url)
    const department = searchParams.get('department') || ''
    const query = searchParams.get('query') || ''
    const sort = searchParams.get('sort') || ''
    // console.log('departmentssss:', department)
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

    // Parse the JSON response
    const data = await response.json()
    // console.log('Printing out departments data: ', data)

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in GET function:', error.message)
    return NextResponse.json({ error: 'Failed to fetch departments data' }, { status: 500 })
  }
}

// ***********MOCK API***********

// app/api/users/route.js

// import { getUsersFullDetails } from '@/lib/mockApi.js/mockApi'
// import { NextResponse } from 'next/server'

// export async function GET(req) {
//   const { searchParams } = new URL(req.url)
//   const page = parseInt(searchParams.get('page') || '1', 10)
//   const limit = parseInt(searchParams.get('limit') || '10', 10)
//   const query = searchParams.get('query') || '' // Get the query from search params

//   // Pass the query to `getUsersFullDetails` for filtering
//   const paginatedData = await getUsersFullDetails(page, limit, query)

//   return NextResponse.json(paginatedData)
// }

// // app/api/users/route.js

// import { getUsersFullDetails } from '@/lib/mockApi.js/mockApi'
// import { NextResponse } from 'next/server'

// export async function GET(req) {
//   const { searchParams } = new URL(req.url)
//   const page = parseInt(searchParams.get('page') || '1', 10)
//   const limit = parseInt(searchParams.get('limit') || '10', 10)
//   const query = searchParams.get('query') || '' // Get the query from search params

//   // Pass the query to `getUsersFullDetails` for filtering
//   const paginatedData = await getUsersFullDetails(page, limit, query)

//   return NextResponse.json(paginatedData)
// }
