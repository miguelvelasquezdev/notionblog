import type { NextPage } from 'next'
import { Client } from '@notionhq/client'
import type { Blocks } from '../../types/blocks'
import Link from 'next/link'

const notion = new Client({ auth: process.env.NOTION_API_KEY })
const blockId = '937cd08c-82ed-47ac-a3fb-17040a2ae255'

const Blog: NextPage<{ data: Blocks }> = ({ data }) => {
  return (
    <div className="flex justify-center">
      <div className=" mx-24 py-8 w-3/5">
        {data?.results?.map((result, key) => {
          switch (result.type) {
            case 'callout':
              if (result?.callout?.color && result?.callout?.icon?.emoji) {
                return (
                  <div
                    key={result.id}
                    className={`${
                      result?.callout?.color === 'green_background'
                        ? ' bg-green-600/10 dark:bg-green-300/10'
                        : ''
                    } p-4 rounded-md flex gap-3`}
                  >
                    <p>{result.callout.icon.emoji}</p>
                    {result.callout.rich_text.map((text, key) => (
                      <p
                        key={key}
                        className=" text-zinc-700 dark:text-white/80"
                      >
                        {text.plain_text}
                      </p>
                    ))}
                  </div>
                )
              }
            case 'divider':
              return (
                <hr key={result.id} className="my-5 dark:border-zinc-800" />
              )
            case 'bookmark':
              const url = result.bookmark?.url
              if (url) {
                return (
                  <Link
                    key={result.id}
                    href={url}
                    target="_blank"
                    className="text-md my-2 dark:text-stone-100"
                  >
                    {result.bookmark?.url}
                  </Link>
                )
              }
              return null

            case 'paragraph':
              if (result.paragraph?.rich_text.length === 0) {
                return <br key={result.id} />
              }
              return (
                <p key={result.id} className="text-md my-2 dark:text-stone-100">
                  {result.paragraph?.rich_text.map((text, key) => {
                    if (text.annotations?.bold) {
                      return <strong key={key}>{text.plain_text}</strong>
                    }
                    if (text.annotations?.italic) {
                      return <em key={key}>{text.plain_text}</em>
                    }
                    if (text.annotations?.strikethrough) {
                      return <del key={key}>{text.plain_text}</del>
                    }
                    if (text.annotations?.underline) {
                      return <u key={key}>{text.plain_text}</u>
                    }
                    if (text.annotations?.code) {
                      return <code key={key}>{text.plain_text}</code>
                    }
                    return text.plain_text
                  })}
                </p>
              )
            case 'heading_1': {
              return (
                <h1 className="text-3xl font-semibold">
                  {result.heading_1?.rich_text?.map((text, key) => {
                    if (text.annotations.bold) {
                      return <strong key={key}>{text.plain_text}</strong>
                    }
                    if (text.annotations.italic) {
                      return <em key={key}>{text.plain_text}</em>
                    }
                    if (text.annotations.strikethrough) {
                      return <del key={key}>{text.plain_text}</del>
                    }
                    if (text.annotations.underline) {
                      return <u key={key}>{text.plain_text}</u>
                    }
                    if (text.annotations.code) {
                      return <code key={key}>{text.plain_text}</code>
                    }
                    return text.plain_text
                  })}
                </h1>
              )
            }
            case 'heading_2': {
              return (
                <h1 className="text-2xl font-semibold">
                  {result.heading_2?.rich_text?.map((text, key) => {
                    if (text.annotations.bold) {
                      return <strong key={key}>{text.plain_text}</strong>
                    }
                    if (text.annotations.italic) {
                      return <em key={key}>{text.plain_text}</em>
                    }
                    if (text.annotations.strikethrough) {
                      return <del key={key}>{text.plain_text}</del>
                    }
                    if (text.annotations.underline) {
                      return <u key={key}>{text.plain_text}</u>
                    }
                    if (text.annotations.code) {
                      return <code key={key}>{text.plain_text}</code>
                    }
                    return text.plain_text
                  })}
                </h1>
              )
            }
            case 'heading_3': {
              return (
                <h1 className="text-xl font-semibold">
                  {result.heading_3?.rich_text?.map((text, key) => {
                    if (text.annotations.bold) {
                      return <strong key={key}>{text.plain_text}</strong>
                    }
                    if (text.annotations.italic) {
                      return <em key={key}>{text.plain_text}</em>
                    }
                    if (text.annotations.strikethrough) {
                      return <del key={key}>{text.plain_text}</del>
                    }
                    if (text.annotations.underline) {
                      return <u key={key}>{text.plain_text}</u>
                    }
                    if (text.annotations.code) {
                      return <code key={key}>{text.plain_text}</code>
                    }

                    return text.plain_text
                  })}
                </h1>
              )
            }
            case 'bulleted_list_item':
              return (
                <li className="ml-4">
                  {result.bulleted_list_item?.rich_text.map((item) => {
                    if (item.annotations.bold) {
                      return <strong key={key}>{item.plain_text}</strong>
                    }
                    if (item.annotations.italic) {
                      return <em key={key}>{item.plain_text}</em>
                    }
                    if (item.annotations.strikethrough) {
                      return <del key={key}>{item.plain_text}</del>
                    }
                    if (item.annotations.underline) {
                      return <u key={key}>{item.plain_text}</u>
                    }
                    if (item.annotations.code) {
                      return <code key={key}>{item.plain_text}</code>
                    }

                    return item.plain_text
                  })}
                </li>
              )
            case 'numbered_list_item':
              return (
                <li>{result.numbered_list_item?.rich_text[0]?.plain_text}</li>
              )
          }
        })}
      </div>
    </div>
  )
}

export default Blog
