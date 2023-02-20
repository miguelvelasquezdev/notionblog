import { z } from 'zod'
import { defaultPostSelect } from '../selects/blog'

import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc'

export const blogRouter = createTRPCRouter({
  hello: publicProcedure.query(() => {
    return {
      greeting: `Hello`,
    }
  }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.page.findMany({
      where: {
        user: {
          id: {
            equals: ctx.session?.user?.id,
          },
        },
      },
      select: defaultPostSelect,
    })
  }),
  createBlog: protectedProcedure.mutation(async ({ ctx }) => {
    if (process.env.DATABASE_ID) {
      const blog = await prisma?.page.create({
        data: {
          user: { connect: { id: ctx.session?.user?.id } },
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
  editBlog: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        pageName: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const blog = await prisma?.page.findUnique({
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

      const blogEdited = prisma?.page.update({
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
  byId: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.page.findUnique({
        where: {
          id: input.id,
        },
        select: defaultPostSelect,
      })
    }),
  getSecretMessage: protectedProcedure.query(() => {
    return 'you can now see this secret message!'
  }),
})
