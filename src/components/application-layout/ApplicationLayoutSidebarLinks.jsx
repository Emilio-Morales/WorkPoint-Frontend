'use client'
import { BuildingOffice2Icon, Cog6ToothIcon, HomeIcon, PresentationChartLineIcon } from '@heroicons/react/16/solid'
import { usePathname } from 'next/navigation'
import { SidebarItem, SidebarLabel, SidebarSection } from '../ui/sidebar'

const ApplicationLayoutSidebarLinks = () => {
  let pathname = usePathname()

  return (
    <SidebarSection>
      <SidebarItem href="/dashboard" current={pathname === '/dashboard'}>
        <HomeIcon />
        <SidebarLabel>Home</SidebarLabel>
      </SidebarItem>
      <SidebarItem href="/dashboard/departments" current={pathname.startsWith('/dashboard/departments')}>
        <BuildingOffice2Icon />
        <SidebarLabel>Departments</SidebarLabel>
      </SidebarItem>
      <SidebarItem href="/dashboard/metrics" current={pathname.startsWith('/dashboard/metrics')}>
        <PresentationChartLineIcon />
        <SidebarLabel>Metrics</SidebarLabel>
      </SidebarItem>
      <SidebarItem href="/dashboard/settings" current={pathname.startsWith('/dashboard/settings')}>
        <Cog6ToothIcon />
        <SidebarLabel>Settings</SidebarLabel>
      </SidebarItem>
    </SidebarSection>
  )
}

export default ApplicationLayoutSidebarLinks
