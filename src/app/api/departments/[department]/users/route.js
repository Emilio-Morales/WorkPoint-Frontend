import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
  // Bearer ${token}
  const authToken = req.headers.get('Authorization')
  if (!authToken) {
    return NextResponse.json({ message: 'Unauthorized: No token provided' }, { status: 401 })
  }
  try {
    // console.log('PARAMS:', params)

    const department = decodeURIComponent(params.department) // Retrieve the department name from the URL

    // console.log('departmentssss:', department)
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '10', 10)
    const query = searchParams.get('query') || '' // Get the query from search params

    // Pass the query to `getUsersFullDetails` for filtering
    // const paginatedData = await getUsersFullDetails(page, limit, query)
    const response = await fetch(
      `https://workpointbackend.azurewebsites.net/UserJobInfo/GetUsersInDepartments/${department}/${page}/${limit}`,
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
    const paginatedData = await response.json()
    // console.log('Printing out paginatedData: ', paginatedData)

    return NextResponse.json(paginatedData)
  } catch (error) {
    console.error('Error in GET function:', error.message)
    return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 })
  }

  // const response = await fetch(
  //   `https://workpointbackend.azurewebsites.net/UserComplete/GetUsersWithPagination/0/false/${page}/${limit}`,
  //   {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: authToken,
  //     },
  //   }
  // )

  // // Fetch users in the given department with pagination and query
  // const paginatedData = await getUsersInDepartment(department, page, limit, query)

  // return NextResponse.json(paginatedData)
}
