import Link from 'next/link'

const page = () => {
  return (
    <div className="flex h-screen items-center justify-center text-7xl">
      <Link href={'/login'}>Go to login</Link>
    </div>
  )
}

export default page
