"use client"

import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import React, { useMemo } from "react"

import NotificationDropdown from "@/components/notification-dropdown"
import { AnimatedListItem } from "@/components/ui/animated-list-item"
import { Button, buttonVariants } from "@/components/ui/button"
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
import { SUBJECTS_NAVBAR_ITEMS } from "@/lib/config/navbar-config"
import { cn } from "@/lib/utils"
import { Classroom, INotification } from "@/types"
import { User } from "@/types/User"
import { MenuItem } from "@/types/dropdown-menu"
import PagedResponse from "@/types/paged-response"
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
  myClassroomData?: PagedResponse<Classroom>
  notification?: {
    unreadCount: number
    notification?: PagedResponse<INotification>
  }
}

export default function LoggedInNavbar({
  className,
  user,
  items = [],
  menuItems = [],
  myClassroomData,
  notification,
}: Props) {
  const segment = useSelectedLayoutSegment()
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
        <NotificationDropdown unreadCount={notification?.unreadCount || 0} />
        <UserDropdown user={user!} menuItems={menuItems} />
      </>
    )
  }, [menuItems, notification?.unreadCount, user])

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
            <ul className="grid min-h-[200px] w-[400px] grid-rows-4 gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <div className="row-span-5 h-fit">
                {myClassroomData?.data.map((passingClassroomData) => (
                  <div key={passingClassroomData.id}>
                    <div>
                      <LoggedInAnimatedListItemMyClassroom
                        key={passingClassroomData.id}
                        {...passingClassroomData}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <li className="row-span-5 flex flex-col items-center justify-center gap-6 bg-dot-slate-300">
                <div className="space-y-2 px-4">
                  <h3 className="text-2xl font-bold text-emerald-500">
                    {tNav("buy-premium.title")}
                  </h3>
                  <h3 className="text-sm text-neutral-500">
                    {tNav("buy-premium.description")}
                  </h3>
                </div>
                <Link href={`/profile/account`}>
                  <Button className="bg-emerald-500 hover:bg-emerald-500/80">
                    {tNav("buy-premium.action")}
                  </Button>
                </Link>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>{tNav("subjects")}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {SUBJECTS_NAVBAR_ITEMS.map((data) => {
                return (
                  <LoggedInAnimatedListItemSubject
                    key={data.title}
                    {...data}
                    title={tNav(data.title as any)}
                  />
                )
              })}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </>
    )
  }, [items, myClassroomData, tNav])

  return (
    <NavigationMenu
      className={cn(
        "duration-600 container z-[1] mx-auto w-full justify-between py-2 transition-all ease-in-out",
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
