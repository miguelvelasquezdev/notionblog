export type Blocks = {
  object: string
  results: Result[]
  next_cursor?: any
  has_more: boolean
  type: string
  block: Block
}

type Block = {}

type Result = {
  object: string
  id: string
  parent: Parent
  created_time: string
  last_edited_time: string
  created_by: Createdby
  last_edited_by: Createdby
  has_children: boolean
  archived: boolean
  type: string
  bookmark?: Bookmark
  paragraph?: Paragraph
  image?: Image
  heading_1?: Heading
  heading_2?: Heading
  heading_3?: Heading
  callout?: Callout
  bulleted_list_item?: Paragraph
  numbered_list_item?: Paragraph
  child_page?: Childpage
}

type Icon = {
  emoji: string
  type: 'emoji'
}

type Callout = {
  icon: Icon
  color: string
  rich_text: Richtext[]
}

type Childpage = {
  title: string
}

type Heading = {
  rich_text: Richtext[]
  is_toggleable: boolean
  color: string
}

type Image = {
  caption: any[]
  type: string
  file: File
}

type File = {
  url: string
  expiry_time: string
}

type Paragraph = {
  rich_text: Richtext[]
  color: string
}

type Richtext = {
  type: string
  text: Text
  annotations: Annotations
  plain_text: string
  href?: any
}

type Annotations = {
  bold: boolean
  italic: boolean
  strikethrough: boolean
  underline: boolean
  code: boolean
  color: string
}

type Text = {
  content: string
  link?: any
}

type Bookmark = {
  caption: any[]
  url: string
}

type Createdby = {
  object: string
  id: string
}

type Parent = {
  type: string
  page_id: string
}
