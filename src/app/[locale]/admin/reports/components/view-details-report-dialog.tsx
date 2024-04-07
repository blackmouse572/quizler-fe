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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ReportType } from "@/types"
import { ContextMenu } from "@radix-ui/react-context-menu"
import { useFormatter, useTranslations } from "next-intl"
import { useState } from "react"

type Props = {
  data: ReportType
  trigger: React.ReactNode
}

export default function ViewDetailsReportDialog({ data, trigger }: Props) {
  const [isOpen, setOpen] = useState(false)
  const i18n = useTranslations("ReportAdmin")
  const format = useFormatter()

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
              <div>{i18n(`report_reason.reason_choice.${data.reason}` as any)}</div>
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
              <Button variant="outline" color="accent">
                {i18n("dialog.report_details.cancel")}
              </Button>
            </DialogClose>
            <Button variant="default" color="danger">
              {i18n("dialog.report_details.confirm")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ContextMenu>
  )
}
