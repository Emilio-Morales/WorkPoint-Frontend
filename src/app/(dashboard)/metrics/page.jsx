import BentoGrid1 from '@/components/home/users/BentoGrid1'
import EmployeeAndBudgetMetrics from '@/components/metrics/EmployeeAndBudgetMetrics'
import { Heading } from '@/components/ui/heading'

export default async function Metrics() {
  return (
    <div className="">
      <Heading>Company Metrics Dashboard</Heading>
      <EmployeeAndBudgetMetrics />
      <BentoGrid1 />
    </div>
  )
}
