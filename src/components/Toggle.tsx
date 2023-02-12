import React from 'react'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import {
  HeadingIcon,
  ChevronDownIcon,
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
} from '@radix-ui/react-icons'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useStore } from '../store/store'

const ToggleComponent = () => {
  const increment = useStore((state) => state.increment)

  return (
    <ToggleGroup.Root
      className="ToggleGroup inline-flex rounded bg-zinc-300 dark:bg-zinc-600"
      type="single"
      defaultValue="center"
      aria-label="Text alignment"
    >
      <DropdownMenu.Root>
        <ToggleGroup.Item
          value="text"
          className="ToggleGroupItem h-7 text-sm items-center justify-center w-12 flex bg-white dark:bg-zinc-800 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-500 px-2"
          asChild
        >
          <DropdownMenu.Trigger>
            Text
            <span className="ml-1">
              <ChevronDownIcon></ChevronDownIcon>
            </span>
          </DropdownMenu.Trigger>
        </ToggleGroup.Item>
        <DropdownMenu.Content className="DropdownMenuContent bg-zinc-100 dark:bg-zinc-800">
          <ToggleGroup.Item
            value="heading1"
            className="DropdownMenuItem mt-px hover:bg-white dark:hover:bg-zinc-900"
          >
            <HeadingIcon className="mr-1 data-[state='on']:text-red" />
            Heading 1
          </ToggleGroup.Item>
          <ToggleGroup.Item
            value="heading2"
            className="DropdownMenuItem mt-px hover:bg-white dark:hover:bg-zinc-900"
          >
            <HeadingIcon className="mr-1" />
            Heading 2
          </ToggleGroup.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <ToggleGroup.Item
        className="ToggleGroupItem h-7 w-7 flex bg-white items-center justify-center ml-px dark:bg-zinc-800 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-500"
        value="bold"
        aria-label="Bold"
        onClick={() => increment()}
      >
        <FontBoldIcon />
      </ToggleGroup.Item>
      <ToggleGroup.Item
        className="ToggleGroupItem h-7 w-7 flex bg-white items-center justify-center ml-px dark:bg-zinc-800 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-500"
        value="center"
        aria-label="Center aligned"
      >
        <FontItalicIcon />
      </ToggleGroup.Item>
      <ToggleGroup.Item
        className="ToggleGroupItem h-7 w-7 flex bg-white items-center justify-center ml-px dark:bg-zinc-800 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-500"
        value="right"
        aria-label="Right aligned"
      >
        <UnderlineIcon />
      </ToggleGroup.Item>
      <ToggleGroup.Item
        className="ToggleGroupItem h-7 w-7 flex bg-white items-center justify-center ml-px dark:bg-zinc-800 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-500"
        value="strikethrough"
        aria-label="strikethrough"
      >
        <StrikethroughIcon />
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  )
}

export default ToggleComponent
