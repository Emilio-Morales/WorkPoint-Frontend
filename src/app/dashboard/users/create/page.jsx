import { getDepartmentsInfo } from '@/app/api/departments/actions'
import CreateUserForm from '@/components/home/users/CreateUserForm'
import { Link } from '@/components/ui/link'
import { ChevronLeftIcon } from '@heroicons/react/16/solid'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Create User',
}

export default async function CreateUser() {
  const departments = await getDepartmentsInfo()
  if (departments.status && departments.status === 401) {
    redirect('/login') // Redirect to login if unauthorized
  }

  return (
    <>
      <div className="max-lg:hidden">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400">
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Home
        </Link>
      </div>
      <CreateUserForm departments={departments} />
    </>
  )
}
