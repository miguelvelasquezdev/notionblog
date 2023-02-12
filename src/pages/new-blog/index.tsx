import { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'
import ToggleComponent from '../../components/Toggle'
import { useStore } from '../../store/store'

type props = {
  blockMap: any
}

type State = {
  count: number
  increment: () => void
}

const preventKeys = ['ArrowUp', 'ArrowDown']

const paragraphClassname =
  'focus:outline-none placeholder:text-stone-300 dark:placeholder:text-zinc-500 bg-none focus:bg-transparent dark:focus:bg-transparent rounded hover:bg-zinc-50 dark:hover:bg-zinc-900 px-2 py-1 m-px'

const defaultBlockStyles = (top: number, left: number) =>
  new Map([
    ['display', 'inline'],
    ['top', `${top}px`],
    ['left', `${left}px`],
  ])

const NewBlogPage: NextPage<props> = ({ blockMap }) => {
  const [text, setText] = useState('')
  const [isSaved, setIsSaved] = useState('')
  const [showToggle, setShowToggle] = useState(false)
  const [currentBlock, setCurrentBlock] = useState<HTMLElement>()

  const toggleGroupRef = useRef<HTMLDivElement>(null)
  const pageRef = useRef<HTMLDivElement>(null)

  const { count, clear } = useStore((state) => state)

  useEffect(() => {
    setIsSaved('🥱')
    const timeOutId = setTimeout(() => setIsSaved('💾'), 500)
    return () => clearTimeout(timeOutId)
  }, [text])

  useEffect(() => {
    createSimpleBlock()
  }, [])

  useEffect(() => {
    const s = window.getSelection()
    const selectedText = s?.toString()

    if (count && selectedText?.trim().length && s?.anchorOffset) {
      document.execCommand('bold')
    }
  }, [count, currentBlock])

  const showToggleGroup = (e: any) => {
    handleContent(e)
    displayToolbar(e)
  }

  const displayToolbar = (e: any) => {
    const s = window.getSelection()

    if (toggleGroupRef.current) {
      const selectedText = s?.toString().trim()

      if (selectedText?.length) {
        const range = s?.getRangeAt(0)
        const position = range?.getBoundingClientRect()

        const top = position?.y ? position.y - 40 : 0
        const left = position?.x ?? 0

        if (top && left) {
          defaultBlockStyles(top, left).forEach((value, key) => {
            if (toggleGroupRef?.current) {
              ;(toggleGroupRef.current.style as any)[key] = value
            }
          })
          setCurrentBlock(e.target)
          setShowToggle(true)
        }
      } else {
        clear()
        setShowToggle(false)
      }
    }
  }

  const handleContent = (e: any) => {
    setText(e.target.innerHTML)
  }

  const isEnterKey = (e: KeyboardEvent) => {
    return e?.key === 'Enter'
  }

  const createNewBlock = (e: any) => {
    if (isEnterKey(e)) {
      if (e.shiftKey) {
        return
      }

      createSimpleBlock(e)
    } else if (!e.target.innerText.length && e.key === 'Backspace') {
      const previousSibling = e.target.previousSibling
      previousSibling.focus()
      pageRef.current?.removeChild(e.target as Node)
    }

    if (e.key === 'ArrowDown') {
      const nextSibling = e?.target?.nextSibling
      handleArrowEvents(nextSibling)
    } else if (e.key === 'ArrowUp') {
      const previousSibling = e?.target?.previousSibling
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
      ;(e?.target as any)?.parentNode?.insertBefore(
        block,
        (e as any)?.nextSibling,
      )
    }

    block.focus()
  }

  return (
    <div className="flex justify-center">
      <div ref={toggleGroupRef} className="absolute">
        {showToggle && <ToggleComponent />}
      </div>

      <div className="flex flex-col px-24 py-12 w-5/6" ref={pageRef}>
        <span className="text-md self-end py-5">{isSaved}</span>
        <input
          type="text"
          className="focus:outline-none font-bold text-4xl mb-5 placeholder:text-stone-300 dark:placeholder:text-zinc-700"
          autoFocus
          onChange={(e) => setText(e.target.value)}
          placeholder="Untitled"
        />
        {/* <p className="text-xl">{count}</p> */}
      </div>
    </div>
  )
}

export default NewBlogPage
