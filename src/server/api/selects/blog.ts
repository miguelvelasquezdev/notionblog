import { Prisma } from '@prisma/client/edge'

export const defaultPostSelect = Prisma.validator<Prisma.PageSelect>()({
  id: true,
  object: true,
  created_time: true,
  last_edited_by: {
    select: {
      object: true,
      id: true,
    },
  },
  created_by: {
    select: {
      object: true,
      id: true,
    },
  },
  cover: {
    select: {
      type: true,
      external: {
        select: {
          url: true,
        },
      },
    },
  },
  icon: {
    select: {
      type: true,
      emoji: true,
    },
  },
  parent: {
    select: {
      type: true,
      database_id: true,
    },
  },
  archived: true,
  properties: {
    select: {
      authorId: {
        select: {
          id: true,
          type: true,
          rich_text: {
            select: {
              type: true,
              text: {
                select: {
                  content: true,
                  link: true,
                },
              },
              annotations: {
                select: {
                  bold: true,
                  italic: true,
                  strikethrough: true,
                  underline: true,
                  code: true,
                  color: true,
                },
              },
              plain_text: true,
              href: true,
            },
          },
        },
      },
      authorName: {
        select: {
          id: true,
          type: true,
          rich_text: {
            select: {
              type: true,
              text: {
                select: {
                  content: true,
                  link: true,
                },
              },
              annotations: {
                select: {
                  bold: true,
                  italic: true,
                  strikethrough: true,
                  underline: true,
                  code: true,
                  color: true,
                },
              },
              plain_text: true,
              href: true,
            },
          },
        },
      },
      pageName: {
        select: {
          id: true,
          type: true,
          title: {
            select: {
              id: true,
              type: true,
              text: {
                select: {
                  content: true,
                  link: true,
                },
              },
              annotations: {
                select: {
                  bold: true,
                  italic: true,
                  strikethrough: true,
                  underline: true,
                  code: true,
                  color: true,
                },
              },
              plain_text: true,
              href: true,
            },
          },
        },
      },
    },
  },
  url: true,
})
