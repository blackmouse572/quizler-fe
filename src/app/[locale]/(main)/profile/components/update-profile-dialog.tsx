import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { User } from "@/types"
import { Pencil1Icon } from "@radix-ui/react-icons"
import { useTranslations } from "next-intl"
import UpdateProfileForm from "./update-profile-form"

type Props = {
  userData: User
}

export default function UpdateUserDialog({ userData }: Props) {
  const i18n = useTranslations("Settings")

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button color={"accent"} isIconOnly>
          <Pencil1Icon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{i18n("profile.update_dialog.title")}</DialogTitle>
          <DialogDescription>
            {i18n("profile.update_dialog.description")}
          </DialogDescription>
        </DialogHeader>

        <UpdateProfileForm userData={userData} />
      </DialogContent>
    </Dialog>
  )
}
