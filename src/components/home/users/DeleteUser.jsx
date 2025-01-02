'use client'

import { deleteUser } from '@/app/api/users/actions'
import { Button } from '@/components/ui/button'
import { Dialog, DialogActions, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

export function DeleteUser({ userId, userEmail, ...props }) {
  // Temp fix to prevent deletion of demo user
  let [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  if (userEmail === 'johnsmith@example.com') {
    return (
      <>
        <Button type="button" onClick={() => setIsOpen(true)} {...props} />
        <Dialog open={isOpen} onClose={setIsOpen}>
          <DialogTitle>Cannot Delete User</DialogTitle>
          <DialogDescription>
            The following user is the user used for demo purposes and cannot be deleted.
          </DialogDescription>
          <DialogActions>
            <Button plain onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
  const handleDelete = async () => {
    try {
      // Optimistic update
      toast.success('User deleted successfully')
      router.push(`/dashboard`)
      const response = await deleteUser(userId)
      if (response.status === 200) {
        setIsOpen(false)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      setIsOpen(false)
    }
  }
  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)} {...props} />
      <Dialog open={isOpen} onClose={setIsOpen}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this user? This action is permanent and cannot be undone.
        </DialogDescription>
        <DialogActions>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
