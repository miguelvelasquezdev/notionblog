import { createNextApiHandler } from '@trpc/server/adapters/next'

import { env } from '../../../env/server.mjs'
import { createTRPCContext } from '../../../server/api/trpc'
import { appRouter } from '../../../server/api/root'

export const config = {
  runtime: 'edge',
  unstable_allowDynamic: [
    '/lib/utilities.js', // allows a single file
    '/node_modules/function-bind/**', // use a glob to allow anything in the function-bind 3rd party module
  ],
}

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === 'development'
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`,
          )
        }
      : undefined,
})
