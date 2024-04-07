import { useTranslations } from "next-intl"
import Link from "next/link"
import { useCallback } from "react"

import logoutAction from "@/components/logout-btn/logout-action"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/ui/icons"
import { getShortName } from "@/lib/string-helper"
import { User } from "@/types"
import { MenuItem } from "@/types/dropdown-menu"
import { useRouter } from "next/navigation"
import React from "react"

type Props = {
  user: User
  menuItems: MenuItem[][]
}

function AdminSidebarDropdown({ user, menuItems }: Props) {
  const t = useTranslations("AdminSidebar")
  const router = useRouter()
  function logout() {
    logoutAction().then(() => {
      router.refresh()
    })
  }
  const renderMenuItem = useCallback(
    ({ icon, href, label, shortcut }: MenuItem) => {
      const Icon = icon ? Icons[icon] : undefined
      if (!href)
        return (
          <DropdownMenuItem key={label}>
            {Icon && <Icon className="mr-2 inline-block h-4 w-4" />}
            <span>{label}</span>
            <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut>
          </DropdownMenuItem>
        )

      return (
        <DropdownMenuItem key={label} asChild>
          <Link href={href}>
            {Icon && <Icon className="mr-2 inline-block h-4 w-4" />}
            <span>{label}</span>
            <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut>
          </Link>
        </DropdownMenuItem>
      )
    },
    []
  )
  const renderMenuItems = () => {
    return menuItems.map((menuItem, index) => {
      if (menuItem.length === 1 && menuItem[0].children === undefined) {
        return renderMenuItem(menuItem[0])
      }
      return (
        <React.Fragment key={"wrapper" + index}>
          <DropdownMenuGroup>
            {menuItem.map(({ icon, children, href, label, shortcut }, i) => {
              const Icon = icon ? Icons[icon] : undefined
              return children !== undefined ? (
                <DropdownMenuSub key={label}>
                  <DropdownMenuSubTrigger>
                    {Icon && <Icon className="mr-2 inline-block h-4 w-4" />}
                    <span>{label}</span>
                    <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent
                    sideOffset={5}
                    className="min-w-[100px]"
                  >
                    {children.map((item) => {
                      return renderMenuItem(item)
                    })}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              ) : (
                renderMenuItem({ icon, href, label, shortcut })
              )
            })}
          </DropdownMenuGroup>
          {index < menuItems.length - 1 && <DropdownMenuSeparator />}
        </React.Fragment>
      )
    })
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="absolute bottom-24 px-2.5">
        <Avatar>
          <AvatarImage src={user?.avatar || ""} alt={user?.fullName} />
          <AvatarFallback className="bg-gradient-to-bl ">
            <span className="text-white">{getShortName(user.fullName)}</span>
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[12rem]">
        <div>
          <DropdownMenuLabel className="pb-0">
            {t("dropdown.my_account")}
          </DropdownMenuLabel>
          <DropdownMenuLabel className="max-w-[150px] text-wrap pt-0 text-xs font-medium text-neutral-500">
            {user.email}
          </DropdownMenuLabel>
        </div>
        <DropdownMenuSeparator />
        {renderMenuItems()}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="focus:bg-danger-500/20 focus:text-danger-500"
          onClick={logout}
        >
          <Icons.Logout className="mr-2 inline-block h-4 w-4" />
          {t("dropdown.signout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AdminSidebarDropdown