"use client"

import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import React, { useMemo } from "react"

import NotificationDropdown from "@/components/notification-dropdown"
import { AnimatedListItem } from "@/components/ui/animated-list-item"
import { buttonVariants } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { IIconKeys, Icons } from "@/components/ui/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import UserDropdown from "@/components/user-dropdown"
import { cn } from "@/lib/utils"
import { User } from "@/types/User"
import { MenuItem } from "@/types/dropdown-menu"
import { MyClassrooms } from "@/types/my-classrooms"
import { useMotionValueEvent, useScroll } from "framer-motion"
import { useTranslations } from "next-intl"
import GlobalSearch from "./global-search"
import { LoggedInAnimatedListItemMyClassroom } from "./logged-in-animated-list-item-my-classroom"
import { LoggedInAnimatedListItemSubject } from "./logged-in-animated-list-item-subject"

export type MainNavItem = {
  title: string
  icon?: IIconKeys
  href: string
  description?: string
  disabled?: boolean
}

type Props = {
  items?: MainNavItem[]
  className?: string
  isAuthed?: boolean
  user?: User
  menuItems?: MenuItem[][]
  myClassroomData?: MyClassrooms
}

export default function LoggedInNavbar({
  className,
  user,
  items = [],
  menuItems = [],
  myClassroomData,
}: Props) {
  const segment = useSelectedLayoutSegment()
  // const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)
  const tNav = useTranslations("Navbar")
  const tIndex = useTranslations("Index")
  const { scrollY } = useScroll()
  const [hidden, setHidden] = React.useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious()
    if (prev === undefined) return
    if (latest > prev && latest > 100) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })
  const renderRightContent = useMemo(() => {
    return (
      <>
        <NotificationDropdown user={user!} menuItems={menuItems} />
        <UserDropdown user={user!} menuItems={menuItems} />
      </>
    )
  }, [menuItems, user])

  const renderDrawerMenu = useMemo(() => {
    return (
      <Drawer>
        <DrawerTrigger
          className={buttonVariants({
            isIconOnly: true,
            variant: "flat",
          })}
        >
          <Icons.Menu className="h-5 w-5 min-w-5" />
        </DrawerTrigger>
        <DrawerContent>
          <ul className="grid grid-cols-2 gap-4 px-4 py-8 [&_svg]:h-6 [&_svg]:w-6 [&_svg]:text-emerald-500">
            <li className="scale-100 rounded-md bg-neutral-100 px-4 py-3 transition-all ease-linear hover:bg-neutral-200/60 hover:shadow-sm focus:scale-95">
              <NavigationMenuLink asChild>
                <Link href="/" className="flex flex-col gap-2">
                  <Icons.Search />
                  <span className="font-bold">{tNav("getting_started")}</span>
                </Link>
              </NavigationMenuLink>
            </li>
            <li className="scale-100 rounded-md bg-neutral-100 px-4 py-3 transition-all ease-linear hover:bg-neutral-200/60 hover:shadow-sm focus:scale-95">
              <NavigationMenuLink asChild>
                <Link href="/docs" className="flex flex-col gap-2">
                  <Icons.Document />
                  <span className="font-bold">{tNav("doc")}</span>
                </Link>
              </NavigationMenuLink>
            </li>

            <li className="scale-100 rounded-md bg-neutral-100 px-4 py-3 transition-all ease-linear hover:bg-neutral-200/60 hover:shadow-sm focus:scale-95">
              <NavigationMenuLink asChild>
                <Link href="/about" className="flex flex-col gap-2">
                  <Icons.CircleOff />
                  <span className="font-bold">{tNav("about")}</span>
                </Link>
              </NavigationMenuLink>
            </li>

            <li className="scale-100 rounded-md bg-neutral-100 px-4 py-3 transition-all ease-linear hover:bg-neutral-200/60 hover:shadow-sm focus:scale-95">
              <NavigationMenuLink asChild>
                <Link href="/classrooms" className="flex flex-col gap-2">
                  <Icons.School />
                  <span className="font-bold">{tNav("classrooms")}</span>
                </Link>
              </NavigationMenuLink>
            </li>
          </ul>
        </DrawerContent>
      </Drawer>
    )
  }, [tNav])

  const renderMiddleMenu = useMemo(() => {
    const subjects = [
      { id: "1", title: tNav("subject_item.Math"), href: "/quizbank" },
      { id: "2", title: tNav("subject_item.Literatue"), href: "/quizbank" },
      { id: "3", title: tNav("subject_item.Science"), href: "/quizbank" },
      { id: "4", title: tNav("subject_item.Other"), href: "/quizbank" },
    ]

    return (
      <>
        <GlobalSearch className={"hidden text-sm md:flex"} />
        <NavigationMenuItem>
          <NavigationMenuTrigger>{tNav("my_quizlearn")}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {items!.map((item) => (
                <AnimatedListItem key={item.title} {...item} />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>{tNav("my_classrooms")}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {myClassroomData!.data.slice(0, 4).map((passingClassroomData) => (
                <div key={passingClassroomData.id}>
                  <div>
                    <LoggedInAnimatedListItemMyClassroom
                      key={passingClassroomData.id}
                      {...passingClassroomData}
                    />
                  </div>
                </div>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>{tNav("subjects")}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {subjects.map((data) => (
                <LoggedInAnimatedListItemSubject key={data.id} {...data} />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </>
    )
  }, [items, myClassroomData, tNav])

  return (
    <NavigationMenu
      className={cn(
        "duration-600 container z-[100] mx-auto w-full justify-between py-2 transition-all ease-in-out",
        segment === null && "bg-transparent",
        segment !== null && "backdrop-blur-sm",
        hidden ? "-translate-y-16 opacity-10" : "translate-y-0 opacity-100",
        className
      )}
    >
      <NavigationMenuList className="flex items-center space-x-2">
        <NavigationMenuItem className="flex md:hidden">
          {renderDrawerMenu}
        </NavigationMenuItem>

        <NavigationMenuLink asChild>
          <Link href="/" className="flex items-center rounded-sm p-1.5">
            <Icons.Icon className="mr-2 h-6 w-6" />
            <span className="font-bold">{tIndex("title")}</span>
          </Link>
        </NavigationMenuLink>
      </NavigationMenuList>

      <NavigationMenuList className="hidden md:flex">
        {renderMiddleMenu}
      </NavigationMenuList>

      <NavigationMenuList className="space-x-2">
        {renderRightContent}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
