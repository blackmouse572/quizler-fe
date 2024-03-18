import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User } from "@/types"
import { Pencil1Icon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { useTranslations } from "next-intl"

type Props = {
  userData: User
}

export default function UpdateUserDialog({ userData }: Props) {
  const i18n = useTranslations("Settings")

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} color={"accent"} isIconOnly>
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
        <div className="grid gap-4 py-4">
          <div className="items-center gap-4">
            <Label htmlFor="fullName" required>
              {i18n("profile.update_dialog.label.display_name")}
            </Label>
            <Input id="fullName" value={userData.fullName} className="mt-2" />
          </div>
          <div className="items-center gap-4">
            <Label htmlFor="dob" required>
              {i18n("profile.update_dialog.label.dob")}
            </Label>
            <Input
              id="dob"
              value={format(new Date(userData.dob), "dd/MM/yyyy")}
              className="mt-2"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">
            {i18n("profile.update_dialog.submit_btn")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
