import SessionsChart from '@/components/metrics/BudgetLineChart'
import StatCard from '@/components/metrics/TestGraph'
import {
  getActiveEmployeeBudgetByMonth,
  getExitedEmployeeBudgetByMonth,
  getTotalBudgetByMonth,
  getUsersJoinedByMonth,
  getUsersLeftByMonth,
} from '@/lib/mockApi.js/mockApi'

export default async function BentoGrid3() {
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

  // console.log('totalBudgets2024', totalBudgets2024)
  // console.log('totalActiveBudgets2024', totalActiveBudgets2024)
  // console.log('totalInactiveBudgets2024', totalInactiveBudgets2024)

  return (
    <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-12">
      <div className="relative lg:col-span-6 xl:col-span-3 xl:w-full xl:max-w-72">
        {/* <div className="absolute inset-px rounded-lg border border-zinc-950/5 dark:border-white/10" /> */}
        <div className="relative flex h-fit flex-col overflow-hidden">
          {/* title, value, interval, trend, data */}
          <StatCard
            title="Employees Joined"
            value={totalJoined2024}
            interval="2024"
            trend="up"
            data={usersJoined2024.monthlyData}
            rate={joinedPercentage2024}
          />
          {/* <EmployeesJoinedLineGraph /> */}
        </div>
      </div>
      <div className="relative lg:col-span-6 xl:col-span-3 xl:w-full xl:max-w-72">
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
      <div className="relative lg:col-span-6 xl:col-span-3 xl:w-full xl:max-w-72">
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
      <div className="relative lg:col-span-6 xl:col-span-3 xl:w-full xl:max-w-72">
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
      <div className="relative lg:col-span-6 xl:col-span-6">
        <div className="absolute inset-px rounded-lg border border-zinc-950/5 dark:border-white/10" />
        <div className="relative flex h-full flex-col overflow-hidden">
          <SessionsChart
            totalBudget={totalBudgets2024}
            totalActiveBudget={totalActiveBudgets2024}
            totalInactiveBudget={totalInactiveBudgets2024}
          />
          {/* <div className="p-10 pt-4">
            <h3 className="text-sm/4 font-semibold text-indigo-600">Network</h3>
            <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">Globally distributed CDN</p>
            <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
              Aenean vulputate justo commodo auctor vehicula in malesuada semper.
            </p>
          </div> */}
        </div>
        <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
      </div>
      <div className="relative lg:col-span-6">
        <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]">
          <img
            alt=""
            src="https://tailwindui.com/plus/img/component-images/bento-01-performance.png"
            className="h-80 object-cover object-left"
          />
          <div className="p-10 pt-4">
            <h3 className="text-sm/4 font-semibold text-indigo-600">Performance</h3>
            <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">Lightning-fast builds</p>
            <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida justo et nulla efficitur, maximus
              egestas sem pellentesque.
            </p>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
      </div>
      <div className="relative lg:col-span-6">
        <div className="absolute inset-px rounded-lg bg-white lg:rounded-tr-[2rem]" />
        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-tr-[calc(2rem+1px)]">
          <img
            alt=""
            src="https://tailwindui.com/plus/img/component-images/bento-01-releases.png"
            className="h-80 object-cover object-left lg:object-right"
          />
          <div className="p-10 pt-4">
            <h3 className="text-sm/4 font-semibold text-indigo-600">Releases</h3>
            <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">Push to deploy</p>
            <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
              Curabitur auctor, ex quis auctor venenatis, eros arcu rhoncus massa, laoreet dapibus ex elit vitae odio.
            </p>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-tr-[2rem]" />
      </div>
    </div>
  )
}
