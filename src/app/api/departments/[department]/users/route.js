import { getUsersInDepartment } from '@/lib/mockApi.js/mockApi'
import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
  console.log('PARAMS:', params)

  const department = decodeURIComponent(params.department) // Retrieve the department name from the URL

  console.log('departmentssss:', department)
  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = parseInt(searchParams.get('limit') || '10', 10)
  const query = searchParams.get('query') || '' // Get the query from search params

  // Fetch users in the given department with pagination and query
  const paginatedData = await getUsersInDepartment(department, page, limit, query)

  return NextResponse.json(paginatedData)
}
