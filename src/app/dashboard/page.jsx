import Pagination from '@/components/pagination/Pagination'
import Search from '@/components/Search'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Divider } from '@/components/ui/divider'
import { Heading, Subheading } from '@/components/ui/heading'
import { Select } from '@/components/ui/select'
import UsersTable from '@/components/UsersTable'
import { getTotalActiveUsers, getTotalBudget, getTotalInactiveUsers, getTotalUsers } from '@/lib/mockApi.js/mockApi'
import { calculateRate, formatCurrency } from '@/lib/utils'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000' // Use env
// async function fetchUsers(page = 1, limit = 10) {
//   const res = await fetch(`${baseUrl}/api/users?page=${page}&limit=${limit}`, {
//     cache: 'no-store', // Ensures fresh data every time
//   })
//   const data = await res.json()
//   console.log('data:', data)
//   return data
// }

async function fetchUsers(page = 1, limit = 10, query = '') {
  const res = await fetch(`${baseUrl}/api/users?page=${page}&limit=${limit}&query=${query}`, {
    cache: 'no-store', // Ensures fresh data every time
  })
  const data = await res.json()
  // console.log('data:', data)
  return data
}

export function Stat({ title, value, badgeType, formattedRate, subText }) {
  return (
    <div>
      <Divider />
      <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">{title}</div>
      <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">{value}</div>
      <div className="mt-3 text-sm/6 sm:text-xs/6">
        {badgeType && (
          <>
            <Badge color={badgeType === 'positive' ? 'lime' : 'pink'}>{formattedRate}</Badge>{' '}
            <span className="text-zinc-500">of total employees</span>
          </>
        )}
        {subText && (
          <>
            <span className="text-zinc-500">{subText}</span>
          </>
        )}
      </div>
    </div>
  )
}

export default async function Home({ searchParams }) {
  // let orders = await getRecentOrders()
  // let users = await getUsersFullDetails()
  // let firstUsers = users.slice(0, 10)

  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1
  const query = searchParams.query || ''

  const usersInfo = await fetchUsers(page, 10, query)
  console.log('userInfo: ', usersInfo)
  const users = usersInfo.data

  // Fetch Stats Data
  const [totalBudget, totalUsers, totalActiveUsers, totalInactiveUsers] = await Promise.all([
    getTotalBudget(),
    getTotalUsers(),
    getTotalActiveUsers(),
    getTotalInactiveUsers(),
  ])

  const activeUsersRate = calculateRate(totalUsers, totalActiveUsers)
  const inactiveUsersRate = calculateRate(totalUsers, totalInactiveUsers)

  return (
    <>
      <Heading>Good afternoon, John</Heading>
      <div className="mt-8 flex items-end justify-between">
        <Subheading>Overview</Subheading>
      </div>
      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <Stat title="Total budget" value={formatCurrency(totalBudget)} subText="Allocated across all departments" />
        <Stat title="Total Employees" value={totalUsers} subText="All registered employees" />
        <Stat
          title="Total Active Employees"
          value={totalActiveUsers}
          badgeType="positive"
          formattedRate={`${activeUsersRate}%`}
        />
        <Stat
          title="Total Inactive Employees"
          value={totalInactiveUsers}
          badgeType="negative"
          formattedRate={`${inactiveUsersRate}%`}
        />
      </div>
      <Subheading className="mt-14">Users</Subheading>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-sm:w-full sm:flex-1">
          <div className="mt-4 flex max-w-xl gap-4">
            <Search placeholder="Search users&hellip;" />
            <div>
              <Select name="sort_by">
                <option value="name" className="">
                  Sort by name
                </option>
                <option value="date" className="">
                  Sort by department
                </option>
                <option value="status" className="">
                  Sort by active
                </option>
              </Select>
            </div>
          </div>
        </div>
        <Button href="/users/create">Create user</Button>
      </div>
      <UsersTable users={users} />
      <Pagination totalPages={usersInfo.totalPages} />
    </>
  )
}
