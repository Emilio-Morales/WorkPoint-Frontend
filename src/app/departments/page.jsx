import { Badge } from '@/components/ui/badge'
import { Divider } from '@/components/ui/divider'
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '@/components/ui/dropdown'
import { Heading } from '@/components/ui/heading'
import { Input, InputGroup } from '@/components/ui/input'
import { Link } from '@/components/ui/link'
import { Select } from '@/components/ui/select'
import { getDepartmentInfo } from '@/lib/mockApi.js/mockApi'
import { formatCurrency } from '@/lib/utils'
import { EllipsisVerticalIcon, MagnifyingGlassIcon } from '@heroicons/react/16/solid'
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

export const metadata = {
  title: 'Events',
}

export default async function Events() {
  // let events = await getEvents()
  let departments = await getDepartmentInfo()
  console.log('data: ', departments)

  // dark:text-zinc-500???
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

  /******************************************
    {
        "UserId": 1,
        "Salary": 83269.85
    },
******************************************/

  /******************************************
    {
      UserId: 1,
      JobTitle: 'Internal Auditor',
      Department: 'Services',
    },
******************************************/

  /******************************************
    {
        UserId: 1,
        FirstName: 'Albertina',
        LastName: "O'Finan",
        Email: 'aofinan0@blogspot.com',
        Gender: 'Female',
        Active: 'FALSE',
    },
******************************************/

  const events = [
    {
      id: 1000,
      name: 'Services',
      url: '/events/1000',
      date: 'May 20, 2024',
      time: '10 PM',
      location: 'Harmony Theater, Winnipeg, MB',
      totalRevenue: '$102,552',
      totalRevenueChange: '+3.2%',
      ticketsAvailable: 500,
      ticketsSold: 350,
      ticketsSoldChange: '+8.1%',
      pageViews: '24,300',
      pageViewsChange: '-0.75%',
      status: 'On Sale',
      imgUrl: '/events/bear-hug.jpg',
      thumbUrl: '/events/bear-hug-thumb.jpg',
    },
  ]

  // {
  //   Department: 'Accounting',
  //   AverageSalaryInDepartment: 132797.7384415584,
  //   MinSalaryInDepartment: 76407.96,
  //   MaxSalaryInDepartment: 199702.13,
  //   TotalSalaryPaidToDepartment: 10225425.859999998,
  //   Count: 77,
  //   ActiveCount: 38
  // },
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-sm:w-full sm:flex-1">
          <Heading>Departments</Heading>
          <div className="mt-4 flex max-w-xl gap-4">
            <div className="flex-1">
              <InputGroup>
                <MagnifyingGlassIcon />
                <Input name="search" placeholder="Search departments&hellip;" />
              </InputGroup>
            </div>
            <div>
              <Select name="sort_by">
                <option value="name">Sort by name</option>
                <option value="date">Sort by Active</option>
                <option value="status">Sort by Budget</option>
              </Select>
            </div>
          </div>
        </div>
      </div>
      <ul className="mt-10">
        {departments.map((department, index) => (
          <>
            <li key={department.Department + index}>
              <Divider soft={index > 0} />
              <div className="flex items-center justify-between">
                <div key={department.Department + index} className="flex gap-6 py-6">
                  <div className="w-32 shrink-0">
                    {/* <ActiveUsersPieChart /> */}
                    <div className="w-32 shrink-0 rounded-lg border border-zinc-950/5 dark:border-white/10">
                      {departmentIcons[department.Department]}
                    </div>
                  </div>
                  {/* <div className="w-32 shrink-0">
                    <Link href={event.url} aria-hidden="true">
                      <img className="aspect-[3/2] rounded-lg shadow" src={event.imgUrl} alt="" />
                    </Link>
                  </div> */}
                  <div className="space-y-1.5">
                    <div className="text-base/6 font-semibold">
                      <Link href={`/departments/${department.Department}`}>{department.Department}</Link>
                    </div>
                    <div className="text-xs/6 text-zinc-500">
                      Total Allocated Budget: {formatCurrency(department.TotalSalaryPaidToDepartment)}
                    </div>
                    <div className="text-xs/6 text-zinc-600">
                      {/* Total Allocated Budget: $1,980,000 */}
                      {department.ActiveCount}/{department.Count} active users
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {department.ActiveCount > department.Count - department.ActiveCount ? (
                    <Badge className="max-sm:hidden" color="lime">
                      Healthy Budget Allocation
                    </Badge>
                  ) : (
                    <Badge className="max-sm:hidden" color="pink">
                      Budget Needs Attention
                    </Badge>
                  )}

                  <Dropdown>
                    <DropdownButton plain aria-label="More options">
                      <EllipsisVerticalIcon />
                    </DropdownButton>
                    <DropdownMenu anchor="bottom end">
                      <DropdownItem href={`/departments/${department.Department}`}>View</DropdownItem>
                      <DropdownItem>Edit</DropdownItem>
                      <DropdownItem>Delete</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            </li>
          </>
        ))}
      </ul>
    </>
  )
}
