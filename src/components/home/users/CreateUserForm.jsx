'use client'
import { createUser } from '@/app/api/users/actions'
import { DepartmentListBox } from '@/components/DepartmentListBox'
import { Button } from '@/components/ui/button'
import { Divider } from '@/components/ui/divider'
import { ErrorMessage, Field } from '@/components/ui/fieldset'
import { Heading, Subheading } from '@/components/ui/heading'
import { Input, InputGroup } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { CurrencyDollarIcon } from '@heroicons/react/16/solid'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const CreateUserForm = ({ departments }) => {
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
    try {
      reset()
      const response = await createUser(data)
      if (response.status === 200) {
        toast.success('Employee created successfully')
        router.push(`/dashboard`)
      }
    } catch (error) {
      console.error(error)
      setError('form', { type: 'server', message: error.message })
      toast.error(error.message)
    }
  }
  return (
    <form className="mx-auto mt-4 max-w-4xl lg:mt-8" onSubmit={handleSubmit(onSubmit)}>
      <Heading>New Employee</Heading>
      <Divider className="my-10 mt-6" />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Employee First Name</Subheading>
          <Text>Please enter the legal first name of the employee.</Text>
        </div>
        <div>
          <Field>
            <Input
              aria-label="Employee First Name"
              name="firstName"
              defaultValue=""
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
          <Text>Please enter the legal last name of the employee.</Text>
        </div>
        <div>
          <Field>
            <Input
              aria-label="Employee Last Name"
              name="lastName"
              defaultValue=""
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
          <Text>Please enter the gender of the employee.</Text>
        </div>
        <div>
          <Field>
            <Input
              aria-label="Employee Gender"
              name="gender"
              defaultValue=""
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
            Specify the role or position within the organization (e.g., &quot;Software Engineer&quot; or &quot;Marketing
            Manager&quot;).
          </Text>
        </div>
        <div>
          <Field>
            <Input
              aria-label="Job Title"
              name="jobTitle"
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
            Select the department where the employee will be working (e.g., &quot;Engineering,&quot; &quot;HR,&quot; or
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
          <Text>Enter the official work email address for the employee.</Text>
        </div>
        <div className="space-y-4">
          <Field>
            <Input
              type="email"
              aria-label="Employee Email"
              name="email"
              defaultValue=""
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
          <Text>Specify the employee&apos;s yearly salary in USD</Text>
        </div>
        <Field>
          <InputGroup>
            <CurrencyDollarIcon className="size-5 text-stone-900 dark:text-stone-500" />
            <Input
              aria-label="Employee Name"
              name="salary"
              defaultValue=""
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

      <div className="flex justify-end gap-4">
        <Button type="submit" className={clsx('', isSubmitting && 'cursor-wait opacity-50')} disabled={isSubmitting}>
          Add
        </Button>
      </div>
    </form>
  )
}

export default CreateUserForm
