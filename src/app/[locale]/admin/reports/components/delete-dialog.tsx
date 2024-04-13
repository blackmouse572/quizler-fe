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
import { useState } from "react"

type Props = {
  ids: string[]
  trigger: React.ReactNode
} & React.ComponentProps<"div">

function DeleteDialog({ ids, trigger}: Props) {
  const [isDelete, setIsDelete] = useState(false)
  const tableI18n = useTranslations("Table")
  return (
    <Dialog open={isDelete} onOpenChange={setIsDelete}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{tableI18n("delete_title")}</DialogTitle>
          <DialogDescription>
            {tableI18n.rich("delete_message", {
              span: (children) => (
                <span className="font-bold">({ids.length})</span>
              ),
            })}
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" color="accent">
              {tableI18n("cancel")}
            </Button>
          </DialogClose>
          <Button variant="default" color="danger">
            {tableI18n("delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteDialog
