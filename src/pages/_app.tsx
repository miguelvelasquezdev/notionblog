import { type AppType } from 'next/app'
import { type Session } from 'next-auth'
import { ThemeProvider } from 'next-themes'
import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'

import { api } from '../utils/api'

import '../styles/globals.css'
import '../styles/toggle.css'
import Layout from './layout'

const title = 'NotionBlog | Create Blogs'

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>{title}</title>
      </Head>
      <ThemeProvider attribute="class">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </SessionProvider>
  )
}

export default api.withTRPC(MyApp)
