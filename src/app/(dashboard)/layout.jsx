import { getEvents } from '@/data'
import '@/styles/tailwind.css'

import { ApplicationLayout } from './application-layout'
import Providers from './providers'

export const metadata = {
  title: {
    template: '%s - WorkPoint',
    default: 'WorkPoint',
  },
  description: '',
}

export default async function Layout({ children }) {
  let events = await getEvents()

  return (
    <Providers attribute="class" defaultTheme="system" enableSystem>
      <ApplicationLayout events={events}>{children}</ApplicationLayout>
    </Providers>
  )
}
