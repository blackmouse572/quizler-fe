"use client"

import { Button } from "@/components/ui/button"
import {
  NamedToolTip
} from "@/components/ui/tooltip"
import { useTranslations } from "next-intl"
import { User } from "@/types"
import { useRouter } from "next/navigation"
import { IIconKeys, Icons } from "@/components/ui/icons"
import { useMemo } from "react"

type Props = {
  userData: User
  locale: string
}

export default function NavigationMenu({ userData }: Props) {
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
        href: `/profile/${userData.id}/account`,
      },
      {
        icon: "NavProfile",
        tooltipContent: t("navigation_menu.edit_profile"),
        href: `/profile/${userData.id}/profile`,
      },
      {
        icon: "NavPreference",
        tooltipContent: t("navigation_menu.edit_preference"),
        href: `/profile/${userData.id}/preference`,
      },
    ],
    [t, userData.id]
  )

  return (
    <>
      <div className="fixed ml-20 mt-5 w-16 flex-col items-start self-start rounded-lg border border-solid border-neutral-300 bg-neutral-50 py-3 pl-3 shadow-md max-md:ml-2.5">
        {options.map(({ icon, tooltipContent, href }) => {
          const Icon = icon ? Icons[icon] : undefined
          return (
            <NamedToolTip content={tooltipContent}>
              <Button
                variant={"ghost"}
                className="mt-2.5 flex h-10 w-10/12 justify-center gap-2.5 rounded-xl p-1.5 shadow-sm"
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
