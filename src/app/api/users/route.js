// app/api/users/route.js

import { getUserFullDetails } from '@/lib/mockApi.js/mockApi'
import { NextResponse } from 'next/server'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = parseInt(searchParams.get('limit') || '10', 10)
  console.log('limit', limit)
  const paginatedData = await getUserFullDetails(page, limit)

  return NextResponse.json(paginatedData)
}
