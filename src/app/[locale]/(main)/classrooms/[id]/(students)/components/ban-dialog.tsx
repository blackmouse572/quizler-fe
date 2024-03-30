"use client"

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
import { useToast } from "@/components/ui/use-toast"
import { useTranslations } from "next-intl"
import { useCallback, useMemo, useState } from "react"
import { useBanAndUnbanBatchMember } from "../helpers/userBanAndUnbanMembers"
import { Icons } from "@/components/ui/icons"

type Props = {
  users: {
    id: string
    fullName: string
  }[]
  classroomId: string
  disabled?: boolean
  /**
   * If current action is to ban user
   */
  isBan?: boolean
  children?: React.ReactNode
} & React.ComponentProps<"div">

function BanDialog({
  children,
  users,
  disabled,
  isBan = true,
  classroomId,
  ...props
}: Props) {
  const banActionI18n = useTranslations(
    `Classroom_student.table.actions.${isBan ? "ban" : "unban"}`
  )
  const errorI188n = useTranslations("Errors")
  const [open, setOpen] = useState(false)

  const isBatch = useMemo(() => users.length > 1, [users.length])

  const { toast } = useToast()
  const handleSuccess = useCallback(() => {
    setOpen(false)
    return toast({
      title: banActionI18n("title"),
      description: banActionI18n("message.success"),
      color: "success",
    })
  }, [banActionI18n, toast])

  const handleError = useCallback(
    (e: Error) => {
      setOpen(false)
      return toast({
        title: banActionI18n("title"),
        description: errorI188n(e.message as any),
        color: "danger",
      })
    },
    [errorI188n, banActionI18n, toast]
  )

  const { mutate, isPending } = useBanAndUnbanBatchMember({
    onSuccess: handleSuccess,
    onError: handleError,
  })

  return (
    <>
      <Dialog {...props} open={open} onOpenChange={setOpen}>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {banActionI18n(`${isBatch ? "title_batch" : "title"}`)}
            </DialogTitle>
            <DialogDescription>
              {banActionI18n.rich(
                `message.${isBan ? "ban" : "unban"}_message_${
                  isBatch ? "mutiple" : "single"
                }`,
                {
                  span: (children) =>
                    isBatch ? (
                      <span className="font-bold">({users.length})</span>
                    ) : (
                      <span className="font-bold">({users[0].fullName})</span>
                    ),
                }
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" color="accent">
                {isPending && <Icons.Spinner className="animate-spin" />}
                {banActionI18n("buttons.cancel")}
              </Button>
            </DialogClose>
            <Button
              variant="default"
              color={`${isBan ? "danger" : "success"}`}
              onClick={() =>
                mutate({
                  memberIds: users.map((user) => +user.id),
                  classroomId: classroomId,
                  action: `${isBan ? "ban" : "unban"}`,
                })
              }
            >
              {isPending && <Icons.Spinner className="animate-spin" />}
              {banActionI18n("buttons.ban")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default BanDialog
