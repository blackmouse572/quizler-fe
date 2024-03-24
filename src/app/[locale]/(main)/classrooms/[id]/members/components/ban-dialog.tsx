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
import { useTranslations } from "next-intl"
import { useMemo } from "react"

type Props = {
  users: {
    id: string
    fullName: string
  }[]
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
  ...props
}: Props) {
  const banActionI18n = useTranslations(
    `Classroom_student.table.actions.${isBan ? "ban" : "unban"}`
  )
  const isBatch = useMemo(() => users.length > 1, [users.length])

  return (
    <>
      <Dialog {...props}>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{banActionI18n(`${isBatch? "title_batch": "title"}`)}</DialogTitle>
            <DialogDescription>
              {banActionI18n.rich(`message.${isBan ? "ban" : "unban"}_message_${isBatch? "mutiple": "single"}`, {
                span: (children) => isBatch ? (
                  <span className="font-bold">({users.length})</span>
                ) : (
                  <span className="font-bold">({users[0].fullName})</span>
                ),
              })}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" color="accent">
                {banActionI18n("buttons.cancel")}
              </Button>
            </DialogClose>
            <Button variant="default" color={`${isBan ? "danger" : "success"}`}>
              {banActionI18n("buttons.ban")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default BanDialog
