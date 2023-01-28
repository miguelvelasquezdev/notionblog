import { type NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center mt-24 mx-5 h-96">
        <h1 className="font-bold text-2xl sm:text-3xl lg:text-5xl text-center">
          Create Notion Blogs
          <br />
          Show your ideas to the whole world
        </h1>
        <p className="text-center text-sm sm:text-lg text-stone-500 mt-5 mx-5">
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
