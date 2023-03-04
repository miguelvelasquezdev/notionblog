import { z } from 'zod'
import { defaultPostSelect } from '../selects/blog'

import { createTRPCRouter, publicProcedure } from '../trpc'
import { prisma } from '../../db'

export const blogRouter = createTRPCRouter({
  hello: publicProcedure.query(() => {
    return {
      greeting: `Hello`,
    }
  }),

  getAll: publicProcedure.query(async () => {
    return await prisma.page.findMany({ select: defaultPostSelect })
  }),
  createBlog: publicProcedure.mutation(async () => {
    if (process.env.DATABASE_ID) {
      const blog = await prisma.page.create({
        data: {
          parent: {
            create: {
              type: 'database_id',
              database_id: process.env.DATABASE_ID,
            },
          },
          properties: {
            create: {
              pageName: {
                create: {
                  type: 'title',
                  title: {
                    create: {
                      type: 'text',
                      text: {
                        create: {
                          content: '',
                          link: '',
                        },
                      },
                      annotations: {},
                      plain_text: '',
                      href: '',
                    },
                  },
                },
              },
            },
          },
        },
      })
      return blog
    }
  }),
  editBlog: publicProcedure
    .input(
      z.object({
        id: z.string(),
        pageName: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const blog = await prisma.page.findUnique({
        where: {
          id: input.id,
        },
        select: {
          properties: {
            select: {
              pageName: {
                select: {
                  title: true,
                },
              },
            },
          },
        },
      })

      const id = blog?.properties?.pageName?.title[0]?.id

      const blogEdited = await prisma?.page.update({
        where: {
          id: input.id,
        },
        data: {
          properties: {
            update: {
              pageName: {
                update: {
                  title: {
                    update: {
                      where: {
                        id,
                      },
                      data: {
                        text: {
                          update: {
                            content: input.pageName,
                          },
                        },
                        plain_text: input.pageName,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      })

      return blogEdited
    }),
  byId: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      return await prisma.page.findUnique({
        where: {
          id: input.id,
        },
        select: defaultPostSelect,
      })
    }),
  getSecretMessage: publicProcedure.query(() => {
    return 'you can now see this secret message!'
  }),
})
