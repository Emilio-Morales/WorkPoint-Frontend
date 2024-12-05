import BudgetAllocationChart from '@/components/metrics/BudgetAllocationChart'
import DepartmentGrowthPieChart from '@/components/metrics/DepartmentGrowthPieChart'
import DepartmentsTable from '@/components/metrics/DepartmentsTable'
import { getDepartmentInfo } from '@/lib/mockApi.js/mockApi'
import {
  formatDepartmentGrowthPieChartData,
  formatDepartmentsPieChartData,
  formatDepartmentsProgressBarData,
  formatDepartmentsTableData,
} from '@/lib/utils'
export default async function BentoGrid1() {
  const test = await getDepartmentInfo()
  const testDepartment = await formatDepartmentsTableData(test)
  const testingDepartments = await getDepartmentInfo()
  const testFormat = await formatDepartmentsProgressBarData(testingDepartments)
  const testFormat2 = await formatDepartmentsPieChartData(testingDepartments)
  const testFormat3 = await formatDepartmentGrowthPieChartData(testDepartment)

  return (
    <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-6 lg:grid-cols-12 lg:grid-rows-3">
      <div className="relative col-span-1 min-h-[80%] sm:col-span-6 lg:col-span-12 lg:row-span-3 xl:col-span-9">
        {/* <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]"></div> */}
        <div className="flex max-h-full flex-col rounded-lg border border-zinc-950/5 dark:border-white/10">
          {/* <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
            <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Mobile friendly</p>
            <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
            </p>
          </div>
          <div className="relative min-h-[30rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm">
            <div className="absolute inset-x-10 bottom-0 top-10 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">
              <img
                className="size-full object-cover object-top"
                src="https://tailwindui.com/plus/img/component-images/bento-03-mobile-friendly.png"
                alt=""
              />
            </div>
          </div> */}

          <DepartmentsTable rowData={testDepartment} />
        </div>
      </div>
      <div className="relative rounded-lg sm:col-span-2 sm:max-h-[80%] lg:col-span-4 lg:row-span-2 xl:col-span-3 xl:col-start-10 xl:row-span-1 xl:row-start-1 xl:max-h-full">
        <div className="relative flex h-full flex-col overflow-hidden rounded-lg border border-zinc-950/5 xl:min-h-80 dark:border-white/10">
          <div className="px-4 pt-4">
            <h3 className="text-sm/4 font-semibold text-[hsl(220,30%,6%)] dark:text-[hsl(0,0%,100%)]">
              Employees Joined by Department
            </h3>
            <p className="dark:text-zinc-400max-lg:text-center mt-2 max-w-lg text-sm/6 text-zinc-500">
              Track departmental growth in 2024, with total new hires shown at the center.
            </p>
          </div>
          <div className="flex h-full max-h-64 flex-col justify-center">
            <DepartmentGrowthPieChart pieChartData={testFormat3} />
          </div>

          {/* <div className="flex flex-1 items-center [container-type:inline-size] max-lg:py-6 lg:pb-2"></div> */}
        </div>
      </div>
      <div className="relative sm:col-span-4 sm:max-h-[80%] lg:col-span-8 lg:row-span-2 xl:col-span-3">
        <div className="relative flex h-full flex-col overflow-hidden rounded-lg border border-zinc-950/5 dark:border-white/10">
          {/* <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
            <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Powerful APIs</p>
            <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
              Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget sem sodales gravida.
            </p>
          </div>
          <div className="relative min-h-[30rem] w-full grow">
            <div className="absolute bottom-0 left-10 right-0 top-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl">
              <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                <div className="-mb-px flex text-sm/6 font-medium text-gray-400">
                  <div className="border-b border-r border-b-white/20 border-r-white/10 bg-white/5 px-4 py-2 text-white">
                    NotificationSetting.jsx
                  </div>
                  <div className="border-r border-gray-600/10 px-4 py-2">App.jsx</div>
                </div>
              </div>
              <div className="px-6 pb-14 pt-6">public static void main (String[] args, int double) </div>
            </div>
          </div> */}
          <BudgetAllocationChart departments={testFormat} pieChartData={testFormat2} />
        </div>
      </div>
    </div>
  )
}
