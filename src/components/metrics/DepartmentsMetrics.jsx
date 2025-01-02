import { getDepartmentsInfo } from '@/app/api/departments/actions'
import DepartmentsTable from '@/components/metrics/DepartmentsTable'
import { getDepartmentInfo } from '@/lib/mockApi.js/mockApi'
import {
  formatDepartmentGrowthPieChartData,
  formatDepartmentGrowthPieChartDataMockApi,
  formatDepartmentsPieChartData,
  formatDepartmentsPieChartDataMockApi,
  formatDepartmentsProgressBarData,
  formatDepartmentsProgressBarDataMockApi,
  formatDepartmentsTableData,
  formatDepartmentsTableDataMockApi,
} from '@/lib/utils'
import { redirect } from 'next/navigation'
import BudgetAllocationChart from './BudgetAllocationChart'
import DepartmentGrowthPieChart from './DepartmentGrowthPieChart'
export default async function DepartmentsMetrics() {
  const departmentsDataMockApi = await getDepartmentInfo()
  const departmentsData = await getDepartmentsInfo()

  if (departmentsData.status && departmentsData.status === 401) {
    redirect('/login') // Redirect to login if unauthorized
  }

  const departmentTableDataMockApi = await formatDepartmentsTableDataMockApi(departmentsDataMockApi)
  const departmentTableData = await formatDepartmentsTableData(departmentsData)

  const departmentsProgressBarDataMockApi = await formatDepartmentsProgressBarDataMockApi(departmentsDataMockApi)
  const departmentsProgressBarData = await formatDepartmentsProgressBarData(departmentsData)

  const departmentsPieChartDataMockApi = await formatDepartmentsPieChartDataMockApi(departmentsDataMockApi)
  const departmentsPieChartData = await formatDepartmentsPieChartData(departmentsData)

  const departmentsGrowthPieChartDataMockApi =
    await formatDepartmentGrowthPieChartDataMockApi(departmentTableDataMockApi)
  const departmentsGrowthPieChartData = await formatDepartmentGrowthPieChartData(departmentTableData)

  return (
    <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-6 xl:grid-cols-12">
      <div className="relative col-span-1 sm:col-span-6 xl:col-span-9">
        <div className="flex h-full flex-col rounded-lg border border-zinc-950/5 dark:border-white/10">
          <DepartmentsTable rowData={departmentTableData} />
        </div>
      </div>
      <div className="relative sm:col-span-6 xl:col-span-3 xl:col-start-10 xl:row-span-1 xl:max-h-full">
        <div className="relative flex h-full flex-col gap-4 overflow-hidden rounded-lg sm:max-h-[26rem] sm:flex-row sm:justify-between lg:max-h-full xl:min-h-80 xl:flex-col">
          <div className="relative flex h-full flex-col overflow-hidden rounded-lg border border-zinc-950/5 sm:basis-2/4 xl:basis-2/3 dark:border-white/10">
            <div className="rounded-lg px-4 pt-4">
              <h3 className="text-sm/4 font-semibold text-[hsl(220,30%,6%)] dark:text-[hsl(0,0%,100%)]">
                Employees Joined by Department
              </h3>
              <p className="mt-2 max-w-lg text-sm/6 text-zinc-500 max-lg:text-left dark:text-zinc-400">
                Track departmental growth in 2024, with total new hires shown at the center.
              </p>
            </div>
            <div className="flex h-full max-h-64 flex-col justify-center">
              <DepartmentGrowthPieChart pieChartData={departmentsGrowthPieChartData} />
            </div>
          </div>
          <div className="relative flex h-full flex-col overflow-hidden rounded-lg border border-zinc-950/5 sm:basis-1/2 xl:basis-auto dark:border-white/10">
            <BudgetAllocationChart departments={departmentsProgressBarData} pieChartData={departmentsPieChartData} />
          </div>
        </div>
      </div>
    </div>
  )
}
