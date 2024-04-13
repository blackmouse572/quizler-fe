import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Icons } from "@/components/ui/icons"
import { useToast } from "@/components/ui/use-toast"
import { User } from "@/types"
import { ContextMenu } from "@radix-ui/react-context-menu"
import { useTranslations } from "next-intl"
import { useCallback, useState } from "react"
import { useUnbanUser } from "../helpers/useUnbanUser"

type Props = {
  id: string
  trigger: React.ReactNode
  user: User
}

export default function UnbanUserDialog({ id, user, trigger }: Props) {
  const [isOpen, setOpen] = useState(false)
  const i18n = useTranslations("UserAdmin")
  const errorI188n = useTranslations("Errors")
  const { toast } = useToast()

  const handleSuccess = useCallback(() => {
    setOpen?.(false)
    toast({
      title: i18n("success.unban_user.title"),
      description: i18n("success.unban_user.index"),
      color: "success",
    })
  }, [i18n, toast])

  const handleError = useCallback(
    (e: Error) => {
      toast({
        title: i18n("errors.title"),
        description: errorI188n(e.message as any),
        color: "danger",
      })
    },
    [errorI188n, i18n, toast]
  )

  const { mutate, isPending } = useUnbanUser({
    onSuccess: handleSuccess,
    onError: handleError,
  })

  return (
    <ContextMenu>
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{i18n("dialog.unban_user.title")}</DialogTitle>
            <DialogDescription>
              {i18n.rich("dialog.unban_user.description", {
                id: user.fullName,
                strong: (children) => <b>{children}</b>,
              })}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" color="accent">
                {isPending && <Icons.Spinner className="animate-spin" />}
                {i18n("dialog.unban_user.cancel")}
              </Button>
            </DialogClose>
            <Button
              onClick={() =>
                mutate({
                  id: id,
                })
              }
              variant="default"
              color="danger"
            >
              {isPending && <Icons.Spinner className="animate-spin" />}
              {i18n("dialog.unban_user.confirm")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ContextMenu>
  )
}
