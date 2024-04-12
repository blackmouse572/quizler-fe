"use client"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog"
import { Dispatch, SetStateAction, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { useFormatter, useTranslations } from "next-intl"
import { reasonChoice } from "@/app/[locale]/(main)/quizbank/[id]/components/report-quizbank-dialog/report-validate"


type Props = {
  reasonChoiceID: string
  accountId: string
  accountName: string
  buttonContent: string
  time: string
  ticket_id: string
  openResultDialog: boolean
  setOpenResultDialog: Dispatch<SetStateAction<boolean>>
}

export default function ReportUserResultDialog({
  buttonContent,
  accountId,
  accountName,
  reasonChoiceID,
  time,
  ticket_id,
  openResultDialog,
  setOpenResultDialog,
  ...props
}: Props) {
  const i18n = useTranslations("Report_user")

  const reason = reasonChoice.find((item) => item.id === reasonChoiceID)
  const setOpen = useCallback(() => {
    setOpenResultDialog(!openResultDialog)
  }, [openResultDialog, setOpenResultDialog])
  const format = useFormatter()

  return (
    <Dialog {...props} open={openResultDialog} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="space-y-2">
          <div className="text-base font-bold leading-6 text-zinc-950">
            {i18n("form_result_report.report_success")}
          </div>
          <div className="mt-1.5 text-sm leading-5 text-zinc-500">
            {i18n("form_result_report.thank_you_reported")}
          </div>
          <div className="justify-center py-1 leading-5 text-black">
            {i18n("form_result_report.received_submission")} &nbsp;
            <span className="font-bold">{accountName}</span>&nbsp;
            {i18n("form_result_report.of")} &nbsp;
            <span className="font-bold">{i18n(reason?.text as any)}</span>&nbsp;
            {i18n("form_result_report.against")} &nbsp;
            <span className="underline">
              {i18n("form_result_report.violation_rules")}
            </span>
            &nbsp;
            {i18n("form_result_report.take_action_soon")}
            <div className="mt-4">
              {i18n("form_result_report.recorded")}
              {format.dateTime(new Date(time), {
                dateStyle: "long",
              })} &nbsp;
            </div>
            <div>
              {i18n("form_result_report.ticket_id")} {ticket_id}&nbsp;
            </div>
            &nbsp;
            <div>
              {i18n("form_result_report.contact_us")} &nbsp;
              <a href="mailto:ngocvlqt1995@gmail.com" className="underline">
                {i18n("form_result_report.Quizlearn_email")}
              </a>
            </div>
          </div>
          <DialogFooter className="mt-4 flex">
            <DialogClose asChild>
              <Button type="reset" className="mt-8">
                {i18n("form_result_report.confirm")}
              </Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
