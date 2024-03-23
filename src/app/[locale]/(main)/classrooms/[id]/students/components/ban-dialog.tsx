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
import { Icons } from "@/components/ui/icons"
import { useTranslations } from "next-intl"
import { useState } from "react"

type Props = {
  ids: string[],
  disabled?: boolean
} & React.ComponentProps<"div">

function BanDialog({ ids, disabled,...props }: Props) {
  const tableI18n = useTranslations("Table")
  const banActionI18n = useTranslations(
    "Classroom_student.table.headers.actions.ban"
  )
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <>
      <Dialog {...props} open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Items</DialogTitle>
            <DialogDescription>
              {tableI18n.rich("ban_message", {
                span: (children) => (
                  <span className="font-bold">({ids.length})</span>
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
            <Button variant="default" color="danger">
              {banActionI18n("buttons.ban")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Button disabled={disabled} color="danger" size={"sm"} onClick={() => setIsOpen(true)}>
        <Icons.Ban />
        {tableI18n("ban")}
      </Button>
    </>
  )
}

export default BanDialog
