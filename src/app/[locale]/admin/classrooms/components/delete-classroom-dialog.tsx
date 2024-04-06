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
import { ContextMenu } from "@radix-ui/react-context-menu"
import { useTranslations } from "next-intl"
import { useCallback, useState } from "react"
import { Icons } from "@/components/ui/icons"
import { useDeleteClassroom } from "../helpers/useDeleteClassroom"

type Props = {
  id: string
  trigger: React.ReactNode
}

export default function DeleteClassroomDialog({ id, trigger }: Props) {
  const [isOpen, setOpen] = useState(false)
  const i18n = useTranslations("ClassroomAdmin")
  const errorI188n = useTranslations("Errors")
  const { toast } = useToast()

  const handleSuccess = useCallback(() => {
    setOpen?.(false)
    toast({
      title: i18n("success.delete_classroom.title"),
      description: i18n("success.delete_classroom.index"),
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

  const { mutate, isPending } = useDeleteClassroom({
    onSuccess: handleSuccess,
    onError: handleError,
  })

  return (
    <ContextMenu>
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{i18n("dialog.delete_classroom.title")}</DialogTitle>
            <DialogDescription>
              {i18n.rich("dialog.delete_classroom.description", {
                id: id,
                strong: (children) => <b>{children}</b>,
              })}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" color="accent">
                {isPending && <Icons.Spinner className="animate-spin" />}
                {i18n("dialog.delete_classroom.cancel")}
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
              {i18n("dialog.delete_classroom.confirm")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ContextMenu>
  )
}
