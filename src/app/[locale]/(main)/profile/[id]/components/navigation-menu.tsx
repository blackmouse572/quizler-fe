"use client"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { GearIcon, PersonIcon } from "@radix-ui/react-icons"
import { useTranslations } from "next-intl"
import { PiFingerprint } from "react-icons/pi"
import EditAccount from "./edit-account"
import EditProfile from "./edit-profile"
import EditPreference from "./edit-preference"
import { User } from "@/types"
import { useCallback, useState } from "react"

type Props = {
  userData: User
  locale: string
}

type TooltipProps = {
  icon: React.ReactNode
  tooltipContent: string
  handleClick: (id: string) => void
  nextSelectId: string
}

const TooltipButton = ({
  icon,
  tooltipContent,
  handleClick,
  nextSelectId,
}: TooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={"ghost"}
            className="mt-2.5 flex h-10 w-10/12 justify-center gap-2.5 rounded-xl p-1.5 shadow-sm"
            onClick={() => handleClick(nextSelectId)}
          >
            {icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipContent}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default function NavigationMenu({ userData, locale }: Props) {
  const t = useTranslations("Settings")
  const [selectedId, setSelectedId] = useState("2")

  const handleNavigationClick = useCallback((id: string) => {
    setSelectedId(id)
  }, [])

  return (
    <>
      <div className="ml-20 mt-5 fixed w-16 flex-col items-start self-start rounded-lg border border-solid border-neutral-300 bg-neutral-50 py-3 pl-3 shadow-md max-md:ml-2.5">
        <TooltipButton
          icon={<PersonIcon />}
          tooltipContent={t("navigation_menu.edit_account")}
          handleClick={handleNavigationClick}
          nextSelectId={"1"}
        />
        <TooltipButton
          icon={<PiFingerprint />}
          tooltipContent={t("navigation_menu.edit_profile")}
          handleClick={handleNavigationClick}
          nextSelectId={"2"}
        />
        <TooltipButton
          icon={<GearIcon />}
          tooltipContent={t("navigation_menu.edit_preference")}
          handleClick={handleNavigationClick}
          nextSelectId={"3"}
        />
      </div>

      {selectedId === "1" && <EditAccount />}
      {selectedId === "2" && <EditProfile userData={userData} />}
      {selectedId === "3" && <EditPreference locale={locale} />}
    </>
  )
}
