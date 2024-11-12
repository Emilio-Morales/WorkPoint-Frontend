'use client'
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/16/solid'
import { Avatar } from '../ui/avatar'
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownHeading,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
  DropdownSection,
} from '../ui/dropdown'
import { SidebarHeader, SidebarItem, SidebarLabel } from '../ui/sidebar'

const ApplicationLayoutHeader = () => {
  return (
    <SidebarHeader>
      <Dropdown>
        <DropdownButton as={SidebarItem}>
          <Avatar src="/teams/catalyst.svg" />
          <SidebarLabel>WorkPoint</SidebarLabel>
          <ChevronDownIcon />
        </DropdownButton>
        <DropdownMenu className="min-w-80 lg:min-w-64" anchor="bottom start">
          {/* <DropdownItem> */}
          {/* <Cog8ToothIcon /> */}
          {/* <DropdownLabel>Admins</DropdownLabel> */}
          {/* </DropdownItem> */}
          <DropdownSection>
            <DropdownHeading>Admins</DropdownHeading>
            {/* <DropdownDivider /> */}
            <DropdownItem href="#">
              <Avatar slot="icon" src="/teams/catalyst.svg" />
              <DropdownLabel>WorkPoint</DropdownLabel>
            </DropdownItem>
            <DropdownItem href="#">
              <Avatar slot="icon" initials="BE" className="bg-purple-500 text-white" />
              <DropdownLabel>Big Events</DropdownLabel>
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem href="#">
              <PlusIcon />
              <DropdownLabel>New admin&hellip;</DropdownLabel>
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </SidebarHeader>
  )
}

export default ApplicationLayoutHeader
