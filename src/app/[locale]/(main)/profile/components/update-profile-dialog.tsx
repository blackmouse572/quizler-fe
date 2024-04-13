"use client"

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
import { useState } from "react"

type Props = {
  userData: User
}

export default function UpdateUserDialog({ userData }: Props) {
  const i18n = useTranslations("Settings")
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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

        <UpdateProfileForm userData={userData} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  )
}
