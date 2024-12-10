import LoginPageImage from '@/components/login/LoginPageImage'
import { Button } from '@/components/ui/button'
import { Field, Label } from '@/components/ui/fieldset'
import { Heading } from '@/components/ui/heading'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import workPointLogo from '/public/teams/catalyst.svg'

export default function Login() {
  return (
    <>
      <div className="flex min-h-full flex-1 bg-white dark:bg-zinc-900">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              {/* <img
                alt="Your Company"
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                className="h-10 w-auto"
              /> */}
              <Image alt="WorkPoint Logo" src={workPointLogo} className="h-10 w-auto" />
              <Heading level={2} className="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900">
                Sign in to your account
              </Heading>
            </div>

            <div className="mt-10">
              <div>
                <form action="#" method="POST" className="space-y-6">
                  <Field>
                    <Label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                      Email address
                    </Label>
                    <div className="mt-2">
                      <Input id="email" name="email" type="email" required autoComplete="email" className="" />
                    </div>
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
                      />
                    </div>
                  </Field>
                  {/* 
                  <div className="flex items-center justify-between">
                    <div className="flex gap-3">
                      <div className="flex h-6 shrink-0 items-center">
                        <div className="group grid size-4 grid-cols-1">
                          <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                          />
                          <svg
                            fill="none"
                            viewBox="0 0 14 14"
                            className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                          >
                            <path
                              d="M3 8L6 11L11 3.5"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="opacity-0 group-has-[:checked]:opacity-100"
                            />
                            <path
                              d="M3 7H11"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="opacity-0 group-has-[:indeterminate]:opacity-100"
                            />
                          </svg>
                        </div>
                      </div>
                      <label htmlFor="remember-me" className="block text-sm/6 text-gray-900">
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm/6">
                      <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Forgot password?
                      </a>
                    </div>
                  </div> */}

                  <div>
                    <Button type="submit" href="/" className="flex w-full justify-center rounded-md">
                      Sign in
                    </Button>
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
