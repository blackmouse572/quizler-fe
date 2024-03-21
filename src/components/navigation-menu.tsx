"use client"

import { Button } from "@/components/ui/button"
import { IIconKeys, Icons } from "@/components/ui/icons"
import { NamedToolTip } from "@/components/ui/tooltip"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useMemo } from "react"

export default function NavigationMenu() {
  const t = useTranslations("Settings")

  const router = useRouter()

  const handleClick = (href: string) => {
    router.push(href)
  }

  const options = useMemo<
    {
      icon?: IIconKeys
      tooltipContent: string
      href?: string
    }[]
  >(
    () => [
      {
        icon: "NavAccount",
        tooltipContent: t("navigation_menu.edit_account"),
        href: `/profile/account`,
      },
      {
        icon: "NavProfile",
        tooltipContent: t("navigation_menu.edit_profile"),
        href: `/profile/`,
      },
      {
        icon: "NavPreference",
        tooltipContent: t("navigation_menu.edit_preference"),
        href: `/profile/preference`,
      },
    ],
    [t]
  )

  return (
    <>
      <div className="fixed left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 border-border bg-background p-3">
        {options.map(({ icon, tooltipContent, href }) => {
          const Icon = icon ? Icons[icon] : undefined
          return (
            <NamedToolTip content={tooltipContent}>
              <Button
                variant={"ghost"}
                onClick={() => handleClick(href!)}
                isIconOnly
              >
                {Icon && <Icon />}
              </Button>
            </NamedToolTip>
          )
        })}
      </div>
    </>
  )
}
