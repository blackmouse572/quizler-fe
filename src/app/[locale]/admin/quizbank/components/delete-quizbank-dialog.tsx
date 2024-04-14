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
import { useDeleteQuizBank } from "../helpers/useDeleteQuizBank"
import { Icons } from "@/components/ui/icons"
import { User } from "@/types"

type Props = {
  user: User,
  quizBankId: string
  trigger: React.ReactNode
}

export default function DeleteQuizBankDialog({ user, quizBankId, trigger }: Props) {
  const [isOpen, setOpen] = useState(false)
  const i18n = useTranslations("QuizBankAdmin")
  const errorI188n = useTranslations("Errors")
  const { toast } = useToast()

  const handleSuccess = useCallback(() => {
    setOpen?.(false)
    toast({
      title: i18n("success.title"),
      description: i18n("success.message.success"),
      color: "success",
    })
  }, [i18n, toast])

  const handleError = useCallback(
    (e: Error) => {
      toast({
        title: i18n("error.title"),
        description: errorI188n(e.message as any),
        color: "danger",
      })
    },
    [errorI188n, i18n, toast]
  )

  const { mutate, isPending } = useDeleteQuizBank({
    onSuccess: handleSuccess,
    onError: handleError,
  })

  return (
    <ContextMenu>
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{i18n("dialog.delete_quizbank.title")}</DialogTitle>
            <DialogDescription>
              {i18n.rich("dialog.delete_quizbank.description", {
                quizBankID: quizBankId,
                user: user.fullName,
                strong: (children) => <b>{children}</b>,
              })}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" color="accent">
                {isPending && <Icons.Spinner className="animate-spin" />}
                {i18n("dialog.delete_quizbank.cancel")}
              </Button>
            </DialogClose>
            <Button
              onClick={() =>
                mutate({
                  quizBankId: quizBankId,
                })
              }
              variant="default"
              color="danger"
            >
              {isPending && <Icons.Spinner className="animate-spin" />}
              {i18n("dialog.delete_quizbank.delete")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ContextMenu>
  )
}
