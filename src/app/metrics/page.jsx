import BentoGrid1 from '@/components/home/users/BentoGrid1'
import BentoGrid3 from '@/components/home/users/BentoGrid3'
import { Heading } from '@/components/ui/heading'

export default async function Metrics() {
  return (
    <div className="">
      <Heading>Company Metrics Dashboard</Heading>

      <BentoGrid3 />
      <BentoGrid1 />
    </div>
  )
}
