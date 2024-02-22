import { pick } from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import React from "react"

import Navbar, { MainNavItem } from "@/components/nav-bar"
import { getUser, isAuthenticated } from "@/lib/auth"
import { MenuItem } from "@/types/dropdown-menu"

type Props = {
  children?: React.ReactNode
}

async function MainLayout({ children }: Props) {
  const tUserDropdown = await getTranslations("UserDropdown")
  const tNav = await getTranslations("Navbar")
  const isAuth = isAuthenticated()
  const user = getUser()
  const m = await getMessages()
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
        label: tUserDropdown("classrooms.index"),
        children: [
          {
            label: tUserDropdown("classrooms.new"),
            href: "/classrooms/create",
            icon: "Plus",
          },
          {
            label: tUserDropdown("classrooms.my_classrooms"),
            href: "/classrooms",
            icon: "School",
          },
        ],
      },
      {
        label: tUserDropdown("quizbank.index"),
        children: [
          {
            label: tUserDropdown("quizbank.new"),
            href: "/quiz/add",
            icon: "Plus",
          },
          {
            label: tUserDropdown("quizbank.my_quizbanks"),
            href: "/quiz",
            icon: "Icon",
          },
        ],
      },
    ],
    [
      {
        label: tUserDropdown("support"),
        href: "/support",
        icon: "Support",
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
    <main className="relative">
      <NextIntlClientProvider
        messages={pick(m, "UserDropdown", "Navbar", "Index")}
      >
        <Navbar
          className="fixed left-1/2 top-0 w-screen -translate-x-1/2"
          items={mainNavbarItems}
          menuItems={menuItems}
          isAuthed={isAuth}
          user={user}
        />
      </NextIntlClientProvider>
      {children}
    </main>
  )
}

export default MainLayout
