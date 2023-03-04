import { type AppType } from 'next/app'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'

import { api } from '../utils/api'

import '../styles/globals.css'
import '../styles/dropdown-menu.css'

import '../styles/toggle.css'
import Layout from './layout'

const title = 'NotionBlog | Create Blogs'

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <ThemeProvider attribute="class">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  )
}

export default api.withTRPC(MyApp)
