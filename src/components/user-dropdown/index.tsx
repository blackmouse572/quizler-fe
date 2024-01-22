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
import { MenuItem } from "@/types/dropdown-menu"
import { useRouter } from "next/navigation"
import React from "react"

type Props = {
  user: any
  menuItems: MenuItem[][]
}

function UserDropdown({ user, menuItems }: Props) {
  const t = useTranslations("UserDropdown")
  const router = useRouter()
  function logout() {
    logoutAction().then(() => {
      router.refresh()
    })
  }
  const renderMenuItem = useCallback(
    ({ icon, href: action, label, shortcut }: MenuItem) => {
      const Icon = icon ? Icons[icon] : undefined
      return (
        <DropdownMenuItem key={label} asChild>
          <Link href={action}>
            {Icon && <Icon className="inline-block h-4 w-4" />}
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
      if (menuItem.length === 1) {
        return renderMenuItem(menuItem[0])
      }
      return (
        <React.Fragment key={"wrapper" + index}>
          <DropdownMenuGroup>
            {menuItem.map(
              ({ icon, children, href: action, label, shortcut }, i) => {
                return children ? (
                  <DropdownMenuSub key={label}>
                    <DropdownMenuSubTrigger>
                      {renderMenuItem({
                        icon,
                        href: action,
                        label,
                        shortcut,
                      })}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      {children.map((item) => {
                        return renderMenuItem(item)
                      })}
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                ) : (
                  renderMenuItem({ icon, href: action, label, shortcut })
                )
              }
            )}
          </DropdownMenuGroup>
          {index < menuItems.length - 1 && <DropdownMenuSeparator />}
        </React.Fragment>
      )
    })
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.avatar} alt={user?.name} />
          <AvatarFallback className="bg-gradient-to-bl ">
            <span className="text-white">{getShortName(user.name)}</span>
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[12rem]">
        <DropdownMenuLabel>{t("my_account")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {renderMenuItems()}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="focus:bg-danger-500/20 focus:text-danger-500"
          onClick={logout}
        >
          <Icons.Logout className="mr-2 inline-block h-4 w-4" />
          {t("signout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserDropdown
