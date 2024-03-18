import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    CalendarIcon,
    EnvelopeClosedIcon,
    EnvelopeOpenIcon,
    PersonIcon,
} from "@radix-ui/react-icons"
import { User } from "@/types"
import { format } from "date-fns"
import UpdateUserDialog from "./update-profile-dialog"
import { useTranslations } from "next-intl"

type Props = {
  userData: User
}

type SettingsProps = React.ComponentPropsWithoutRef<"a"> & {
  icon: React.ReactNode
  label: string
  value: string
}

const ContactInfo = ({ icon, label, value }: SettingsProps) => (
  <div className="mt-3 flex w-7/12 max-w-full justify-between gap-5 whitespace-nowrap text-base leading-6 text-black max-md:flex-wrap">
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
    <>
      <div className="h-px shrink-0 self-stretch max-md:max-w-full" />
      <div className="mt-5 flex w-7/12 max-w-full items-start justify-between gap-5 border-b border-solid border-neutral-400 pb-2.5 max-md:flex-wrap">
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
    </>
  )
}
