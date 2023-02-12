import { type NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center mt-24 mx-5 h-96">
        <h1 className="font-bold text-4xl sm:text-6xl lg:text-8xl text-center mx-18">
          Create Notion Blogs
        </h1>

        <p className="text-center text-sm sm:text-lg text-stone-500 dark:text-gray-300 mt-5 mx-5">
          Create ideas with your favourite notes app and share them.
          <br />
          Optimize your SEO, create tags and have access to comments section
          easely.
        </p>
      </div>
    </>
  )
}

export default Home
