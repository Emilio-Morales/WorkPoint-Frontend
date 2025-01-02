import DepartmentsMetrics from '@/components/metrics/DepartmentsMetrics'
import EmployeeAndBudgetMetrics from '@/components/metrics/EmployeeAndBudgetMetrics'
import { Heading } from '@/components/ui/heading'

export default async function Metrics() {
  return (
    <div className="">
      <Heading>Company Metrics Dashboard</Heading>
      <EmployeeAndBudgetMetrics />
      <DepartmentsMetrics />
    </div>
  )
}
