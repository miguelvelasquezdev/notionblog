import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { NextRequest } from 'next/server.js'

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
