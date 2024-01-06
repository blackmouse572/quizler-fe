"use client"

import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import React, { useMemo } from "react"

import { AnimatedListItem } from "@/components/ui/animated-list-item"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import { MenuItem } from "@/types/dropdown-menu"
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
  menuItems?: MenuItem[][]
}

function Navbar({ className, isAuthed, items = [], menuItems = [] }: Props) {
  const segment = useSelectedLayoutSegment()
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)
  const tNav = useTranslations("Navbar")
  const tIndex = useTranslations("Index")
  const renderRightContent = useMemo(() => {
    if (!isAuthed)
      return (
        <>
          <NavigationMenuItem asChild>
            <Link href="signup">
              <Button variant="default" color={"primary"}>
                Sign up
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
                Sign in
              </Button>
            </Link>
          </NavigationMenuItem>
        </>
      )
    else
      return (
        <UserDropdown
          user={{
            name: "Huy Nguyen",
            email: "",
          }}
          menuItems={menuItems}
        />
      )
  }, [isAuthed, menuItems])

  return (
    <NavigationMenu
      className={cn(
        "container z-[100] mx-auto w-full justify-between py-4",
        className
      )}
    >
      <NavigationMenuLink asChild>
        <Link href="/" className="flex items-center rounded-sm p-1.5">
          <Icons.Icon className="mr-2 h-6 w-6" />
          <span className="font-bold">{tIndex("title")}</span>
        </Link>
      </NavigationMenuLink>
      <NavigationMenuList>
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
                <AnimatedListItem {...item} />
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
