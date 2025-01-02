'use client'
import { useTheme } from 'next-themes'
import Image from 'next/image'

const LoginPageImage = () => {
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'
  return (
    <div className="relative hidden w-0 flex-1 lg:block">
      {/* <img
      alt=""
      src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
      className="absolute inset-0 size-full object-cover"
    /> */}
      <Image
        alt="Dashboard Home Page"
        src={isDarkMode ? '/dashboardHomePage1.png' : '/dashboardHomePageLight1.png'}
        className="object-cover object-left"
        fill
      />
    </div>
  )
}

export default LoginPageImage
