import { useSession, signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: sessionData } = useSession()

  return (
    <div>
      <header className="py-5 px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="font-medium text-xl">
            NotionBlog
          </Link>
          {!sessionData ? (
            <button className="font-medium" onClick={() => void signIn()}>
              Log in
            </button>
          ) : (
            sessionData?.user?.image && (
              <div className="flex items-center">
                <Link
                  className="py-5 px-10 text-center font-medium"
                  href="/my-blogs"
                >
                  My Blogs
                </Link>
                <Image
                  width={40}
                  height={40}
                  className="rounded-full"
                  src={sessionData?.user?.image}
                  alt="User Image"
                />
              </div>
            )
          )}
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}

export default Layout
