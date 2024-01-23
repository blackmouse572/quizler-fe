import { Pathnames } from "next-intl/navigation"

export const locales = ["en", "vi"] as const

export const pathnames = {
  "/": "/",
  "/path": {
    en: "/en",
    vi: "/vi",
  },
} satisfies Pathnames<typeof locales>

// Use the default: `always`
export const localePrefix = undefined

export type AppPathnames = keyof typeof pathnames
