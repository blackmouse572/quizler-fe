import { pick } from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import React from "react"

import Footer from "@/components/footer"
import { getNotificationAction } from "@/components/notification-dropdown/actions/get-notification-action"
import { getUnreadNotificationAction } from "@/components/notification-dropdown/actions/get-unread-notification-action"
import GuestNavbar, {
  MainNavItem,
} from "@/components/ui/guest-navbar/guest-navbar"
import LoggedInNavbar from "@/components/ui/logged-in-navbar/logged-in-navbar"
import { getUser, isAuthenticated } from "@/lib/auth"
import { MenuItem } from "@/types/dropdown-menu"
import { fetchMyClassrooms } from "./classrooms/actions/fetch-my-classroom"

type Props = {
  children?: React.ReactNode
}

async function getNavbarLoggedIn() {
  const myClassroomRes = await fetchMyClassrooms({ take: 4 })

  return myClassroomRes
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
        href: `/profile`,
        shortcut: "⌘+P",
      },
      {
        label: tUserDropdown("billing"),
        href: "/profile/account",
        shortcut: "⌘+B",
      },
      {
        label: tUserDropdown("settings"),
        href: `/profile/preference`,
        shortcut: "⌘+,",
      },
    ],
    [
      {
        label: tUserDropdown("classrooms.index"),
        children: [
          {
            label: tUserDropdown("classrooms.new"),
            href: "/classrooms/add",
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
            href: "/quizbank/add",
            icon: "Plus",
          },
          {
            label: tUserDropdown("quizbank.my_quizbanks"),
            href: "/quizbank",
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

  let myClassroomData = null
  let unreadCount = 0
  let notificationData
  if (isAuth && user) {
    const myClassroomRes = await getNavbarLoggedIn()
    const unreadRes = await getUnreadNotificationAction()
    const notificationRes = await getNotificationAction()
    if (unreadRes.ok) {
      unreadCount = unreadRes.data || 0
    }
    if (notificationRes.ok) {
      notificationData = notificationRes.data
    }
    myClassroomData = myClassroomRes.data
  }

  const navbarComponent =
    isAuth && user ? (
      <LoggedInNavbar
        className="fixed left-1/2 top-0 w-screen -translate-x-1/2"
        items={mainNavbarItems}
        menuItems={menuItems}
        isAuthed={isAuth}
        user={user}
        notification={{
          unreadCount,
          notification: notificationData,
        }}
        myClassroomData={myClassroomData!}
      />
    ) : (
      <GuestNavbar
        className="fixed left-1/2 top-0 w-screen -translate-x-1/2"
        items={mainNavbarItems}
      />
    )

  return (
    <main className="relative">
      <NextIntlClientProvider
        messages={pick(m, "UserDropdown", "Navbar", "Index", "Notification")}
      >
        {navbarComponent}
      </NextIntlClientProvider>
      <div className="relative z-0">{children}</div>
      {/* TODO: fix z-position of footer */}
      <footer className="z-10">
        <NextIntlClientProvider messages={pick(m, "Footer", "Index")}>
          <Footer className="z-10" />
        </NextIntlClientProvider>
      </footer>
    </main>
  )
}

export default MainLayout
