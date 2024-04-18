export const rootDocsRoute = "/docs"

export type TDocLink = {
    title: string,
    link: string
    children?: TDocLink[]
}

export const navigationLink: TDocLink[] = [
  {
    title: "Getting Started",
    link: `${rootDocsRoute}/getting-started`,
    children: [
      {
        title: "AI",
        link: `${rootDocsRoute}/ai`,
      },
    ],
  },
]
