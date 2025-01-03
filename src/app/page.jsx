'use client'

import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function HomePage() {
  // Hydration error fix
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'

  return (
    <>
      {isClient ? (
        <div className="bg-white dark:bg-zinc-950">
          <div className="relative isolate">
            {!isDarkMode && (
              <svg
                aria-hidden="true"
                className="absolute inset-0 -z-10 size-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
              >
                <defs>
                  <pattern
                    x="50%"
                    y={-1}
                    id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                    width={200}
                    height={200}
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M100 200V.5M.5 .5H200" fill="none" />
                  </pattern>
                </defs>
                <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
                  <path
                    d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                    strokeWidth={0}
                  />
                </svg>
                <rect fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" width="100%" height="100%" strokeWidth={0} />
              </svg>
            )}
            {isDarkMode && (
              <>
                <svg
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 size-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                >
                  <defs>
                    <pattern
                      x="50%"
                      y={-1}
                      id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
                      width={200}
                      height={200}
                      patternUnits="userSpaceOnUse"
                    >
                      <path d="M.5 200V.5H200" fill="none" />
                    </pattern>
                  </defs>
                  <svg x="50%" y={-1} className="overflow-visible fill-gray-800/20">
                    <path
                      d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                      strokeWidth={0}
                    />
                  </svg>
                  <rect fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)" width="100%" height="100%" strokeWidth={0} />
                </svg>
                <div
                  aria-hidden="true"
                  className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
                >
                  <div
                    style={{
                      clipPath:
                        'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
                    }}
                    className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-stone-500 opacity-20"
                  />
                </div>
              </>
            )}
            <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
                <h1 className="mt-10 text-pretty text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl dark:text-white">
                  Your Organization, Simplified
                </h1>
                <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8 dark:text-stone-500">
                  WorkPoint brings clarity to enterprise management. Track budgets, monitor employee activity, and
                  analyze key metrics—all in one intuitive platform. From company-wide overviews to department-specific
                  insights, WorkPoint empowers you to make informed decisions with ease.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Button href="/login">Get started</Button>
                  <Button href="https://emiliomoralesportfolio.com/" target="_blank" className="" plain>
                    Learn more <span aria-hidden="true">→</span>
                  </Button>
                </div>
              </div>
              <div className="mt-16 sm:mt-24 lg:mt-0 lg:shrink-0 lg:grow">
                <svg role="img" viewBox="0 0 366 729" className="mx-auto w-[22.875rem] max-w-full drop-shadow-xl">
                  <title>App screenshot</title>
                  <defs>
                    <clipPath id="2ade4387-9c63-4fc4-b754-10e687a0d332">
                      <rect rx={36} width={316} height={684} />
                    </clipPath>
                  </defs>
                  <path
                    d="M363.315 64.213C363.315 22.99 341.312 1 300.092 1H66.751C25.53 1 3.528 22.99 3.528 64.213v44.68l-.857.143A2 2 0 0 0 1 111.009v24.611a2 2 0 0 0 1.671 1.973l.95.158a2.26 2.26 0 0 1-.093.236v26.173c.212.1.398.296.541.643l-1.398.233A2 2 0 0 0 1 167.009v47.611a2 2 0 0 0 1.671 1.973l1.368.228c-.139.319-.314.533-.511.653v16.637c.221.104.414.313.56.689l-1.417.236A2 2 0 0 0 1 237.009v47.611a2 2 0 0 0 1.671 1.973l1.347.225c-.135.294-.302.493-.49.607v377.681c0 41.213 22 63.208 63.223 63.208h95.074c.947-.504 2.717-.843 4.745-.843l.141.001h.194l.086-.001 33.704.005c1.849.043 3.442.37 4.323.838h95.074c41.222 0 63.223-21.999 63.223-63.212v-394.63c-.259-.275-.48-.796-.63-1.47l-.011-.133 1.655-.276A2 2 0 0 0 366 266.62v-77.611a2 2 0 0 0-1.671-1.973l-1.712-.285c.148-.839.396-1.491.698-1.811V64.213Z"
                    fill="#4B5563"
                  />
                  <path
                    d="M16 59c0-23.748 19.252-43 43-43h246c23.748 0 43 19.252 43 43v615c0 23.196-18.804 42-42 42H58c-23.196 0-42-18.804-42-42V59Z"
                    fill="#343E4E"
                  />
                  <foreignObject
                    width={316}
                    height={684}
                    clipPath="url(#2ade4387-9c63-4fc4-b754-10e687a0d332)"
                    transform="translate(24 24)"
                  >
                    <img
                      alt="Image of metrics view on dashboard"
                      src={isDarkMode ? '/dashboardMobileLight.png' : '/dashboardMobile.png'}
                    />
                  </foreignObject>
                </svg>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>Loading...</>
      )}
    </>
  )
}
