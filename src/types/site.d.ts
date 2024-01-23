export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
  }
}

export type INextPage = {
  params?: any
  locale?: string
}
type INextLayout = INextPage & {
  children?: React.ReactNode
}

export default INextLayout
