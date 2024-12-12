import { getDepartmentInfo } from '@/app/api/departments/actions'
import { Badge } from '@/components/ui/badge'
import { Divider } from '@/components/ui/divider'
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '@/components/ui/dropdown'
import { Heading } from '@/components/ui/heading'
import { Input, InputGroup } from '@/components/ui/input'
import { Link } from '@/components/ui/link'
import { Select } from '@/components/ui/select'
// import { getDepartmentInfo } from '@/lib/mockApi.js/mockApi'
import { departmentIcons, formatCurrency } from '@/lib/utils'
import { EllipsisVerticalIcon, MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import { Suspense } from 'react'

export const metadata = {
  title: 'Departments',
}

export default async function Departments() {
  // let events = await getEvents()
  let departments = await getDepartmentInfo()

  console.log('data: ', departments)

  // dark:text-zinc-500???

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
        <Suspense fallback={<div>Loading...</div>}>
          {departments.map((department, index) => {
            const departmentHref = encodeURIComponent(department.department)
            return (
              <>
                <li key={department.department + index}>
                  <Divider soft={index > 0} />
                  <div className="flex items-center justify-between">
                    <div key={department.department + index} className="flex gap-6 py-6">
                      <div className="w-32 shrink-0">
                        {/* <ActiveUsersPieChart /> */}
                        <div className="w-32 shrink-0 rounded-lg border border-zinc-950/5 bg-zinc-100 dark:border-white/10 dark:bg-zinc-950">
                          {departmentIcons[department.department]}
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <div className="text-base/6 font-semibold">
                          <Link href={`/dashboard/departments/${departmentHref}`}>{department.department}</Link>
                        </div>
                        <div className="text-xs/6 text-zinc-500">
                          Total Allocated Budget: {formatCurrency(department.totalSalary)}
                        </div>
                        <div className="text-xs/6 text-zinc-600">
                          {/* Total Allocated Budget: $1,980,000 */}
                          {department.activeEmployeeCount}/{department.employeeCount} active users
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {department.activeEmployeeCount > department.employeeCount - department.activeEmployeeCount ? (
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
                          <DropdownItem href={`/dashboard/departments/${departmentHref}`}>View</DropdownItem>
                          {/* <DropdownItem>Edit</DropdownItem>
                        <DropdownItem>Delete</DropdownItem> */}
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </div>
                </li>
              </>
            )
          })}
        </Suspense>
      </ul>
    </>
  )
}
