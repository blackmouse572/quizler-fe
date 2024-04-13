"use client"

import { Button } from "@/components/ui/button"
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select"
import { Dialog } from "@radix-ui/react-dialog"
import { Select } from "@radix-ui/react-select"
import { useCallback, useState } from "react"

import { ControllerRenderProps, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { toast } from "@/components/ui/use-toast"
import ReportButton from "../report-button"

import { Textarea } from "@/components/ui/textarea"
import ReportUserResultDialog from "./report-user-result-dialog"
import getReportQuizSchema, { ReportQuizBankSchemaType, reasonChoice } from "@/app/[locale]/(main)/quizbank/[id]/components/report-quizbank-dialog/report-validate"
import { reportUserAction } from "../../acitons/fetch-report-user"

type Props = {
  accountId: string
  accountName: string
} & React.ComponentProps<"div">

export default function ReportUserDialog({
  accountId,
  accountName,
  ...props
}: Props) {
  const i18n = useTranslations("Report_user")
  const errorI18n = useTranslations("Errors")
  const validationsi18n = useTranslations("Validations")
  const [open, setOpen] = useState<boolean>(false)
  const [openResultDialog, setOpenResultDialog] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectedReason, setSelectedReason] = useState<string>("")
  const [timeReport, setTimeReport] = useState("")
  const [idReport, setIdReport] = useState("")

  const renderReportChoice = useCallback(
    (
      field: ControllerRenderProps<
        {
          reason: string
          more_details: string
        },
        any
      >,
      label: string,
      items?: { id: string; text: string }[]
    ) => {
      return (
        <Select
          disabled={isLoading}
          onValueChange={(value) => {
            field.onChange(value)
          }}
          defaultValue={items && items[0].id}
          required
        >
          <SelectTrigger>{items && <SelectValue />}</SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{label}</SelectLabel>
              {items?.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {i18n(item.text as any)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )
    },
    [i18n, isLoading]
  )

  const reasonChoices = reasonChoice.map((choice) => choice.id) as [
    string,
    ...string[],
  ]

  const form = useForm<ReportQuizBankSchemaType>({
    resolver: zodResolver(getReportQuizSchema(reasonChoices)),
    defaultValues: {
      reason: reasonChoices[0],
    },
  })

  const onSubmitCb = useCallback(
    (result: any, reason: string) => {
      setOpen(false)
      setIsLoading(false)
      
      if (!result) {
        return toast({
          title: i18n("message.failed.title"),
          description: errorI18n(result.message as any),
          variant: "flat",
          color: "danger",
        })
      }

      setOpenResultDialog(!openResultDialog)
      setSelectedReason(reason)
      setTimeReport(result.data.created)
      setIdReport(result.data.id)

      return toast({
        title: i18n("message.success.title"),
        description: i18n("message.success.description"),
        variant: "flat",
        color: "success",
      })
    },
    [errorI18n, i18n, openResultDialog]
  )

  const onSubmit = useCallback(
    async (values: ReportQuizBankSchemaType) => {
      const { reason } = values
      setIsLoading(true)
      const result = await reportUserAction(accountId, reason)
      onSubmitCb(result, reason)
    },
    [onSubmitCb, accountId]
  )

  const reportForm = useCallback(
    () => (
      <>
        <FormField
          control={form.control}
          name="reason"
          render={({ field, fieldState }) => {
            return (
              <div className="space-y-1">
                <FormLabel required htmlFor="">
                  {i18n("form_report.reason.label")}
                </FormLabel>
                <FormControl>
                  {renderReportChoice(
                    field,
                    i18n("form_report.reason.text"),
                    reasonChoice
                  )}
                </FormControl>
                {fieldState.error && (
                  <p className="text-xs text-danger-500">
                    {validationsi18n(fieldState.error?.message as any, {
                      maximum: 255,
                      minimum: 3,
                    })}
                  </p>
                )}
              </div>
            )
          }}
        />

        <FormField
          control={form.control}
          name="more_details"
          render={({ field, fieldState }) => {
            return (
              <div className="space-y-1">
                <FormLabel required htmlFor="">
                  {i18n("form_report.more_details.label")}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={i18n("form_report.text_area.placeholder")}
                    className="h-32"
                    {...field}
                  />
                </FormControl>
                {fieldState.error && (
                  <p className="text-xs text-danger-500">
                    {validationsi18n(fieldState.error?.message as any, {
                      maximum: 255,
                      minimum: 3,
                    })}
                  </p>
                )}
              </div>
            )
          }}
        />
      </>
    ),
    [form.control, i18n, renderReportChoice, validationsi18n]
  )

  return (
    <div>
      <Dialog {...props} open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <ReportButton content={i18n("terms.report")} />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader>
                <div className="space-y-2">
                  <DialogTitle>{i18n("title")}</DialogTitle>
                  <DialogDescription>{i18n("description")}</DialogDescription>
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                  {reportForm()}
                </div>
              </DialogHeader>
              <DialogFooter className="mt-4 flex justify-between sm:justify-between">
                <DialogClose asChild>
                  <Button
                    disabled={isLoading}
                    type="reset"
                    variant="outline"
                    color="accent"
                  >
                    {i18n("form_report.button.cancel")}
                  </Button>
                </DialogClose>
                <Button disabled={isLoading} type="submit" variant="default">
                  {i18n("form_report.button.submit")}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {openResultDialog && (
        <ReportUserResultDialog
          openResultDialog={openResultDialog}
          setOpenResultDialog={setOpenResultDialog}
          buttonContent={i18n("terms.report")}
          accountId={accountId}  
          reasonChoiceID={selectedReason}
          time={timeReport}
          ticket_id={idReport}
          accountName={accountName}
        />
      )}
    </div>
  )
}
