import { getDepartmentInfo, getUserFullDetails } from '@/lib/mockApi.js/mockApi'

import { DepartmentListBox } from '@/app/dashboard/settings/departmentListBox'
import { Button } from '@/components/ui/button'
import { Divider } from '@/components/ui/divider'
import { Heading, Subheading } from '@/components/ui/heading'
import { Input, InputGroup } from '@/components/ui/input'
import { Link } from '@/components/ui/link'
import { Select } from '@/components/ui/select'
import { Text } from '@/components/ui/text'
import { ChevronLeftIcon, CurrencyDollarIcon } from '@heroicons/react/16/solid'

export const metadata = {
  title: 'Edit User',
}

// JobTitle: string;
// Department: string;
// Salary: string | number;
// UserId: number;
// FirstName: string;
// LastName: string;
// Email: string;
// Gender: string;
// Active: string;
// DateHired: string;
// DateExited: string;
const page = async ({ params }) => {
  let user = await getUserFullDetails(params.id)
  const departments = await getDepartmentInfo()

  return (
    <>
      <div className="max-lg:hidden">
        <Link
          href={`/dashboard/users/${params.id}`}
          className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400"
        >
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Back to Profile
        </Link>
      </div>
      <form className="mx-auto mt-4 max-w-4xl lg:mt-8">
        <Heading>Edit {user.FirstName}&apos;s profile </Heading>
        <Divider className="my-10 mt-6" />

        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="space-y-1">
            <Subheading>Employee First Name</Subheading>
            <Text>Update the legal first name of the employee.</Text>
          </div>
          <div>
            <Input
              aria-label="Employee First Name"
              name="first_name"
              defaultValue={user.FirstName}
              placeholder="John"
            />
          </div>
        </section>
        <Divider className="my-10 mt-6" />

        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="space-y-1">
            <Subheading>Employee Last Name</Subheading>
            <Text>Update the legal last name of the employee.</Text>
          </div>
          <div>
            <Input aria-label="Employee Last Name" name="last_name" defaultValue={user.LastName} placeholder="Smith" />
          </div>
        </section>

        <Divider className="my-10" soft />

        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="space-y-1">
            <Subheading>Job Title</Subheading>
            <Text>
              Update the role or position within the organization (e.g., &quot;Software Engineer&quot; or
              &quot;Marketing Manager&quot;).
            </Text>
          </div>
          <div>
            <Input aria-label="Job Title" name="job_title" defaultValue={user.JobTitle} placeholder="Sales Associate" />
          </div>
        </section>

        <Divider className="my-10" soft />
        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="space-y-1">
            <Subheading>Department</Subheading>
            <Text>
              Update the department where the employee will be working (e.g., &quot;Engineering,&quot; &quot;HR,&quot;
              or &quot;Sales&quot;).
            </Text>
          </div>
          <DepartmentListBox departments={departments} defaultValue={user.Department} />
        </section>
        <Divider className="my-10" soft />

        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="space-y-1">
            <Subheading>Employee Email</Subheading>
            <Text>Update the official work email address for the employee.</Text>
          </div>
          <div className="space-y-4">
            <Input
              type="email"
              aria-label="Employee Email"
              name="email"
              defaultValue={user.Email}
              placeholder="johnsmith@example.com"
            />
          </div>
        </section>

        <Divider className="my-10" soft />

        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="space-y-1">
            <Subheading>Annual Salary</Subheading>
            <Text>Update the employee&apos;s yearly salary in USD</Text>
          </div>
          <InputGroup>
            <CurrencyDollarIcon className="size-5 text-stone-900 dark:text-stone-500" />
            <Input aria-label="Employee Name" name="name" defaultValue={user.Salary} placeholder="70000" />
          </InputGroup>
        </section>

        <Divider className="my-10" soft />
        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="space-y-1">
            <Subheading>Employee Status</Subheading>
            <Text>Update the current employment status for the employee.</Text>
          </div>
          <div>
            <Select
              aria-label="Employee Status"
              name="employee_status"
              defaultValue={user.Active ? 'active' : 'inactive'}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Select>
          </div>
        </section>

        <Divider className="my-10" soft />

        <div className="flex justify-end gap-4">
          <Button href={`/dashboard/users/${params.id}`} plain>
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </>
  )
}

export default page
