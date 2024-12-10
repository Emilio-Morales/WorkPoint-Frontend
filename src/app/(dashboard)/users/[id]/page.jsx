import BentoGrid2 from '@/components/home/users/BentoGrid2'
import { DeleteUser } from '@/components/home/users/DeleteUser'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DescriptionDetails, DescriptionList, DescriptionTerm } from '@/components/ui/description-list'
import { Divider } from '@/components/ui/divider'
import { Heading, Subheading } from '@/components/ui/heading'
import { Link } from '@/components/ui/link'
import { TextLink } from '@/components/ui/text'
import { getDepartmentInfo, getUserFullDetails } from '@/lib/mockApi.js/mockApi'
import { formatCurrency, isActive } from '@/lib/utils'
import { BanknotesIcon, BriefcaseIcon, BuildingOffice2Icon, ChevronLeftIcon } from '@heroicons/react/16/solid'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  //   let order = await getOrder(params.id)
  let user = await getUserFullDetails(params.id)
  let titleName = `${user.FirstName} ${user.LastName}`

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
  let user = await getUserFullDetails(params.id)
  let departmentData = await getDepartmentInfo(user.Department)
  let departmentInfo = departmentData[0]

  const companyInfo = await getDepartmentInfo()

  // Calculate company-wide average salary
  let totalSalary = 0
  let totalEmployeeCount = 0

  companyInfo.forEach((dept) => {
    totalSalary += dept.TotalSalaryPaidToDepartment || 0
    totalEmployeeCount += dept.Count || 0
  })

  const companyAverageSalary = totalEmployeeCount > 0 ? totalSalary / totalEmployeeCount : 0

  if (!user) {
    notFound()
  }

  const userStatus = isActive(user.Active)
  const userFullName = `${user.FirstName} ${user.LastName}`

  return (
    <>
      <div className="max-lg:hidden">
        <Link href="/" className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400">
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Home
        </Link>
      </div>
      <div className="mt-4 lg:mt-8">
        <div className="flex items-center gap-4">
          <Heading>{userFullName}</Heading>
          <Badge color={userStatus === 'Active' ? 'lime' : 'pink'}>{userStatus}</Badge>
        </div>
        <div className="isolate mt-2.5 flex flex-wrap justify-between gap-x-6 gap-y-4">
          <div className="flex flex-wrap gap-x-10 gap-y-4 py-1.5">
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <BanknotesIcon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
              <span>{formatCurrency(user.Salary)}</span>
            </span>
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <BriefcaseIcon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
              <span className="inline-flex gap-3">
                {/* {order.payment.card.type}{' '}
                 */}
                {user.JobTitle}
                {/* <span>
                  <span aria-hidden="true">••••</span> {order.payment.card.number}
                </span> */}
              </span>
            </span>
            <Link
              className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white"
              href={`/departments/${encodeURIComponent(user.Department)}`}
            >
              <BuildingOffice2Icon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
              {/* <span>{order.date}</span> */}
              <span>{user.Department}</span>
            </Link>
          </div>
          <div className="flex gap-4">
            <DeleteUser outline>Delete</DeleteUser>
            <Button href={`/users/${user.UserId}/edit`}>Edit Profile</Button>
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
            {user.JobTitle}
            {/* <Link href={order.event.url} className="flex items-center gap-2">
              <Avatar src={order.event.thumbUrl} className="size-6" />
              <span>{order.event.name}</span>
            </Link> */}
          </DescriptionDetails>

          <DescriptionTerm>Department</DescriptionTerm>
          <DescriptionDetails>
            <TextLink href={`/departments/${encodeURIComponent(user.Department)}`}>{user.Department}</TextLink>
          </DescriptionDetails>

          <DescriptionTerm>Email</DescriptionTerm>
          <DescriptionDetails>{user.Email}</DescriptionDetails>
          {/* <DescriptionTerm>Fee</DescriptionTerm> */}
          {/* <DescriptionDetails>CA{order.amount.fee}</DescriptionDetails> */}
          {/* <DescriptionTerm>Net</DescriptionTerm> */}
          {/* <DescriptionDetails>CA{order.amount.net}</DescriptionDetails> */}
        </DescriptionList>
      </div>
      <div className="mt-12">
        <Subheading>Insights</Subheading>
        <Divider className="mt-4" />
        {/* <BentoGrid1 /> */}
        {/* <BentoGrid3 /> */}

        <BentoGrid2
          minSalary={departmentInfo.MinSalaryInDepartment}
          maxSalary={departmentInfo.MaxSalaryInDepartment}
          avgSalary={departmentInfo.AverageSalaryInDepartment}
          companyAverageSalary={companyAverageSalary}
          departmentTotalSalary={departmentInfo.TotalSalaryPaidToDepartment}
          user={user}
        />
        {/* <DescriptionList>
          <DescriptionTerm>Employee Salary vs Department Average</DescriptionTerm>
          <DescriptionDetails> */}
        {/* border border-red-500 */}
        {/* <div className="flex flex-col">
              <div>{rendersalaryBadge()}</div>
              <SalaryChart
                minSalary={departmentInfo.MinSalaryInDepartment}
                maxSalary={departmentInfo.MaxSalaryInDepartment}
                avgSalary={departmentInfo.AverageSalaryInDepartment}
                userSalary={user.Salary}
                department={user.Department}
                userSalaryColor={userSalaryColor}
              />
            </div> */}
        {/* </DescriptionDetails> */}
        {/* <DescriptionTerm>Card number</DescriptionTerm>
          <DescriptionDetails>•••• {order.payment.card.number}</DescriptionDetails>
          <DescriptionTerm>Card type</DescriptionTerm>
          <DescriptionDetails>{order.payment.card.type}</DescriptionDetails>
          <DescriptionTerm>Card expiry</DescriptionTerm>
          <DescriptionDetails>{order.payment.card.expiry}</DescriptionDetails>
          <DescriptionTerm>Owner</DescriptionTerm>
          <DescriptionDetails>{order.customer.name}</DescriptionDetails>
          <DescriptionTerm>Email address</DescriptionTerm>
          <DescriptionDetails>{order.customer.email}</DescriptionDetails>
          <DescriptionTerm>Address</DescriptionTerm>
          <DescriptionDetails>{order.customer.address}</DescriptionDetails>
          <DescriptionTerm>Country</DescriptionTerm>
          <DescriptionDetails>
            <span className="inline-flex gap-3">
              <img src={order.customer.countryFlagUrl} alt={order.customer.country} />
              {order.customer.country}
            </span>
          </DescriptionDetails>
          <DescriptionTerm>CVC</DescriptionTerm>
          <DescriptionDetails>
            <Badge color="lime">Passed successfully</Badge>
          </DescriptionDetails> */}
        {/* </DescriptionList> */}
      </div>
    </>
  )
}
