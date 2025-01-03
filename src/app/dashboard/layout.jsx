import { ApplicationLayout } from './application-layout'

export const metadata = {
  title: {
    template: '%s - WorkPoint',
    default: 'WorkPoint',
  },
  description: '',
}

export default async function Layout({ children }) {
  return <ApplicationLayout>{children}</ApplicationLayout>
}
