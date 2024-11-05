import { Badge } from '@/components/ui/badge'
import SalaryChart from './SalaryChart'
import SalaryComparisonGauge from './SalaryComparisonGauge'

export default function BentoGrid2({ user, minSalary, maxSalary, avgSalary, companyAverageSalary }) {
  const salaryDifference = user.Salary - companyAverageSalary

  return (
    <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
      <div className="flex p-px lg:col-span-6 xl:col-span-4">
        <div className="w-full overflow-hidden rounded-lg border border-zinc-950/5 dark:border-white/10">
          <div className="px-8 py-10">
            <h3 className="text-sm/4 font-semibold text-zinc-500 dark:text-zinc-400">Department Salary Distribution</h3>
            <p className="mt-2 text-lg font-medium tracking-tight text-zinc-950 dark:text-white">
              Salary Standing for {user.FirstName} {user.LastName} in {user.Department}
            </p>
            <p className="mt-2 max-w-lg text-sm/6 text-zinc-500 dark:text-zinc-400">
              Compare {user.FirstName}’s salary to the department average, minimum, and maximum
            </p>
          </div>

          <SalaryChart
            minSalary={minSalary}
            maxSalary={maxSalary}
            avgSalary={avgSalary}
            userSalary={user.Salary}
            department={user.Department}
          />
        </div>
      </div>
      <div className="flex p-px lg:col-span-3 xl:col-span-2">
        <div className="w-full overflow-hidden rounded-lg border border-zinc-950/5 dark:border-white/10">
          <div className="px-8 py-10">
            <h3 className="text-sm/4 font-semibold text-zinc-500 dark:text-zinc-400">Salary Benchmark</h3>
            <p className="mt-2 text-lg font-medium tracking-tight text-zinc-950 dark:text-white">
              {user.FirstName} {user.LastName} vs. Company Average
            </p>
            <Badge color={salaryDifference > 0 ? 'lime' : salaryDifference < 0 ? 'pink' : 'amber'} className="mt-4">
              {salaryDifference > 0
                ? `$${Math.abs(salaryDifference).toLocaleString()} above company average`
                : salaryDifference < 0
                  ? `$${Math.abs(salaryDifference).toLocaleString()} below company average`
                  : 'On par with company average'}
            </Badge>
          </div>
          <SalaryComparisonGauge companyAverageSalary={companyAverageSalary} userSalary={user.Salary} />
          {/* <img
            alt=""
            src="https://tailwindui.com/plus/img/component-images/bento-02-integrations.png"
            className="h-80 object-cover object-center"
          /> */}
        </div>
      </div>
      <div className="flex p-px lg:col-span-3 xl:col-span-2">
        <div className="overflow-hidden rounded-lg bg-gray-800 ring-1 ring-white/15">
          <img
            alt=""
            src="https://tailwindui.com/plus/img/component-images/bento-02-security.png"
            className="h-80 object-cover object-center"
          />
          <div className="p-10">
            <h3 className="text-sm/4 font-semibold text-gray-400">Security</h3>
            <p className="mt-2 text-lg font-medium tracking-tight text-white">Advanced access control</p>
            <p className="mt-2 max-w-lg text-sm/6 text-gray-400">
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia.
            </p>
          </div>
        </div>
      </div>
      <div className="flex p-px lg:col-span-6 xl:col-span-4">
        <div className="w-full overflow-hidden rounded-lg bg-gray-800 ring-1 ring-white/15">
          <img
            alt=""
            src="https://tailwindui.com/plus/img/component-images/bento-02-performance.png"
            className="h-80 object-cover object-left"
          />
          <div className="p-10">
            <h3 className="text-sm/4 font-semibold text-gray-400">Performance</h3>
            <p className="mt-2 text-lg font-medium tracking-tight text-white">Lightning-fast builds</p>
            <p className="mt-2 max-w-lg text-sm/6 text-gray-400">
              Sed congue eros non finibus molestie. Vestibulum euismod augue vel commodo vulputate. Maecenas at augue
              sed elit dictum vulputate.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
