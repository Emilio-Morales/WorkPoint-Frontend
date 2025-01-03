'use client'
import LoginPageImage from '@/components/login/LoginPageImage'
import { Button } from '@/components/ui/button'
import { Field, Label } from '@/components/ui/fieldset'
import { Heading } from '@/components/ui/heading'
import { Input } from '@/components/ui/input'
import clsx from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { loginUser } from '../api/auth/actions'
import workPointLogo from '/public/teams/catalyst.svg'

export default function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    clearErrors,
    setError,
  } = useForm()
  const router = useRouter()

  const onSubmit = async (data) => {
    const credentials = data
    try {
      const result = await loginUser(credentials)
      reset()
      router.push(result.redirectTo)
    } catch (error) {
      console.error('Error logging in:', error)
      setError('form', { type: 'server', message: error.message })
    }
  }
  return (
    <>
      <div className="flex min-h-full flex-1 bg-white dark:bg-zinc-900">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <Image alt="WorkPoint Logo" src={workPointLogo} className="h-10 w-auto" />
              <Heading level={2} className="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900">
                Sign in to your account
              </Heading>
            </div>

            <div className="mt-10">
              <div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <Field>
                    <Label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                      Email address
                    </Label>
                    <div className="mt-2">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className=""
                        {...register('email', { required: 'Email is required', onChange: () => clearErrors('form') })}
                      />
                    </div>
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                  </Field>

                  <Field>
                    <Label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                      Password
                    </Label>
                    <div className="mt-2">
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        required
                        autoComplete="current-password"
                        className=""
                        {...register('password', {
                          required: 'Password is required',
                          onChange: () => clearErrors('form'),
                        })}
                      />
                      {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
                    </div>
                  </Field>
                  <div>
                    <Button
                      type="submit"
                      className={clsx(
                        'flex w-full justify-center rounded-md',
                        isSubmitting && 'cursor-wait opacity-50'
                      )}
                      disabled={isSubmitting}
                    >
                      Sign in
                    </Button>
                    {errors.form && <p className="mt-1 text-sm text-red-500">{errors.form.message}</p>}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <LoginPageImage />
      </div>
    </>
  )
}
