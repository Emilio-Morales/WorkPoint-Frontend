import { Badge } from '@/components/ui/badge'
import SalaryChart from './SalaryChart'
import SalaryComparisonGauge from './SalaryComparisonGauge'
import SalaryQuartileChart from './SalaryQuartileChart'
import SalaryShareChart from './SalaryShareChart'
import SalarySharePie from './SalarySharePie'

export default function UserMetrics({
  user,
  minSalary,
  maxSalary,
  avgSalary,
  companyAverageSalary,
  departmentTotalSalary,
}) {
  const salaryDifference = user.salary - companyAverageSalary
  return (
    <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
      <div className="flex p-px lg:col-span-6 xl:col-span-4">
        <div className="w-full overflow-hidden rounded-lg border border-zinc-950/5 dark:border-white/10">
          <div className="px-8 py-10">
            <h3 className="text-sm/4 font-semibold text-zinc-500 dark:text-zinc-400">Department Salary Distribution</h3>
            <p className="mt-2 text-lg font-medium tracking-tight text-zinc-950 dark:text-white">
              Salary Standing for {user.firstName} {user.lastName} in {user.department}
            </p>
            <p className="mt-2 max-w-lg text-sm/6 text-zinc-500 dark:text-zinc-400">
              Compare {user.firstName}’s salary to the department average, minimum, and maximum.
            </p>
          </div>

          <SalaryChart
            minSalary={minSalary}
            maxSalary={maxSalary}
            avgSalary={avgSalary}
            userSalary={user.salary}
            department={user.department}
          />
        </div>
      </div>
      <div className="flex p-px lg:col-span-3 xl:col-span-2">
        <div className="w-full overflow-hidden rounded-lg border border-zinc-950/5 dark:border-white/10">
          <div className="px-8 py-10">
            <h3 className="text-sm/4 font-semibold text-zinc-500 dark:text-zinc-400">Salary Benchmark</h3>
            <p className="mt-2 text-lg font-medium tracking-tight text-zinc-950 dark:text-white">
              {user.firstName} {user.lastName} vs. Company Average
            </p>
            <Badge color={salaryDifference > 0 ? 'lime' : salaryDifference < 0 ? 'pink' : 'amber'} className="mt-4">
              {salaryDifference > 0
                ? `$${Math.abs(salaryDifference).toLocaleString()} above company average`
                : salaryDifference < 0
                  ? `$${Math.abs(salaryDifference).toLocaleString()} below company average`
                  : 'On par with company average'}
            </Badge>
          </div>
          <SalaryComparisonGauge companyAverageSalary={companyAverageSalary} userSalary={user.salary} />
        </div>
      </div>
      <div className="flex p-px lg:col-span-3 xl:col-span-2">
        <div className="w-full overflow-hidden rounded-lg border border-zinc-950/5 dark:border-white/10">
          <div className="px-8 pb-1 pt-10">
            <h3 className="text-sm/4 font-semibold text-zinc-500 dark:text-zinc-400">Department Budget Allocation</h3>
            <p className="mt-2 text-lg font-medium tracking-tight text-zinc-950 dark:text-white">
              Budget Share for {user.firstName} {user.lastName}
            </p>
            <p className="mt-2 max-w-lg text-sm/6 text-zinc-500 dark:text-zinc-400">
              See how much of the {user.department} department&apos;s salary budget is allocated to {user.firstName}
              &apos;s compensation.
            </p>
          </div>
          <div className="mx-auto mb-9 h-44 w-full max-w-80 p-4">
            <SalaryShareChart
              departmentTotalSalary={departmentTotalSalary}
              userSalary={user.salary}
              userFirstName={user.firstName}
            />
          </div>
          <div className="flex h-full max-h-36 flex-col justify-center px-8 pb-10">
            <SalarySharePie
              userSalary={user.salary}
              departmentTotalSalary={departmentTotalSalary}
              userFirstName={user.firstName}
              userDepartment={user.department}
            />
          </div>
        </div>
      </div>
      <div className="flex p-px lg:col-span-6 xl:col-span-4">
        <div className="w-full overflow-hidden rounded-lg border border-zinc-950/5 dark:border-white/10">
          <div className="px-8 py-10">
            <h3 className="text-sm/4 font-semibold text-zinc-500 dark:text-zinc-400">Salary Quartile Position</h3>
            <p className="mt-2 text-lg font-medium tracking-tight text-zinc-950 dark:text-white">
              Quartile Standing for {user.firstName} {user.lastName} in {user.department}
            </p>
            <p className="mt-2 max-w-lg text-sm/6 text-zinc-500 dark:text-zinc-400">
              Identify the salary quartile that {user.firstName} falls into within the {user.department} department.
            </p>
          </div>

          <SalaryQuartileChart userSalary={user.salary} minSalary={minSalary} maxSalary={maxSalary} />
        </div>
      </div>
    </div>
  )
}
