import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog"

import { deleteQuizBank } from "@/services/quiz.service"
import { useTranslations } from "next-intl"
import { toast } from "./ui/use-toast"

type Props = {
  deleteUrl: string
  itemId: number
  title: string
  description: string
  isOpen: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  token: string
}

function DeleteDialogConfirm({
  deleteUrl,
  title,
  description,
  isOpen,
  setOpen,
  itemId,
  token
}: Props) {
  const i18n = useTranslations("Delete_quizbank")
  const errorI18n = useTranslations("Errors")

  const onDelete = async () => {
    const result = await deleteQuizBank(token, itemId.toString())
    setOpen(false)
    if (!result.isSuccess) {
      return toast({
        title: i18n("message.failed.title"),
        description: errorI18n(result.message as any),
        variant: "flat",
        color: "danger",
      })
    } else {
      return toast({
        title: i18n("message.success.title"),
        description: i18n("message.success.description"),
        variant: "flat",
        color: "success",
      })
    }
  }
  
  return (
    <Dialog onOpenChange={setOpen} open={isOpen}>
      <DialogContent>
        <DialogHeader>
          {title}
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant={"ghost"} onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={onDelete} color="danger">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteDialogConfirm
