import BudgetLineChart from '@/components/metrics/BudgetLineChart'
import BudgetRateOfChangeChart from '@/components/metrics/BudgetRateOfChange'
import StatCard from '@/components/metrics/StatCard'
import { Divider } from '@/components/ui/divider'
import { Subheading } from '@/components/ui/heading'
import {
  getActiveEmployeeBudgetByMonth,
  getExitedEmployeeBudgetByMonth,
  getTotalBudgetByMonth,
  getUsersJoinedByMonth,
  getUsersLeftByMonth,
} from '@/lib/mockApi.js/mockApi'

export default async function EmployeeAndBudgetMetrics() {
  const usersJoined2024 = await getUsersJoinedByMonth(2024)
  const usersLeft2024 = await getUsersLeftByMonth(2024)

  const totalJoined2024 = usersJoined2024.totalEmployeesJoined
  const totalLeft2024 = usersLeft2024.totalEmployeesLeft
  const totalEmployees2024 = usersJoined2024.totalEmployees

  const joinedPercentage2024 = ((totalJoined2024 / totalEmployees2024) * 100).toFixed(2)
  const exitedPercentage2024 = ((totalLeft2024 / totalEmployees2024) * 100).toFixed(2)

  const usersJoined2023 = await getUsersJoinedByMonth(2023)
  const usersLeft2023 = await getUsersLeftByMonth(2023)

  const totalJoined2023 = usersJoined2023.totalEmployeesJoined
  const totalLeft2023 = usersLeft2023.totalEmployeesLeft
  const totalEmployees2023 = usersJoined2023.totalEmployees

  const joinedPercentage2023 = ((totalJoined2023 / totalEmployees2023) * 100).toFixed(2)
  const exitedPercentage2023 = ((totalLeft2023 / totalEmployees2023) * 100).toFixed(2)

  const totalBudgets2024 = await getTotalBudgetByMonth(2024)
  const totalActiveBudgets2024 = await getActiveEmployeeBudgetByMonth(2024)
  const totalInactiveBudgets2024 = await getExitedEmployeeBudgetByMonth(2024)

  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-12">
      <div className="col-span-full">
        <Subheading>Comprehensive Analytics for Workforce and Budget Performance</Subheading>
        <Divider className="mt-4" />
      </div>
      <div className="relative w-full sm:col-span-6 xl:col-span-3 xl:max-w-72">
        <div className="relative flex h-fit flex-col overflow-hidden">
          <StatCard
            title="Employees Joined"
            value={totalJoined2024}
            interval="2024"
            trend="up"
            data={usersJoined2024.monthlyData}
            rate={joinedPercentage2024}
          />
        </div>
      </div>
      <div className="relative sm:col-span-6 xl:col-span-3 xl:w-full xl:max-w-72">
        <div className="relative flex h-fit flex-col overflow-hidden">
          <StatCard
            title="Employees Exited"
            value={totalLeft2024}
            interval="2024"
            trend="down"
            data={usersLeft2024.monthlyData}
            rate={exitedPercentage2024}
          />
        </div>
      </div>
      <div className="relative sm:col-span-6 xl:col-span-3 xl:w-full xl:max-w-72">
        <div className="relative flex h-fit flex-col overflow-hidden">
          <StatCard
            title="Employees Joined"
            value={totalJoined2023}
            interval="2023"
            trend="up"
            data={usersJoined2023.monthlyData}
            rate={joinedPercentage2023}
          />
        </div>
      </div>
      <div className="relative sm:col-span-6 xl:col-span-3 xl:w-full xl:max-w-72">
        <div className="relative flex h-fit flex-col overflow-hidden">
          <StatCard
            title="Employees Exited"
            value={totalLeft2023}
            interval="2023"
            trend="down"
            data={usersLeft2023.monthlyData}
            rate={exitedPercentage2023}
          />
        </div>
      </div>
      <div className="relative order-1 sm:col-span-12 lg:col-span-6 xl:order-none xl:col-span-4">
        <div className="absolute inset-px rounded-lg border border-zinc-950/5 dark:border-white/10" />
        <div className="relative flex h-full flex-col overflow-hidden">
          <BudgetLineChart
            budgets={{
              totalActiveBudget: totalActiveBudgets2024,
              totalInactiveBudget: totalInactiveBudgets2024,
              totalBudget: totalBudgets2024,
            }}
            heading="Monthly Active vs Inactive Salary Utilization"
            description="Allocated to total Salary Budget in 2024"
            variant="activeVsInactive"
            metricType="neutral"
          />
        </div>
      </div>
      <div className="relative order-3 sm:col-span-12 lg:col-span-6 xl:order-none xl:col-span-4">
        <div className="absolute inset-px rounded-lg border border-zinc-950/5 dark:border-white/10" />
        <div className="relative flex h-full flex-col overflow-hidden">
          <BudgetLineChart
            budgets={{
              totalBudget: totalBudgets2024,
              totalActiveBudget: totalActiveBudgets2024,
            }}
            heading="Monthly Active vs Total Salary Utilization"
            description="Allocated to active employees Salary Budget in 2024"
            variant="totalVsActive"
            metricType="good"
          />
        </div>
      </div>
      <div className="relative order-5 sm:col-span-12 lg:col-span-6 xl:order-none xl:col-span-4">
        <div className="absolute inset-px rounded-lg border border-zinc-950/5 dark:border-white/10" />
        <div className="relative flex h-full flex-col overflow-hidden">
          <BudgetLineChart
            budgets={{
              totalBudget: totalBudgets2024,
              totalInactiveBudget: totalInactiveBudgets2024,
            }}
            heading="Monthly Inactive vs Total Salary Utilization"
            description="Allocated to inactive employees Salary Budget in 2024"
            variant="totalVsInactive"
            metricType="bad"
          />
        </div>
      </div>
      <div className="relative order-2 sm:col-span-12 lg:col-span-6 xl:order-none xl:col-span-4">
        <div className="absolute inset-px rounded-lg border border-zinc-950/5 dark:border-white/10" />
        <div className="relative flex h-full flex-col overflow-hidden">
          <BudgetRateOfChangeChart
            budgets={{
              totalBudget: totalBudgets2024,
            }}
            heading="Monthly Total Budget Change"
            description="Total net change in employee budget allocation across all months in 2024"
            variant="activeVsInactive"
            metricType="neutral"
          />
        </div>
      </div>
      <div className="relative order-4 sm:col-span-12 lg:col-span-6 xl:order-none xl:col-span-4">
        <div className="absolute inset-px rounded-lg border border-zinc-950/5 dark:border-white/10" />
        <div className="relative flex h-full flex-col overflow-hidden">
          <BudgetRateOfChangeChart
            budgets={{
              totalActiveBudget: totalActiveBudgets2024,
            }}
            heading="Monthly Active Employee Budget Change"
            description="Total net change in active employee budget allocation across all months in 2024"
            variant="totalVsActive"
            metricType="good"
          />
        </div>
      </div>
      <div className="relative order-6 sm:col-span-12 lg:col-span-6 xl:order-none xl:col-span-4">
        <div className="absolute inset-px rounded-lg border border-zinc-950/5 dark:border-white/10" />
        <div className="relative flex h-full flex-col overflow-hidden">
          <BudgetRateOfChangeChart
            budgets={{
              totalInactiveBudget: totalInactiveBudgets2024,
            }}
            heading="Monthly Inactive Employee Budget Change"
            description="Total net change in inactive employee budget allocation across all months in 2024"
            variant="totalVsInactive"
            metricType="bad"
          />
        </div>
      </div>
    </div>
  )
}
