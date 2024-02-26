"use client"

import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import React, { useMemo } from "react"

import { AnimatedListItem } from "@/components/ui/animated-list-item"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { IIconKeys, Icons } from "@/components/ui/icons"
import { ListItem } from "@/components/ui/list-item"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import UserDropdown from "@/components/user-dropdown"
import { cn } from "@/lib/utils"
import { User } from "@/types/User"
import { MenuItem } from "@/types/dropdown-menu"
import { useMotionValueEvent, useScroll } from "framer-motion"
import { useTranslations } from "next-intl"

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
}

function Navbar({
  className,
  isAuthed,
  user,
  items = [],
  menuItems = [],
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
    if (!isAuthed || !user)
      return (
        <>
          <NavigationMenuItem asChild>
            <Link href="signup">
              <Button variant="default" color={"primary"}>
                {tNav("signup")}
              </Button>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem asChild>
            <Link href="login">
              <Button
                variant="default"
                className="shadow-none hover:bg-slate-300"
                color={"accent"}
              >
                {tNav("signin")}
              </Button>
            </Link>
          </NavigationMenuItem>
        </>
      )
    else return <UserDropdown user={user} menuItems={menuItems} />
  }, [isAuthed, menuItems, tNav, user])

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
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            {tNav("getting_started")}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 rounded-lg p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="relative flex h-full w-full select-none flex-col justify-end rounded-md bg-white from-muted/50 to-muted p-6 no-underline outline-none transition-all duration-500 ease-in bg-dot-black/[0.2] focus:shadow-md dark:bg-black dark:bg-dot-white/[0.2]"
                    href="/"
                  >
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white duration-500 ease-in-out [mask-image:linear-gradient(to_bottom_left,white_20%,transparent_30%)] dark:bg-black"></div>

                    <div className="mb-2 mt-4 text-lg font-bold">
                      {tIndex("title")}
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      {tIndex("description")}
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem
                href="/docs"
                title={tNav("getting_started_sec.introduction.title")}
              >
                {tNav("getting_started_sec.introduction.description")}
              </ListItem>
              <ListItem
                href="/docs/installation"
                title={tNav("getting_started_sec.classroom.title")}
              >
                {tNav("getting_started_sec.classroom.description")}
              </ListItem>
              <ListItem
                href="/docs/primitives/typography"
                title={tNav("getting_started_sec.ai.title")}
              >
                <span>{tNav("getting_started_sec.ai.description")}</span>
                <Badge size="sm" color="danger" className="mx-2 rounded-sm">
                  Beta
                </Badge>
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{tNav("how_it_work")}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {items.map((item) => (
                <AnimatedListItem key={item.title} {...item} />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              {tNav("doc")}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuList className="space-x-2">
        {renderRightContent}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default Navbar
