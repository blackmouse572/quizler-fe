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
import { useCallback, useState } from "react"
import { useDeleteReport } from "../helpers/useDeleteReport"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/ui/icons"

type Props = {
  ids: string[]
  trigger: React.ReactNode
} & React.ComponentProps<"div">

function DeleteDialog({ ids, trigger }: Props) {
  const [isDelete, setIsDelete] = useState(false)
  const tableI18n = useTranslations("Table")
  const i18n = useTranslations("ReportAdmin")

  const errorI188n = useTranslations("Errors")

  const handleSuccess = useCallback(() => {
    setIsDelete?.(false)
    toast({
      title: i18n("actions.delete_report.success.title"),
      description: i18n("actions.verify_report.success.message.success"),
      color: "success",
    })
  }, [i18n])

  const handleError = useCallback(
    (e: Error) => {
      toast({
        title: i18n("actions.delete_report.error.title"),
        description: errorI188n(e.message as any),
        color: "danger",
      })
    },
    [errorI188n, i18n]
  )

  const { mutate, isPending } = useDeleteReport({
    onSuccess: handleSuccess,
    onError: handleError,
  })
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
              {isPending && <Icons.Spinner className="animate-spin" />}
              {tableI18n("cancel")}
            </Button>
          </DialogClose>
          <Button
            variant="default"
            color="danger"
            onClick={() => mutate({ reportIds: ids.map((id) => +id) })}
          >
            {isPending && <Icons.Spinner className="animate-spin" />}
            {tableI18n("delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteDialog
