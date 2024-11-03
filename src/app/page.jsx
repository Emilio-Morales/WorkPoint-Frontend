import Pagination from '@/components/pagination/Pagination'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Divider } from '@/components/ui/divider'
import { Heading, Subheading } from '@/components/ui/heading'
import { Input, InputGroup } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getTotalActiveUsers, getTotalBudget, getTotalInactiveUsers, getTotalUsers } from '@/lib/mockApi.js/mockApi'
import { formatCurrency } from '@/lib/utils'
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000' // Use env
async function fetchUsers(page = 1, limit = 10) {
  const res = await fetch(`${baseUrl}/api/users?page=${page}&limit=${limit}`, {
    cache: 'no-store', // Ensures fresh data every time
  })
  const data = await res.json()
  console.log('data:', data)
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
            <span className="text-zinc-500">of total users</span>
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
  // let users = await getUserFullDetails()
  // let firstUsers = users.slice(0, 10)

  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1
  const usersInfo = await fetchUsers(page, 10)
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
        {/* <div>
          <Select name="period">
            <option value="last_week">Last week</option>
            <option value="last_two">Last two weeks</option>
            <option value="last_month">Last month</option>
            <option value="last_quarter">Last quarter</option>
          </Select>
        </div> */}
      </div>
      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <Stat title="Total budget" value={formatCurrency(totalBudget)} subText="Allocated across all departments" />
        <Stat title="Total Users" value={totalUsers} subText="All registered employees" />
        <Stat
          title="Total Active Users"
          value={totalActiveUsers}
          badgeType="positive"
          formattedRate={`${activeUsersRate}%`}
        />
        <Stat
          title="Total Inactive Users"
          value={totalInactiveUsers}
          badgeType="negative"
          formattedRate={`${inactiveUsersRate}%`}
        />
      </div>
      <Subheading className="mt-14">Users</Subheading>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-sm:w-full sm:flex-1">
          <div className="mt-4 flex max-w-xl gap-4">
            <div className="flex-1">
              <InputGroup>
                <MagnifyingGlassIcon />
                <Input name="search" placeholder="Search users&hellip;" />
              </InputGroup>
            </div>
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
        <Button>Create user</Button>
      </div>
      <div className="">
        <Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
          <TableHead>
            <TableRow>
              <TableHeader>Name</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Job Title</TableHeader>
              <TableHeader>Department</TableHeader>
              <TableHeader className={'text-left'}>Active</TableHeader>
              {/* <TableHeader>Amount</TableHeader> */}
              {/* <TableHeader>Amount</TableHeader> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} href={user.id} title={`user #${user.id}`}>
                <TableCell>{user.FirstName + ' ' + user.LastName}</TableCell>
                <TableCell className="text-zinc-500">{user.Email}</TableCell>
                <TableCell>{user.JobTitle}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span>{user.Department}</span>
                  </div>
                </TableCell>
                <TableCell className={'text-left'}>
                  <Badge color={user.Active === 'TRUE' ? 'lime' : 'pink'}>{isActive(user.Active)}</Badge>
                </TableCell>
                {/* <TableCell>US{user.amount.usd}</TableCell> */}
                {/* <TableCell>US{user.amount.usd}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination totalPages={usersInfo.totalPages} />
    </>
  )
}

function isActive(userActive) {
  if (userActive === 'TRUE') {
    return 'Active'
  } else {
    return 'Inactive'
  }
}

function calculateRate(totalUsers, usersInCategory) {
  if (totalUsers === 0) return 0 // Avoid division by zero

  // Calculate and round to 1 decimal place, ensuring it is a number
  const rate = (usersInCategory / totalUsers) * 100
  return Number((Math.round(rate * 10) / 10).toFixed(1))
}
