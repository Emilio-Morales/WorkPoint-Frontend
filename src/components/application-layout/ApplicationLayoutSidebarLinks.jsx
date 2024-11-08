'use client'
import { BuildingOffice2Icon, Cog6ToothIcon, HomeIcon, PresentationChartLineIcon } from '@heroicons/react/16/solid'
import { usePathname } from 'next/navigation'
import { SidebarItem, SidebarLabel, SidebarSection } from '../ui/sidebar'

const ApplicationLayoutSidebarLinks = () => {
  let pathname = usePathname()

  return (
    <SidebarSection>
      <SidebarItem href="/" current={pathname === '/'}>
        <HomeIcon />
        <SidebarLabel>Home</SidebarLabel>
      </SidebarItem>
      <SidebarItem href="/departments" current={pathname.startsWith('/departments')}>
        <BuildingOffice2Icon />
        <SidebarLabel>Departments</SidebarLabel>
      </SidebarItem>
      <SidebarItem href="/metrics" current={pathname.startsWith('/metrics')}>
        <PresentationChartLineIcon />
        <SidebarLabel>Metrics</SidebarLabel>
      </SidebarItem>
      <SidebarItem href="/settings" current={pathname.startsWith('/settings')}>
        <Cog6ToothIcon />
        <SidebarLabel>Settings</SidebarLabel>
      </SidebarItem>
    </SidebarSection>
  )
}

export default ApplicationLayoutSidebarLinks
