'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogActions, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { useState } from 'react'

export function DeleteUser({ amount, ...props }) {
  let [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)} {...props} />
      <Dialog open={isOpen} onClose={setIsOpen}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this user? This action is permanent and cannot be undone.
        </DialogDescription>
        {/* <DialogBody>
          <FieldGroup>
            <Field>
              <Label>Amount</Label>
              <Input name="amount" defaultValue={amount} placeholder="$0.00" autoFocus />
            </Field>
            <Field>
              <Label>Reason</Label>
              <Select name="reason" defaultValue="">
                <option value="" disabled>
                  Select a reason&hellip;
                </option>
                <option value="duplicate">Duplicate</option>
                <option value="fraudulent">Fraudulent</option>
                <option value="requested_by_customer">Requested by customer</option>
                <option value="other">Other</option>
              </Select>
            </Field>
            <CheckboxField>
              <Checkbox name="notify" />
              <Label>Notify customer</Label>
              <Description>An email notification will be sent to this customer.</Description>
            </CheckboxField>
          </FieldGroup>
        </DialogBody> */}
        <DialogActions>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsOpen(false)}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
