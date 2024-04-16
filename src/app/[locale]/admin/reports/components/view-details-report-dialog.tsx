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
import { ReportType } from "@/types"
import { ContextMenu } from "@radix-ui/react-context-menu"
import { useFormatter, useTranslations } from "next-intl"
import { useCallback, useState } from "react"
import { useVerifyReport } from "../helpers/useVerifyReport"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/ui/icons"

type Props = {
  data: ReportType
  trigger: React.ReactNode
}

export default function ViewDetailsReportDialog({ data, trigger }: Props) {
  const [isOpen, setOpen] = useState(false)
  const i18n = useTranslations("ReportAdmin")
  const errorI188n = useTranslations("Errors")

  const format = useFormatter()

  const handleSuccess = useCallback(() => {
    setOpen?.(false)
    toast({
      title: i18n("actions.verify_report.success.title"),
      description: i18n("actions.verify_report.success.message.success"),
      color: "success",
    })
  }, [i18n])

  const handleError = useCallback(
    (e: Error) => {
      toast({
        title: i18n("actions.verify_report.error.title"),
        description: errorI188n(e.message as any),
        color: "danger",
      })
    },
    [errorI188n, i18n]
  )

  const { mutate, isPending } = useVerifyReport({
    onSuccess: handleSuccess,
    onError: handleError,
  })

  return (
    <ContextMenu>
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{i18n("dialog.report_details.title")}</DialogTitle>
            <DialogDescription>#{data.id}</DialogDescription>
          </DialogHeader>

          <div>
            {data.quizBank && (
              <div>
                <div className="flex justify-between">
                  <div>
                    {i18n("dialog.report_details.content.quizbank_name")}:
                  </div>
                  <div>{data.quizBank.bankName}</div>
                </div>
                <div className="flex justify-between">
                  <div>
                    {i18n("dialog.report_details.content.quizbank_id")}:
                  </div>
                  <div>{data.quizBank.id}</div>
                </div>
              </div>
            )}
            {data.account && (
              <div>
                <div className="flex justify-between">
                  <div>
                    {i18n("dialog.report_details.content.account_name")}:
                  </div>
                  <div>{data.account.fullName}</div>
                </div>
                <div className="flex justify-between">
                  <div>{i18n("dialog.report_details.content.account_id")}:</div>
                  <div>{data.account.id}</div>
                </div>
              </div>
            )}

            <div className="flex justify-between">
              <div>{i18n("dialog.report_details.content.reason")}:</div>
              <div>
                {i18n(`report_reason.reason_choice.${data.reason}` as any)}
              </div>
            </div>
            <div className="flex justify-between">
              <div>{i18n("dialog.report_details.content.created_at")}:</div>
              <div>
                {format.dateTime(new Date(data.created), {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </div>
            </div>
          </div>

          <DialogFooter className="sm:justify-between">
            <DialogClose asChild>
              <Button variant="outline" color="accent" disabled={isPending}>
                {isPending && <Icons.Spinner className="animate-spin" />}
                {i18n("dialog.report_details.cancel")}
              </Button>
            </DialogClose>
            <Button
              variant="default"
              color="danger"
              disabled={isPending}
              onClick={() => mutate({ reportId: data.id })}
            >
              {isPending && <Icons.Spinner className="animate-spin" />}
              {i18n("dialog.report_details.confirm")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ContextMenu>
  )
}
