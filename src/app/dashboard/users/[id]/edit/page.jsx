import { getDepartmentInfo as getDepartmentInfoMockApi } from '@/lib/mockApi.js/mockApi'

import { getDepartmentsInfo } from '@/app/api/departments/actions'
import { fetchUser } from '@/app/api/users/actions'
import EditUserForm from '@/components/home/users/EditUserForm'
import { Link } from '@/components/ui/link'
import { ChevronLeftIcon } from '@heroicons/react/16/solid'
import { redirect } from 'next/navigation'

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
  // let user = await getUserFullDetails(params.id)
  let userBackendArray = await fetchUser(params.id)
  let user = userBackendArray[0]
  const departmentsMockApi = await getDepartmentInfoMockApi()

  let departments = await getDepartmentsInfo()

  if (departments.status && departments.status === 401) {
    redirect('/login') // Redirect to login if unauthorized
  }

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
      <EditUserForm user={user} departments={departments} />
    </>
  )
}

export default page
