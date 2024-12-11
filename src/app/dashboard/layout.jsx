import { getEvents } from '@/data'

import { ApplicationLayout } from './application-layout'

export const metadata = {
  title: {
    template: '%s - WorkPoint',
    default: 'WorkPoint',
  },
  description: '',
}

export default async function Layout({ children }) {
  let events = await getEvents()

  return <ApplicationLayout events={events}>{children}</ApplicationLayout>
}
