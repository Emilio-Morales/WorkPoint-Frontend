import StatCard from '@/components/metrics/TestGraph'

export default function BentoGrid3() {
  return (
    <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
      <div className="relative lg:col-span-3 xl:col-span-2">
        <div className="absolute inset-px rounded-lg border border-zinc-950/5 dark:border-white/10" />
        <div className="relative flex h-fit flex-col overflow-hidden">
          {/* <img
            alt=""
            src="https://tailwindui.com/plus/img/component-images/bento-01-speed.png"
            className="h-80 object-cover object-left"
            /> */}
          {/* <div className="p-10 pt-4">
            <h3 className="text-sm/4 font-semibold text-indigo-600">Speed</h3>
            <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">Built for power users</p>
            <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
              Sed congue eros non finibus molestie. Vestibulum euismod augue.
            </p>
          </div> */}
          {/* title, value, interval, trend, data */}
          <StatCard
            title="Employees Joined"
            value="23k"
            interval="Last year"
            trend="up"
            data={[200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340]}
          />
          {/* <EmployeesJoinedLineGraph /> */}
        </div>
        {/* <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-bl-[2rem]" /> */}
      </div>
      <div className="relative lg:col-span-3 xl:col-span-2">
        <div className="absolute inset-px rounded-lg bg-white" />
        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
          <img
            alt=""
            src="https://tailwindui.com/plus/img/component-images/bento-01-integrations.png"
            className="h-80 object-cover object-center"
          />
          <div className="p-10 pt-4">
            <h3 className="text-sm/4 font-semibold text-indigo-600">Integrations</h3>
            <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">Connect your favorite tools</p>
            <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
              Maecenas at augue sed elit dictum vulputate, in nisi aliquam maximus arcu.
            </p>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5" />
      </div>
      <div className="relative lg:col-span-3 xl:col-span-2">
        <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-br-[calc(2rem+1px)]">
          <img
            alt=""
            src="https://tailwindui.com/plus/img/component-images/bento-01-network.png"
            className="h-80 object-cover object-center"
          />
          <div className="p-10 pt-4">
            <h3 className="text-sm/4 font-semibold text-indigo-600">Network</h3>
            <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">Globally distributed CDN</p>
            <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
              Aenean vulputate justo commodo auctor vehicula in malesuada semper.
            </p>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
      </div>
      <div className="relative lg:col-span-3">
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
      <div className="relative lg:col-span-3">
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
