"use client"

import { Button } from "@/components/ui/button"
import { IIconKeys, Icons } from "@/components/ui/icons"
import { NamedToolTip } from "@/components/ui/tooltip"
import { useTranslations } from "next-intl"
import { useRouter, useSelectedLayoutSegment } from "next/navigation"
import { useMemo } from "react"

export default function NavigationMenu() {
  const t = useTranslations("Settings")

  const router = useRouter()
  const selectedLayout = useSelectedLayoutSegment()

  const handleClick = (href: string) => {
    router.push(href)
  }

  const options = useMemo<
    {
      icon?: IIconKeys
      tooltipContent: string
      href?: string
      active?: boolean
    }[]
  >(
    () => [
      {
        icon: "NavAccount",
        tooltipContent: t("navigation_menu.edit_account"),
        href: `/profile/account`,
        active: selectedLayout === "account",
      },
      {
        icon: "NavProfile",
        tooltipContent: t("navigation_menu.edit_profile"),
        href: `/profile/`,
        active: selectedLayout === null,
      },
      {
        icon: "NavPreference",
        tooltipContent: t("navigation_menu.edit_preference"),
        href: `/profile/preference`,
        active: selectedLayout === "preference",
      },
    ],
    [t, selectedLayout]
  )
  console.log({ selectedLayout })
  return (
    <div className="fixed left-20 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md border border-input bg-background p-3 shadow-lg">
      <div className="relative flex flex-col gap-4">
        {options.map(({ icon, active, tooltipContent, href }) => {
          const Icon = icon ? Icons[icon] : undefined
          return (
            <NamedToolTip content={tooltipContent} side="left">
              <Button
                variant={active ? "default" : "ghost"}
                onClick={() => handleClick(href!)}
                isIconOnly
              >
                {Icon && <Icon />}
              </Button>
            </NamedToolTip>
          )
        })}
      </div>
    </div>
  )
}
