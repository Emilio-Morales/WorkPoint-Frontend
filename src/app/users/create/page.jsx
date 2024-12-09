import { DepartmentListBox } from '@/app/settings/departmentListBox'
import { Button } from '@/components/ui/button'
import { Divider } from '@/components/ui/divider'
import { Heading, Subheading } from '@/components/ui/heading'
import { Input } from '@/components/ui/input'
import { Link } from '@/components/ui/link'
import { Select } from '@/components/ui/select'
import { Text } from '@/components/ui/text'
import { getDepartmentInfo } from '@/lib/mockApi.js/mockApi'
import { ChevronLeftIcon } from '@heroicons/react/16/solid'

export const metadata = {
  title: 'Create User',
}

export default async function CreateUser() {
  const departments = await getDepartmentInfo()

  return (
    <>
      <div className="max-lg:hidden">
        <Link href="/" className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400">
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Home
        </Link>
      </div>
      <form className="mx-auto mt-4 max-w-4xl lg:mt-8">
        <Heading>New Employee</Heading>
        <Divider className="my-10 mt-6" />

        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="space-y-1">
            <Subheading>Employee Name</Subheading>
            <Text>Please enter the full legal name of the employee.</Text>
          </div>
          <div>
            <Input aria-label="Employee Name" name="name" defaultValue="" placeholder="John Smith" />
          </div>
        </section>

        <Divider className="my-10" soft />

        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="space-y-1">
            <Subheading>Job Title</Subheading>
            <Text>
              Specify the role or position within the organization (e.g., "Software Engineer" or "Marketing Manager").
            </Text>
          </div>
          <div>
            <Input aria-label="Job Title" name="bio" placeholder="Sales Associate" />
          </div>
        </section>

        <Divider className="my-10" soft />
        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="space-y-1">
            <Subheading>Department</Subheading>
            <Text>
              Select the department where the employee will be working (e.g., "Engineering," "HR," or "Sales").
            </Text>
          </div>
          <DepartmentListBox departments={departments} />
        </section>
        <Divider className="my-10" soft />

        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="space-y-1">
            <Subheading>Employee Email</Subheading>
            <Text>Enter the official work email address for the employee.</Text>
          </div>
          <div className="space-y-4">
            <Input
              type="email"
              aria-label="Employee Email"
              name="email"
              defaultValue=""
              placeholder="johnsmith@example.com"
            />
          </div>
        </section>

        <Divider className="my-10" soft />

        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="space-y-1">
            <Subheading>Currency</Subheading>
            <Text>The currency that your organization will be collecting.</Text>
          </div>
          <div>
            <Select aria-label="Currency" name="currency" defaultValue="cad">
              <option value="cad">CAD - Canadian Dollar</option>
              <option value="usd">USD - United States Dollar</option>
            </Select>
          </div>
        </section>

        <Divider className="my-10" soft />

        <div className="flex justify-end gap-4">
          {/* <Button type="reset" plain>
          Cancel
        </Button> */}
          <Button type="submit">Add</Button>
        </div>
      </form>
    </>
  )
}
