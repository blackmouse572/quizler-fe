import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { User } from "@/types"
import { MenuItem } from "@/types/dropdown-menu"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import React from "react"
import { Button } from "../ui/button"
import { BellIcon } from "@radix-ui/react-icons"
import { useTranslations } from "next-intl"

type Props = {
  user: User
  menuItems: MenuItem[][]
}

type Checked = DropdownMenuCheckboxItemProps["checked"]

export default function NotificationDropdown({ user, menuItems }: Props) {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
  const [showPanel, setShowPanel] = React.useState<Checked>(false)
  const t = useTranslations("Navbar")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="light">
          <BellIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{t("notification")}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* set loading here */}
        <DropdownMenuCheckboxItem
          checked={showStatusBar}
          onCheckedChange={setShowStatusBar}
        >
          Status Bar
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          checked={showActivityBar}
          onCheckedChange={setShowActivityBar}
          disabled
        >
          Activity Bar
        </DropdownMenuCheckboxItem>
        
        <DropdownMenuCheckboxItem
          checked={showPanel}
          onCheckedChange={setShowPanel}
        >
          Panel
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
