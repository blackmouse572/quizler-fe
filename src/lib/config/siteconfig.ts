import { env } from "process"

import { SiteConfig } from "@/types/site"

export const siteConfig: SiteConfig = {
  name: "Quizlearn",
  description:
    "Quiz-based Learning and Practice System using NextJS framework, ASP.NET Core Web API and PostgreSQL database",
  url: env.SITE_URL || "http://localhost:3000",
  ogImage: env.SITE_URL
    ? `${env.SITE_URL}/og.png`
    : "http://localhost:3000/og.png",
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/taxonomy",
  },
}
