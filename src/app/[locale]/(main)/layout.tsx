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
        label: tUserDropdown("profile"),
        href: "/profile",
        shortcut: "⌘+P",
      },
      {
        label: tUserDropdown("billing"),
        href: "/billing",
        shortcut: "⌘+B",
      },
      {
        label: tUserDropdown("settings"),
        href: "/settings",
        shortcut: "⌘+,",
      },
    ],
    [
      {
        label: tUserDropdown("classrooms"),
        href: "/classrooms",
      },
      {
        label: tUserDropdown("invite"),
        href: "/invite",
      },
    ],
    [
      {
        label: tUserDropdown("faq"),
        href: "/help",
      },
      {
        label: tUserDropdown("support"),
        href: "/support",
      },
    ],
  ]

  const mainNavbarItems: MainNavItem[] = [
    {
      title: tNav("home"),
      href: "/",
      icon: "Home",
    },
    {
      title: tNav("about"),
      icon: "About",
      href: "/about",
    },
    {
      title: tNav("contact"),
      href: "/contact",
      icon: "Contact",
    },
    {
      title: tNav("classrooms"),
      href: "/classrooms",
      icon: "School",
    },
  ]

  return (
    <main className="relative min-h-screen">
      <NextIntlClientProvider
        messages={pick(m, "UserDropdown", "Navbar", "Index")}
      >
        <Navbar
          className="fixed left-1/2 top-0 -translate-x-1/2"
          items={mainNavbarItems}
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
