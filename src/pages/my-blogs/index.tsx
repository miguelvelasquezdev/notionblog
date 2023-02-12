import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const myBlogs = 'My Blogs'

const MyBlogsPage: NextPage = () => (
  <>
    <Head>
      <title>{myBlogs}</title>
    </Head>
    <div className="flex flex-col p-8">
      <h2 className="text-3xl font-bold">{myBlogs}</h2>
      <div className="flex gap-4 mt-8">
        <Link
          href="/new-blog"
          className="flex flex-col justify-center items-center w-1/3 h-64 border dark:border-zinc-900 rounded-xl drop-shadow-md bg-stone-50 dark:bg-zinc-800 transition ease-in-out delay-50 hover:drop-shadow-xl"
        >
          <span className="font-bold text-lg text-stone-600 dark:text-gray-300 h-1/5">
            Untitled
          </span>
          <div className="flex items-center w-full border-t dark:border-t-zinc-900 rounded-b-xl h-12 absolute bg-white dark:bg-zinc-900 top-52">
            <span className="pl-4 text-black dark:text-white">
              ✨ Create new blog
            </span>
          </div>
        </Link>
      </div>
    </div>
  </>
)

export default MyBlogsPage
