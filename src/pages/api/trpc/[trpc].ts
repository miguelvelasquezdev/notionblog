import { createNextApiHandler } from '@trpc/server/adapters/next'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { NextRequest, NextResponse } from 'next/server.js'

import { env } from '../../../env/server.mjs'
import { createTRPCContext } from '../../../server/api/trpc'
import { appRouter } from '../../../server/api/root'

export const config = {
  runtime: 'edge',
}

export default async function handler(req: NextRequest) {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    router: appRouter,
    req,
    createContext: createTRPCContext,
  })
}
