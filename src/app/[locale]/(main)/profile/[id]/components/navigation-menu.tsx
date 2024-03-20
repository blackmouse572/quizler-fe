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
import { User } from "@/types"
import { useRouter } from "next/navigation"

type Props = {
  userData: User
  locale: string
}

type TooltipProps = {
  icon: React.ReactNode
  tooltipContent: string,
  href: string
}

const TooltipButton = ({
  icon,
  tooltipContent,
  href
}: TooltipProps) => {
  const router = useRouter()

  const handleClick = () => {
    router.push(href)
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={"ghost"}
            className="mt-2.5 flex h-10 w-10/12 justify-center gap-2.5 rounded-xl p-1.5 shadow-sm"
            onClick={handleClick}
            isIconOnly
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

export default function NavigationMenu({ userData }: Props) {
  const t = useTranslations("Settings")

  return (
    <>
      <div className="ml-20 mt-5 fixed w-16 flex-col items-start self-start rounded-lg border border-solid border-neutral-300 bg-neutral-50 py-3 pl-3 shadow-md max-md:ml-2.5">
        <TooltipButton
          icon={<PersonIcon />}
          tooltipContent={t("navigation_menu.edit_account")}
          href={`/profile/${userData.id}/account`}
        />
        <TooltipButton
          icon={<PiFingerprint />}
          tooltipContent={t("navigation_menu.edit_profile")}
          href={`/profile/${userData.id}/profile`}
        />
        <TooltipButton
          icon={<GearIcon />}
          tooltipContent={t("navigation_menu.edit_preference")}
          href={`/profile/${userData.id}/preference`}
        />
      </div>
    </>
  )
}
