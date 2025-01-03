import { getDepartmentsInfo } from '@/app/api/departments/actions'
import Search from '@/components/Search'
import SelectSort from '@/components/SelectSort'
import { Badge } from '@/components/ui/badge'
import { Divider } from '@/components/ui/divider'
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '@/components/ui/dropdown'
import { Heading } from '@/components/ui/heading'
import { Link } from '@/components/ui/link'
import { departmentIcons, formatCurrency } from '@/lib/utils'
import { EllipsisVerticalIcon } from '@heroicons/react/16/solid'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

export const metadata = {
  title: 'Departments',
}

export default async function Departments({ searchParams }) {
  const query = searchParams.query || ''
  const sort = searchParams.sort || ''

  let departments = await getDepartmentsInfo(query, sort)
  if (departments.status && departments.status === 401) {
    redirect('/login') // Redirect to login if unauthorized
  }

  const sortValues = ['name', 'budget ↓', 'budget ↑']
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-sm:w-full sm:flex-1">
          <Heading>Departments</Heading>
          <div className="mt-4 flex max-w-xl gap-4">
            <Search placeholder="Search departments&hellip;" />
            <SelectSort values={sortValues} variant="departments" />
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
