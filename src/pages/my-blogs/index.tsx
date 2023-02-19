import type { NextPage } from 'next'
import Head from 'next/head'
import { api } from '../../utils/api'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const myBlogs = 'My Blogs'

const MyBlogsPage: NextPage = () => {
  const router = useRouter()
  const createBlog = api.blog.createBlog.useMutation()
  const pages = api.blog.getAll.useQuery()
  const createBlogAsync = async () => {
    try {
      const blogId = (await createBlog.mutateAsync())?.id
      if (blogId) {
        router.push(`/new-blog/${blogId}`)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <Head>
        <title>{myBlogs}</title>
      </Head>
      <div className="flex flex-col p-8">
        <h2 className="text-3xl font-bold">{myBlogs}</h2>
        <div className="flex flex-row flex-wrap mt-8 gap-4 ">
          <button
            onClick={() =>
              void (async () => {
                await createBlogAsync()
              })()
            }
            className="flex flex-col justify-center items-center w-[calc(33.3333%_-_1rem)] h-64 border dark:border-zinc-900 rounded-xl drop-shadow-md bg-stone-50 dark:bg-zinc-800 transition ease-in-out delay-50 hover:drop-shadow-xl"
          >
            <span className="font-bold text-lg text-stone-600 dark:text-gray-300 h-1/5">
              Untitled
            </span>
            <div className="flex items-center w-full border-t dark:border-t-zinc-900 rounded-b-xl h-12 absolute bg-white dark:bg-zinc-900 top-52">
              <span className="pl-4 text-black dark:text-white">
                ✨ Create new blog
              </span>
            </div>
          </button>
          {pages?.data?.map((page) => (
            <Link
              key={page.id}
              href={`/new-blog/${page.id}`}
              className="flex flex-col  justify-center w-[calc(33.3333%_-_1rem)] items-center h-64 border dark:border-zinc-900 rounded-xl drop-shadow-md bg-stone-50 dark:bg-zinc-800 transition ease-in-out delay-50 hover:drop-shadow-xl"
            >
              <span className="font-bold text-lg text-stone-600 dark:text-gray-300 h-1/5">
                {page.properties?.pageName?.title[0]?.plain_text?.trim()?.length
                  ? page.properties?.pageName?.title[0]?.plain_text
                  : 'Untitled'}
              </span>
              <div className="flex items-center justify-center w-full border-t dark:border-t-zinc-900 rounded-b-xl h-12 absolute bg-white dark:bg-zinc-900 top-52">
                <span className=" text-black font-semibold text-center dark:text-white">
                  {page.properties?.pageName?.title[0]?.plain_text?.trim()
                    ?.length
                    ? page.properties?.pageName?.title[0]?.plain_text
                    : 'Untitled'}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default MyBlogsPage
