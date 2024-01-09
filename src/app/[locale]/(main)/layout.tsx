import { pick } from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import React from "react"

import Navbar from "@/components/nav-bar"
import { getTokens, isAuthenticated } from "@/lib/auth"
import { MAIN_NAVBAR_ITEMS } from "@/lib/config/navbar-config"
import { getUserProfile } from "@/services/account.service"
import { MenuItem } from "@/types/dropdown-menu"

type Props = {
  children?: React.ReactNode
}

async function MainLayout({ children }: Props) {
  const isAuth = isAuthenticated()
  const { accessToken } = getTokens()
  const [m, t, profile] = await Promise.all([
    getMessages(),
    getTranslations("UserDropdown"),
    accessToken && getUserProfile(accessToken),
  ])
  const menuItems: MenuItem[][] = [
    [
      {
        label: t("profile"),
        href: "/profile",
        shortcut: "⌘+P",
      },
      {
        label: t("billing"),
        href: "/billing",
        shortcut: "⌘+B",
      },
      {
        label: t("settings"),
        href: "/settings",
        shortcut: "⌘+,",
      },
    ],
    [
      {
        label: t("classrooms"),
        href: "/classrooms",
      },
      {
        label: t("invite"),
        href: "/invite",
      },
    ],
    [
      {
        label: t("faq"),
        href: "/help",
      },
      {
        label: t("support"),
        href: "/support",
      },
    ],
  ]
  return (
    <main className="relative min-h-screen">
      <NextIntlClientProvider messages={pick(m, "UserDropdown")}>
        <Navbar
          className="fixed left-1/2 top-0 -translate-x-1/2"
          items={MAIN_NAVBAR_ITEMS}
          menuItems={menuItems}
          isAuthed={isAuth}
          profile={profile}
        />
      </NextIntlClientProvider>
      {children}
    </main>
  )
}

export default MainLayout
