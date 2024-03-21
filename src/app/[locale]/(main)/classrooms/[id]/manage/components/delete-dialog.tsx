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
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/ui/icons"
import { useToast } from "@/components/ui/use-toast"
import { ClassroomMembers } from "@/types"
import { useTranslations } from "next-intl"
import { useCallback, useState } from "react"
import { useKickStudent } from "./useKickStudent"

type Props = {
  student: ClassroomMembers
  classroomId: string
} & React.ComponentProps<"div">

export default function DeleteDialog({
  student,
  classroomId,
  ...props
}: Props) {
  const i18n = useTranslations("Members_classroom")
  const errorI188n = useTranslations("Errors")
  const [open, setOpen] = useState(false)

  const { toast } = useToast()
  const handleSuccess = useCallback(() => {
    setOpen?.(false)
    toast({
      title: i18n("kick_user.title"),
      description: i18n("kick_user.success"),
      color: "success",
    })
  }, [i18n, toast])

  const handleError = useCallback(
    (e: Error) => {
      toast({
        title: i18n("kick_user.title"),
        description: errorI188n(e.message as any),
        color: "danger",
      })
    },
    [errorI188n, i18n, toast]
  )

  const { mutate, isPending } = useKickStudent({
    onSuccess: handleSuccess,
    onError: handleError,
  })

  return (
    <Dialog {...props} open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          {i18n("options.kick_student")}
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{i18n("kick_user.title")}</DialogTitle>
          <DialogDescription>
            {i18n.rich("kick_user.delete_message", {
              span: (children) => (
                <span className="font-bold">{student.fullName}</span>
              ),
            })}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" color="accent">
              {isPending && <Icons.Spinner className="animate-spin" />}
              {i18n("kick_user.cancel_btn")}
            </Button>
          </DialogClose>
          <Button
            variant="default"
            color="danger"
            onClick={() =>
              mutate({ memberId: student.id, classroomId: classroomId })
            }
          >
            {isPending && <Icons.Spinner className="animate-spin" />}
            {i18n("kick_user.delete_btn")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
