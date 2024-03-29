"use client"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { User } from "@/types"
import {
  CalendarIcon,
  EnvelopeClosedIcon,
  EnvelopeOpenIcon,
  PersonIcon,
} from "@radix-ui/react-icons"
import { format } from "date-fns"
import { useTranslations } from "next-intl"
import UpdateUserDialog from "./update-profile-dialog"

type Props = {
  userData: User
}

type SettingsProps = React.ComponentPropsWithoutRef<"a"> & {
  icon: React.ReactNode
  label: string
  value: string
}

const ContactInfo = ({ icon, label, value }: SettingsProps) => (
  <div className="flex justify-between gap-5 whitespace-nowrap text-base leading-6 text-black max-md:flex-wrap">
    <div className="flex justify-center gap-1 font-semibold">
      {icon}
      <div>{label}:</div>
    </div>
    <div>{value}</div>
  </div>
)

export default function EditProfile({ userData }: Props) {
  const i18n = useTranslations("Settings")

  return (
    <div className="w-full space-y-4">
      <div className="flex max-w-full items-start justify-between border-b border-solid border-neutral-400  pb-2.5 max-md:flex-wrap">
        <div className="text-xl font-semibold leading-8 text-black">
          {i18n("profile.title")}
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <UpdateUserDialog userData={userData} />
            </TooltipTrigger>
            <TooltipContent>
              <p>{i18n("profile.edit_profile")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <ContactInfo
        icon={
          <EnvelopeOpenIcon className="my-auto aspect-square w-4 shrink-0" />
        }
        label={i18n("profile.label.email")}
        value={userData.email}
      />

      <ContactInfo
        icon={
          <EnvelopeClosedIcon className="my-auto aspect-square w-4 shrink-0" />
        }
        label={i18n("profile.label.username")}
        value={userData.username}
      />

      <ContactInfo
        icon={<PersonIcon className="my-auto aspect-square w-4 shrink-0" />}
        label={i18n("profile.label.display_name")}
        value={userData.fullName}
      />

      <ContactInfo
        icon={<CalendarIcon className="my-auto aspect-square w-4 shrink-0" />}
        label={i18n("profile.label.dob")}
        value={format(new Date(userData.dob), "dd/MM/yyyy")}
      />
    </div>
  )
}
