'use client'
import { logoutUser } from '@/app/api/auth/actions'
import { DropdownItem, DropdownLabel, DropdownMenu } from '@/components/ui/dropdown'
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/16/solid'
import toast from 'react-hot-toast'

export function AccountDropdownMenu({ anchor }) {
  const signOut = async () => {
    try {
      const response = await logoutUser()
      if (response.success) toast.success('You have been signed out.')
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  return (
    <DropdownMenu className="min-w-64" anchor={anchor}>
      <DropdownItem onClick={signOut}>
        <ArrowRightStartOnRectangleIcon />
        <DropdownLabel>Sign out</DropdownLabel>
      </DropdownItem>
    </DropdownMenu>
  )
}
