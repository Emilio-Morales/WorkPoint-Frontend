'use client'

import { updateUser } from '@/app/api/users/actions'
import { DepartmentListBox } from '@/components/departmentListBox'
import { Button } from '@/components/ui/button'
import { Divider } from '@/components/ui/divider'
import { ErrorMessage, Field } from '@/components/ui/fieldset'
import { Heading, Subheading } from '@/components/ui/heading'
import { Input, InputGroup } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Text } from '@/components/ui/text'
import { CurrencyDollarIcon } from '@heroicons/react/16/solid'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
const EditUserForm = ({ user, departments }) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
    setError,
  } = useForm()
  const router = useRouter()

  const onSubmit = async (data) => {
    console.log('Form submitted:', data)

    // Checks to see if user was already active beforehand. If they were and their status was unchanged, dateExited remains unchanged.
    // If they were inactive and there status was changed to active, dateExited becomes the  value that is being used in the backend to represent null dateExited.
    // If they were active and there status was changed to inactive, dateExited becomes the current date.
    const dateExited =
      data.active && user.active ? user.dateExited : data.active ? '1900-01-01T00:00:00.000Z' : new Date().toISOString()

    const requestData = {
      ...user,
      ...data,
      dateExited,
    }

    console.log('requestData:', requestData)
    try {
      reset()
      const response = await updateUser(requestData)
      if (response.status === 200) {
        toast.success('Employee updated successfully')
        router.push(`/dashboard/users/${user.userId}`)
      }
    } catch (error) {
      console.error(error)
      setError('form', { type: 'server', message: error.message })
      toast.error(error.message)
    }
  }

  return (
    <form className="mx-auto mt-4 max-w-4xl lg:mt-8" onSubmit={handleSubmit(onSubmit)}>
      <Heading>Edit {user.firstName}&apos;s profile </Heading>
      <Divider className="my-10 mt-6" />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Employee First Name</Subheading>
          <Text>Update the legal first name of the employee.</Text>
        </div>
        <div>
          <Field>
            <Input
              aria-label="Employee First Name"
              name="firstName"
              defaultValue={user.firstName}
              placeholder="John"
              required
              {...register('firstName', { required: 'Please enter a first name' })}
            />
            {errors.firstName && <ErrorMessage>{errors.firstName.message}</ErrorMessage>}
          </Field>
        </div>
      </section>
      <Divider className="my-10 mt-6" />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Employee Last Name</Subheading>
          <Text>Update the legal last name of the employee.</Text>
        </div>
        <div>
          <Field>
            <Input
              aria-label="Employee Last Name"
              name="lastName"
              defaultValue={user.lastName}
              placeholder="Smith"
              required
              {...register('lastName', { required: 'Please enter a last name' })}
            />
            {errors.lastName && <ErrorMessage>{errors.lastName.message}</ErrorMessage>}
          </Field>
        </div>
      </section>

      <Divider className="my-10" soft />
      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Employee Gender</Subheading>
          <Text>Update the gender of the employee.</Text>
        </div>
        <div>
          <Field>
            <Input
              aria-label="Employee Gender"
              name="gender"
              defaultValue={user.gender}
              placeholder="Male"
              required
              {...register('gender', { required: 'Please enter a gender' })}
            />
            {errors.gender && <ErrorMessage>{errors.gender.message}</ErrorMessage>}
          </Field>
        </div>
      </section>

      <Divider className="my-10" soft />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Job Title</Subheading>
          <Text>
            Update the role or position within the organization (e.g., &quot;Software Engineer&quot; or &quot;Marketing
            Manager&quot;).
          </Text>
        </div>
        <div>
          <Field>
            <Input
              aria-label="Job Title"
              name="jobTitle"
              defaultValue={user.jobTitle}
              placeholder="Sales Associate"
              required
              {...register('jobTitle', { required: 'Please enter a job title' })}
            />
            {errors.jobTitle && <ErrorMessage>{errors.jobTitle.message}</ErrorMessage>}
          </Field>
        </div>
      </section>

      <Divider className="my-10" soft />
      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Department</Subheading>
          <Text>
            Update the department where the employee will be working (e.g., &quot;Engineering,&quot; &quot;HR,&quot; or
            &quot;Sales&quot;).
          </Text>
        </div>
        <Controller
          name="department"
          defaultValue={departments[0].department}
          control={control}
          render={({ field }) => (
            <DepartmentListBox departments={departments} value={field.value} onChange={field.onChange} />
          )}
        />
      </section>
      <Divider className="my-10" soft />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Employee Email</Subheading>
          <Text>Update the official work email address for the employee.</Text>
        </div>
        <div className="space-y-4">
          <Field>
            <Input
              type="email"
              aria-label="Employee Email"
              name="email"
              defaultValue={user.email}
              placeholder="johnsmith@example.com"
              required
              {...register('email', { required: 'Please enter an email' })}
            />
            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          </Field>
        </div>
      </section>

      <Divider className="my-10" soft />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Annual Salary</Subheading>
          <Text>Update the employee&apos;s yearly salary in USD</Text>
        </div>
        <Field>
          <InputGroup>
            <CurrencyDollarIcon className="size-5 text-stone-900 dark:text-stone-500" />
            <Input
              aria-label="Employee Name"
              name="name"
              defaultValue={user.salary}
              placeholder="70000"
              required
              {...register('salary', {
                required: 'Salary is required',
                validate: {
                  isNumber: (value) => !isNaN(Number(value)) || 'Salary must be a number',
                  isPositive: (value) => Number(value) > 0 || 'Salary must be greater than 0',
                  maxLength: (value) => {
                    const [integerPart, decimalPart] = value.split('.')
                    return (
                      (integerPart.length <= 14 && (!decimalPart || decimalPart.length <= 4)) ||
                      'Salary must not exceed 14 digits before the decimal and 4 digits after'
                    )
                  },
                },
              })}
            />
            {errors.salary && <ErrorMessage>{errors.salary.message}</ErrorMessage>}
          </InputGroup>
        </Field>
      </section>

      <Divider className="my-10" soft />
      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Employee Status</Subheading>
          <Text>Update the current employment status for the employee.</Text>
        </div>
        <div>
          <Controller
            name="active"
            defaultValue={user.active}
            control={control}
            render={({ field }) => (
              <Select
                aria-label="Employee Status"
                name="active"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value === 'true')}
              >
                <option value={true}>Active</option>
                <option value={false}>Inactive</option>
              </Select>
            )}
          />
        </div>
      </section>

      <Divider className="my-10" soft />

      <div className="flex justify-end gap-4">
        <Button href={`/dashboard/users/${user.userId}`} plain>
          Cancel
        </Button>
        <Button type="submit" className={clsx('', isSubmitting && 'cursor-wait opacity-50')} disabled={isSubmitting}>
          Save Changes
        </Button>
      </div>
    </form>
  )
}

export default EditUserForm
