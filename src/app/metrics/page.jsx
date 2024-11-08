import BentoGrid1 from '@/components/home/users/BentoGrid1'
import BentoGrid3 from '@/components/home/users/BentoGrid3'

export default async function Metrics() {
  return (
    <div className="">
      {/* <div className="flex h-screen items-center justify-center text-7xl">The Nigga Page.</div> */}
      <BentoGrid3 />
      <BentoGrid1 />
    </div>
  )
}
