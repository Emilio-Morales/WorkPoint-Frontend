import BudgetAllocationChart from '@/components/metrics/BudgetAllocationChart'
import DepartmentsTable from '@/components/metrics/DepartmentsTable'
import { getDepartmentInfo } from '@/lib/mockApi.js/mockApi'
import {
  formatDepartmentsPieChartData,
  formatDepartmentsProgressBarData,
  formatDepartmentsTableData,
} from '@/lib/utils'

// {
//   name: 'India',
//   value: 50,
//   flag: <IndiaFlag />,
//   color: 'hsl(220, 25%, 65%)',
// },

// {
//   departmentName: 'India',
//   departmentBudgetShare: 50,
//   departmentIcon: <IndiaFlag />,
//   color: 'hsl(220, 25%, 65%)',
// },

// { departmentName: 'India', departmentBudget: 50000 },

export default async function BentoGrid1() {
  const test = await getDepartmentInfo()
  const testDepartment = await formatDepartmentsTableData(test)
  const testingDepartments = await getDepartmentInfo()
  const testFormat = await formatDepartmentsProgressBarData(testingDepartments)
  const testFormat2 = await formatDepartmentsPieChartData(testingDepartments)
  // console.log('formatted:', testFormat)

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
      <div className="relative rounded-lg border sm:col-span-2 sm:max-h-[80%] lg:col-span-4 lg:row-span-2 xl:col-span-3 xl:col-start-10 xl:row-span-1 xl:row-start-1 xl:max-h-full">
        <div className="relative flex h-full flex-col overflow-hidden rounded-lg border border-zinc-950/5 dark:border-white/10">
          <div className="px-8 pt-8 sm:px-10 sm:pt-10">
            <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Security</p>
            <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
              Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi.
            </p>
          </div>
          <div className="flex flex-1 items-center [container-type:inline-size] max-lg:py-6 lg:pb-2">
            <img
              className="h-[min(152px,40cqw)] object-cover object-center"
              src="https://tailwindui.com/plus/img/component-images/bento-03-security.png"
              alt=""
            />
          </div>
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
