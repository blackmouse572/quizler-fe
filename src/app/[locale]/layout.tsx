import { TailwindIndicator } from "@/components/tailwind-indicator"
import { Toaster } from "@/components/ui/toaster"
import { siteConfig } from "@/lib/config/siteconfig"
import { cn } from "@/lib/utils"
import { GeistMono } from "geist/font/mono"
import type { Metadata } from "next"
import { Montserrat, Plus_Jakarta_Sans } from "next/font/google"

import GoogleProvider from "@/app/[locale]/components/GoogleProvider"
import { Providers } from "@/app/[locale]/provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { getUser } from "@/lib/auth"
import { pick } from "lodash"
import { NextIntlClientProvider, useMessages } from "next-intl"
import "./global.css"

const montserrat = Montserrat({
  weight: ["400", "600", "700", "800", "900", "500", "300", "200"],
  variable: "--font-heading",
  subsets: ["latin-ext", "vietnamese"],
})

const plusJakarta = Plus_Jakarta_Sans({
  weight: ["400", "600", "700", "500", "300"],
  variable: "--font-sans",
  subsets: ["latin-ext", "vietnamese"],
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["Next.js"],
  authors: [
    {
      name: "blackmouse572",
      url: "https://ngocnt.dev",
    },
  ],
  manifest: `${siteConfig.url}/manifest.json`,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage }],
    creator: "@shadcn",
  },
}

type Props = {
  children: React.ReactNode
  params: {
    locale: string
  }
}
export default function LocaleLayout({ children, params: { locale } }: Props) {
  const messages = useMessages()
  const user = getUser()
  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn([
          "min-h-screen bg-background font-sans antialiased",
          montserrat.variable,
          plusJakarta.variable,
          GeistMono.variable,
        ])}
      >
        <GoogleProvider>
          <TooltipProvider>
            <Providers user={user}>
              <NextIntlClientProvider
                locale={locale}
                messages={pick(messages, "NotFound", "Error", "Errors")}
              >
                {children}
              </NextIntlClientProvider>
            </Providers>
          </TooltipProvider>
        </GoogleProvider>
        <Toaster />
        <TailwindIndicator />
      </body>
    </html>
  )
}
