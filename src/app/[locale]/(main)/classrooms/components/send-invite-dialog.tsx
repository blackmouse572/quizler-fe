"use client"
import { sendInviteAction } from "@/app/[locale]/(main)/classrooms/actions/send-invite-action"
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
import { Icons } from "@/components/ui/icons"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import UserSelector from "@/components/user-selector/user-selector"
import { User } from "@/types"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useState } from "react"

type SendInviteDialogProps = {
  classroomId: string
}

function SendInviteDialog({ classroomId }: SendInviteDialogProps) {
  const [isOpen, setOpen] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [errors, setErrors] = useState<string>("")
  const t = useTranslations("Invite_classroom.user")
  const validationsi18n = useTranslations("Validations")
  const errori18n = useTranslations("Errors")
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])

  const { toast } = useToast()

  const onSubmit = async () => {
    if (users.length === 0) {
      setErrors(
        validationsi18n("errors.too_small.array.inclusive", { minimum: 1 })
      )
      return
    }
    setLoading(true)
    const res = await sendInviteAction(users, classroomId)
    setLoading(false)
    if (!res.ok) {
      toast({
        title: errori18n("index"),
        color: "danger",
        description: errori18n(res.message as any),
      })
    } else {
      setOpen(false)
      toast({
        title: t("success.title"),
        description: t("success.title"),
        color: "success",
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="flat" color="accent" isIconOnly>
          <Icons.Send />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>

        <div className="">
          <Label required>{t("form.email.label")}</Label>
          <UserSelector
            mode="multiple"
            className="h-fit max-h-36 min-h-10 w-full overflow-auto border-border"
            placeholder={t("form.email.placeholder")}
            onUserChange={setUsers}
          />
          {<p className="mt-1 text-sm text-danger">{errors}</p>}
        </div>

        <DialogFooter>
          <Button type="reset" onClick={() => setOpen(false)} variant="light">
            {t("form.cancel")}
          </Button>
          <Button type="submit" disabled={isLoading} onClick={onSubmit}>
            {isLoading && <Icons.Spinner className="animate-spin" />}
            {t("form.submit")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default SendInviteDialog
