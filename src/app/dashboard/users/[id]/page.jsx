import { getDepartmentInfo, getDepartmentsInfo } from '@/app/api/departments/actions'
import { fetchUser } from '@/app/api/users/actions'
import BentoGrid2 from '@/components/home/users/BentoGrid2'
import { DeleteUser } from '@/components/home/users/DeleteUser'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DescriptionDetails, DescriptionList, DescriptionTerm } from '@/components/ui/description-list'
import { Divider } from '@/components/ui/divider'
import { Heading, Subheading } from '@/components/ui/heading'
import { Link } from '@/components/ui/link'
import { TextLink } from '@/components/ui/text'
import { formatCurrency, isActive } from '@/lib/utils'
import { BanknotesIcon, BriefcaseIcon, BuildingOffice2Icon, ChevronLeftIcon } from '@heroicons/react/16/solid'
import { redirect } from 'next/navigation'

export async function generateMetadata({ params }) {
  //   let order = await getOrder(params.id)
  // let user = await getUserFullDetails(params.id)
  let userBackendArray = await fetchUser(params.id)
  let user = userBackendArray[0]
  // let titleName = `${user?.FirstName} ${user?.LastName}`
  let titleName = `${user?.firstName} ${user?.lastName}`

  // Limit total length of user name to 20 characters
  if (titleName.length > 20) {
    titleName = `${titleName.slice(0, 17)}...`
  }

  return {
    title: user ? `Profile Overview: ${titleName} - WorkPoint` : 'User Profile - WorkPoint',
  }
}

export default async function User({ params }) {
  //   let order = await getOrder(params.id)
  // let user = await getUserFullDetails(params.id)
  // let departmentData = await getDepartmentInfoMockApi(user?.Department)
  // let departmentInfo = departmentData[0]

  let userBackendArray = await fetchUser(params.id)
  let user = userBackendArray[0]

  let departmentDataArray = await getDepartmentInfo(user?.department)
  let departmentData = departmentDataArray[0]

  // console.log('-------------departmentData: ', departmentData)

  // console.log('***userMockApi:', user, '| userBackend:', userBackend, '***')
  // console.log('***departmentData:', departmentData, '| departmentDataBackend:', departmentDataBackend, '***')

  // const companyInfoMockApi = await getDepartmentInfoMockApi()

  const companyInfo = await getDepartmentsInfo()
  if (companyInfo.status && companyInfo.status === 401) {
    redirect('/login') // Redirect to login if unauthorized
  }

  // console.log('***companyInfoMockApi:', companyInfoMockApi, '| companyInfo:', companyInfo, '***')

  // Calculate company-wide average salary
  let totalSalary = 0
  let totalEmployeeCount = 0

  // companyInfoMockApi.forEach((dept) => {
  //   totalSalary += dept.TotalSalaryPaidToDepartment || 0
  //   totalEmployeeCount += dept.Count || 0
  // })

  companyInfo.forEach((dept) => {
    totalSalary += dept.totalSalary || 0
    totalEmployeeCount += dept.employeeCount || 0
  })

  const companyAverageSalary = totalEmployeeCount > 0 ? totalSalary / totalEmployeeCount : 0

  if (!user) {
    // Show fallback message and delay before redirecting
    return (
      <div>
        <Heading>User not found. Redirecting to dashboard...</Heading>
        {redirect('/dashboard')} {/* Redirect */}
      </div>
    )
  }

  // const userStatusMockApi = isActive(user?.Active)
  // const userFullNameMockApi = `${user?.FirstName} ${user?.LastName}`

  const userStatus = isActive(user?.active)
  const userFullName = `${user?.firstName} ${user?.lastName}`

  console.log('user: ', user)

  return (
    <>
      <div className="max-lg:hidden">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400">
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Home
        </Link>
      </div>
      <div className="mt-4 lg:mt-8">
        <div className="flex items-center gap-4">
          <Heading>{userFullName}</Heading>
          {/* Mock Api */}
          {/* <Badge color={userStatus === 'Active' ? 'lime' : 'pink'}>{userStatus}</Badge> */}
          <Badge color={userStatus ? 'lime' : 'pink'}>{userStatus ? 'Active' : 'Inactive'}</Badge>
        </div>
        <div className="isolate mt-2.5 flex flex-wrap justify-between gap-x-6 gap-y-4">
          <div className="flex flex-wrap gap-x-10 gap-y-4 py-1.5">
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <BanknotesIcon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
              {/* Mock Api */}
              {/* <span>{formatCurrency(user?.Salary)}</span> */}
              <span>{formatCurrency(user?.salary)}</span>
            </span>
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <BriefcaseIcon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
              <span className="inline-flex gap-3">
                {/* {order.payment.card.type}{' '}
                 */}
                {/* {user?.JobTitle} */}
                {user?.jobTitle}
                {/* <span>
                  <span aria-hidden="true">••••</span> {order.payment.card.number}
                </span> */}
              </span>
            </span>
            <Link
              className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white"
              href={`/dashboard/departments/${encodeURIComponent(user?.department)}`}
            >
              <BuildingOffice2Icon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
              {/* <span>{order.date}</span> */}
              <span>{user?.department}</span>
            </Link>
          </div>
          <div className="flex gap-4">
            <DeleteUser outline userId={params.id} userEmail={user?.email}>
              Delete
            </DeleteUser>
            <Button href={`/dashboard/users/${user?.userId}/edit`}>Edit Profile</Button>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <Subheading>Employee Summary</Subheading>
        <Divider className="mt-4" />
        <DescriptionList>
          <DescriptionTerm>Name</DescriptionTerm>
          <DescriptionDetails>{userFullName}</DescriptionDetails>
          <DescriptionTerm>Job Title</DescriptionTerm>
          <DescriptionDetails>
            {user?.jobTitle}
            {/* <Link href={order.event.url} className="flex items-center gap-2">
              <Avatar src={order.event.thumbUrl} className="size-6" />
              <span>{order.event.name}</span>
            </Link> */}
          </DescriptionDetails>

          <DescriptionTerm>Department</DescriptionTerm>
          <DescriptionDetails>
            <TextLink href={`/dashboard/departments/${encodeURIComponent(user?.department)}`}>
              {user?.department}
            </TextLink>
          </DescriptionDetails>

          <DescriptionTerm>Email</DescriptionTerm>
          <DescriptionDetails>{user?.email}</DescriptionDetails>
          {/* <DescriptionTerm>Fee</DescriptionTerm> */}
          {/* <DescriptionDetails>CA{order.amount.fee}</DescriptionDetails> */}
          {/* <DescriptionTerm>Net</DescriptionTerm> */}
          {/* <DescriptionDetails>CA{order.amount.net}</DescriptionDetails> */}
        </DescriptionList>
      </div>
      <div className="mt-12">
        <Subheading>Insights</Subheading>
        <Divider className="mt-4" />
        {/* <BentoGrid2
          minSalary={departmentInfo.MinSalaryInDepartment}
          maxSalary={departmentInfo.MaxSalaryInDepartment}
          avgSalary={departmentInfo.AverageSalaryInDepartment}
          companyAverageSalary={companyAverageSalary}
          departmentTotalSalary={departmentInfo.TotalSalaryPaidToDepartment}
          user={user}
        /> */}

        <BentoGrid2
          minSalary={departmentData.minSalary}
          maxSalary={departmentData.maxSalary}
          avgSalary={departmentData.avgSalary}
          companyAverageSalary={companyAverageSalary}
          departmentTotalSalary={departmentData.totalSalary}
          user={user}
        />
      </div>
    </>
  )
}