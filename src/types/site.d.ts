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
export type INextLayout = INextPage & {
  children?: React.ReactNode
}
