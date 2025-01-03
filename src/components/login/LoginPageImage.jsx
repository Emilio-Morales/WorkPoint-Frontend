'use client'
import { useTheme } from 'next-themes'
import Image from 'next/image'

const LoginPageImage = () => {
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'
  return (
    <div className="relative hidden w-0 flex-1 lg:block">
      <Image
        alt="Dashboard Home Page"
        src={isDarkMode ? '/dashboardHomePage.png' : '/dashboardHomePageLight.png'}
        className="object-cover object-left"
        fill
      />
    </div>
  )
}

export default LoginPageImage
