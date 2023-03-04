import { useTheme } from 'next-themes'
import Link from 'next/link'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // const { resolvedTheme, setTheme } = useTheme()

  return (
    <div>
      <header className="py-5 px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="font-medium text-2xl">
              NotionBlog
            </Link>
            <Link
              className="my-5 ml-10 text-center font-medium"
              href="/my-blogs"
            >
              Topics
            </Link>
            <Link
              className="my-5 ml-5 text-center font-medium"
              href="/my-blogs"
            >
              Developer
            </Link>
            <Link
              className="my-5 ml-5 text-center font-medium"
              href="/my-blogs"
            >
              API Docs
            </Link>
          </div>
          {/* {!sessionData ? (
            <button
              className="font-medium"
              onClick={() => void signIn('google')}
            >
              Log in
            </button>
          ) : (
            sessionData?.user?.image && (
              <div className="flex items-center">
                <button
                  onClick={() => {
                    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
                  }}
                >
                  {resolvedTheme === 'dark' ? '🌝' : '🌚'}
                </button>
                <Link
                  className="my-5 mx-10 text-center font-medium"
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
          )} */}
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}

export default Layout
