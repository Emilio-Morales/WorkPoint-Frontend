import DepartmentUsersTable from '@/components/DepartmentUsersTable'
import Pagination from '@/components/pagination/Pagination'
import Search from '@/components/Search'
import { Badge } from '@/components/ui/badge'
import { Divider } from '@/components/ui/divider'
import { Heading, Subheading } from '@/components/ui/heading'
import { Link } from '@/components/ui/link'
import { Select } from '@/components/ui/select'
import { getDepartmentInfo } from '@/lib/mockApi.js/mockApi'
import { calculateRate, formatCurrency } from '@/lib/utils'
import { ChevronLeftIcon } from '@heroicons/react/16/solid'
import {
  ArrowTrendingUpIcon,
  BeakerIcon,
  BookOpenIcon,
  CogIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  FolderIcon,
  PhoneArrowDownLeftIcon,
  ScaleIcon,
  ShieldCheckIcon,
  TagIcon,
  UserGroupIcon,
} from '@heroicons/react/20/solid'
import { notFound } from 'next/navigation'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
async function fetchUsers(department, page = 1, limit = 10, query = '') {
  const res = await fetch(`${baseUrl}/api/departments/${department}/users?page=${page}&limit=${limit}&query=${query}`, {
    cache: 'no-store', // Ensures fresh data every time
  })
  const data = await res.json()
  // console.log('data:', data)
  return data
}

export async function generateMetadata({ params }) {
  // let event = await getEvent(params.id)
  let departmentName = decodeURIComponent(params.id)
  let department = await getDepartmentInfo(departmentName)
  let titleName = `${department[0].Department} Department`

  // Limit total length of title to 20 characters
  if (titleName.length > 20) {
    titleName = `${titleName.slice(0, 17)}...`
  }
  return {
    title: titleName,
  }
}

function Stat({ title, value, badgeType, formattedRate, subText }) {
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
export default async function Department({ params, searchParams }) {
  let departmentName = decodeURIComponent(params.id)
  let data = await getDepartmentInfo(departmentName)
  let department = data[0]

  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1
  const query = searchParams.query || ''

  const usersInfo = await fetchUsers(department.Department, page, 10, query)
  const users = usersInfo.data
  const totalActiveSalary = usersInfo.totalActiveSalary
  const totalInactiveSalary = usersInfo.totalInactiveSalary

  const totalUsers = department.Count
  const totalActiveUsers = department.ActiveCount
  const totalInactiveUsers = department.Count - department.ActiveCount

  const activeUsersRate = calculateRate(totalUsers, totalActiveUsers)
  const inactiveUsersRate = calculateRate(totalUsers, totalInactiveUsers)

  console.log('totalActiveSalary', totalActiveSalary)
  console.log('totalInactiveSalary', totalInactiveSalary)

  // let orders = await getEventOrders(params.id)

  // console.log('department:-------------------', department)
  if (!department) {
    notFound()
  }

  const departmentIcons = {
    Services: <ShieldCheckIcon className="h-20 w-32 text-stone-900 dark:text-stone-500" />,
    Support: <PhoneArrowDownLeftIcon className="h-20 w-32 text-stone-900 dark:text-stone-500" />,
    Accounting: <CreditCardIcon className="h-20 w-32 text-stone-900 dark:text-stone-500" />,
    'Product Management': <FolderIcon className="h-20 w-32 text-stone-900 dark:text-stone-500" />,
    Sales: <CurrencyDollarIcon className="h-20 w-32 text-stone-900 dark:text-stone-500" />,
    'Research and Development': <BeakerIcon className="h-20 w-32 text-stone-900 dark:text-stone-500" />,
    Training: <BookOpenIcon className="h-20 w-32 text-stone-900 dark:text-stone-500" />,
    Legal: <ScaleIcon className="h-20 w-32 text-stone-900 dark:text-stone-500" />,
    'Human Resources': <UserGroupIcon className="h-20 w-32 text-stone-900 dark:text-stone-500" />,
    'Business Development': <ArrowTrendingUpIcon className="h-20 w-32 text-stone-900 dark:text-stone-500" />,
    Marketing: <TagIcon className="h-20 w-32 text-stone-900 dark:text-stone-500" />,
    Engineering: <CogIcon className="h-20 w-32 text-stone-900 dark:text-stone-500" />,
  }

  return (
    <>
      <div className="max-lg:hidden">
        <Link
          href="/dashboard/departments"
          className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400"
        >
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Departments
        </Link>
      </div>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-wrap items-center gap-6">
          <div className="w-32 shrink-0 rounded-lg border border-zinc-950/5 dark:border-white/10">
            {departmentIcons[department.Department]}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Heading>{department.Department}</Heading>
              {totalActiveUsers > totalInactiveUsers ? (
                <Badge className="max-sm:hidden" color="lime">
                  Healthy Budget Allocation
                </Badge>
              ) : (
                <Badge className="max-sm:hidden" color="pink">
                  Budget Needs Attention
                </Badge>
              )}
            </div>
            <div className="mt-2 text-sm/6 text-zinc-500">
              {totalActiveUsers} active employees <span aria-hidden="true">·</span> {totalInactiveUsers} inactive
              employees <span aria-hidden="true">·</span> {totalUsers} total employees
            </div>
            {/* <div className="mt-2 text-sm/6 text-zinc-500">
              {event.date} at {event.time} <span aria-hidden="true">·</span> {event.location}
            </div> */}
          </div>
        </div>
      </div>
      <div className="mt-8 grid gap-8 sm:grid-cols-3">
        <Stat title="Total Budget" value={formatCurrency(department.TotalSalaryPaidToDepartment)} />
        <Stat
          title="Active Employee Budget"
          value={formatCurrency(totalActiveSalary)}
          badgeType="positive"
          formattedRate={`${activeUsersRate}%`}
        />
        {/* ***CHANGE TO INACTIVE BUDGET????*** */}
        <Stat
          title="Inactive Employee Budget"
          value={formatCurrency(totalInactiveSalary)}
          badgeType="negative"
          formattedRate={`${inactiveUsersRate}%`}
        />
      </div>
      <Subheading className="mt-12">Employees</Subheading>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-sm:w-full sm:flex-1">
          <div className="mt-4 flex max-w-xl gap-4">
            <Search placeholder="Search employees&hellip;" />
            <div>
              <Select name="sort_by">
                <option value="name" className="">
                  Sort by name
                </option>
                <option value="date" className="">
                  Sort by salary
                </option>
                <option value="status" className="">
                  Sort by active
                </option>
              </Select>
            </div>
          </div>
        </div>
      </div>
      <DepartmentUsersTable users={users} />
      <Pagination totalPages={usersInfo.totalPages} />
    </>
  )
}
