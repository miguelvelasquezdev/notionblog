import { type ChangeEvent, useEffect, useRef, useState } from 'react'
import type { GetStaticPropsContext } from 'next'

import ToggleComponent from '../../components/Toggle'
import { useStore } from '../../store/store'
import { api } from '../../utils/api'
import { prisma } from '../../server/db'

type props = {
  id: string
}

const preventKeys = ['ArrowUp', 'ArrowDown']
const paragraphClassname =
  'focus:outline-none placeholder:text-stone-300 dark:placeholder:text-zinc-500 bg-none focus:bg-transparent dark:focus:bg-transparent rounded hover:bg-zinc-50 dark:hover:bg-zinc-900 px-2 m-px'

const defaultBlockStyles = (top: number, left: number) =>
  new Map([
    ['display', 'inline'],
    ['top', `${top}px`],
    ['left', `${left}px`],
  ])

const NewBlogPage = ({ id }: props) => {
  const [text, setText] = useState<string>('')
  const [isSaved, setIsSaved] = useState<string>('')
  const [showToggle, setShowToggle] = useState<boolean>(false)
  const [currentBlock, setCurrentBlock] = useState<HTMLElement>()
  const [title, setTitle] = useState<string>()

  const toggleGroupRef = useRef<HTMLDivElement>(null)
  const pageRef = useRef<HTMLDivElement>(null)

  const { data } = api.blog.byId.useQuery({ id })

  const { count, clear } = useStore((state) => state)

  useEffect(() => {
    setIsSaved('🥱')
    const timeOutId = setTimeout(() => setIsSaved('💾'), 500)
    return () => {
      clearTimeout(timeOutId)
    }
  }, [text])

  useEffect(() => {
    setTitle(data?.properties?.pageName?.title[0]?.text?.content)
  }, [data])

  useEffect(() => {
    createSimpleBlock()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const s = window.getSelection()
    const selectedText = s?.toString()

    if (count && selectedText?.trim().length && s?.anchorOffset) {
      document.execCommand('bold')
    }
  }, [count, currentBlock])

  const showToggleGroup = (e: MouseEvent | KeyboardEvent) => {
    handleContent(e)
    displayToolbar(e)
  }

  const displayToolbar = (e: MouseEvent | KeyboardEvent) => {
    const s = window.getSelection()

    if (toggleGroupRef.current) {
      const selectedText = s?.toString().trim()

      if (selectedText?.length) {
        const range = s?.getRangeAt(0)
        const position = range?.getBoundingClientRect()

        const top = position?.y ? position.y - 40 + window.pageYOffset : 0
        const left = position?.x ?? 0

        if (top && left) {
          defaultBlockStyles(top, left).forEach((value, key) => {
            if (toggleGroupRef?.current) {
              toggleGroupRef.current.style[key as unknown as number] = value
            }
          })
          const target = e?.target as HTMLElement
          if (target) {
            setCurrentBlock(target)
            setShowToggle(true)
          }
        }
      } else {
        clear()
        setShowToggle(false)
      }
    }
  }

  const handleContent = (e: MouseEvent | KeyboardEvent) => {
    const target = e?.target as HTMLElement
    if (target) {
      setText(target.innerHTML)
    }
  }

  const isEnterKey = (e: KeyboardEvent) => {
    return e?.key === 'Enter'
  }

  const createNewBlock = (e: KeyboardEvent) => {
    const target = e?.target as HTMLElement
    if (isEnterKey(e)) {
      if (e.shiftKey) {
        return
      }

      createSimpleBlock(e)
    } else if (!target.innerText.length && e.key === 'Backspace') {
      const previousSibling = target.previousSibling as HTMLElement
      previousSibling.focus()
      pageRef.current?.removeChild(e.target as Node)
    }

    if (e.key === 'ArrowDown') {
      const nextSibling = target?.nextSibling as HTMLElement
      handleArrowEvents(nextSibling)
    } else if (e.key === 'ArrowUp') {
      const previousSibling = target?.previousSibling as HTMLElement
      handleArrowEvents(previousSibling)
    }
  }

  const handleArrowEvents = (element: HTMLElement) => {
    const range = document.createRange()
    const sel = window.getSelection()
    if (
      element?.childNodes?.length &&
      element?.childNodes[0] &&
      sel?.focusOffset
    ) {
      if (sel.focusOffset >= element.innerText.length) {
        range.setStart(element.childNodes[0], element.innerText.length ?? 0)
      } else {
        range.setStart(element.childNodes[0], sel?.focusOffset)
      }
      range.collapse(true)
      sel?.removeAllRanges()
      sel?.addRange(range)
    } else if (element) {
      element.focus()
    }
  }

  const createSimpleBlock = (e?: KeyboardEvent) => {
    const target = e?.target as HTMLElement | undefined
    const block = document.createElement('p')
    block.className = paragraphClassname
    block.contentEditable = 'true'
    block.onmouseup = (ev) => showToggleGroup(ev)
    block.onkeyup = (ev) => {
      showToggleGroup(ev)
      createNewBlock(ev)
    }
    block.addEventListener('keydown', (ev) => {
      if (preventKeys.includes(ev.key) || (isEnterKey(ev) && !ev.shiftKey)) {
        ev.preventDefault()
      }
    })

    if (!e) {
      pageRef.current?.appendChild(block)
    } else {
      if (typeof target?.nextSibling) {
        target?.parentNode?.insertBefore(
          block,
          target?.nextSibling as HTMLElement,
        )
      }
    }

    block.focus()
  }

  const editBlog = api.blog.editBlog.useMutation()

  const handleTitle = async (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
    setTitle(e.target.value)

    if (id) {
      try {
        await editBlog.mutateAsync({
          id,
          pageName: e.target.value,
        })
      } catch (err) {
        console.error(err)
      }
    }
  }

  return (
    <div className="flex justify-center">
      <div ref={toggleGroupRef} className="absolute">
        {showToggle && <ToggleComponent />}
      </div>
      <div className="flex flex-col px-24 py-12 w-5/6">
        <span className="text-md self-end py-5">{isSaved}</span>

        <input
          type="text"
          className="focus:outline-none font-bold text-4xl mb-5 placeholder:text-stone-300 dark:placeholder:text-zinc-700"
          autoFocus
          onChange={(e) =>
            void (async () => {
              await handleTitle(e)
            })()
          }
          placeholder="Untitled"
          value={title ?? ''}
        />

        <div ref={pageRef}></div>
      </div>
    </div>
  )
}

export function getStaticProps(context: GetStaticPropsContext<{ id: string }>) {
  return {
    props: {
      id: context.params?.id,
    },
  }
}

export async function getStaticPaths() {
  const pages = await prisma.page.findMany({
    select: {
      id: true,
    },
  })

  return {
    paths: pages.map((page) => ({
      params: {
        id: page.id,
      },
    })),
    fallback: false,
  }
}

export default NewBlogPage
