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
import { useKickStudent } from "../helpers/useKickStudent"

type Props = {
  student: ClassroomMembers
  classroomId: string
} & React.ComponentProps<"div">

export default function DeleteDialog({
  student,
  classroomId,
  ...props
}: Props) {
  const i18n = useTranslations("Classroom_student.table.actions.kick_user")
  const errorI188n = useTranslations("Errors")
  const [open, setOpen] = useState(false)

  const { toast } = useToast()
  const handleSuccess = useCallback(() => {
    setOpen?.(false)
    toast({
      title: i18n("title"),
      description: i18n("message.success"),
      color: "success",
    })
  }, [i18n, toast])

  const handleError = useCallback(
    (e: Error) => {
      toast({
        title: i18n("title"),
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
          {i18n("title")}
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{i18n("title")}</DialogTitle>
          <DialogDescription>
            {i18n.rich("message.delete_message", {
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
              {i18n("buttons.cancel")}
            </Button>
          </DialogClose>
          <Button
            variant="default"
            color="danger"
            onClick={() =>
              mutate({
                memberId: student.id.toString(),
                classroomId: classroomId,
              })
            }
          >
            {isPending && <Icons.Spinner className="animate-spin" />}
            {i18n("buttons.delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
