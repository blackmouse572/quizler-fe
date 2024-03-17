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
import getReportQuizSchema, {
  ReportQuizBankSchemaType,
  reasonChoice,
} from "./report-validate"
import { Textarea } from "@/components/ui/textarea"
import ReportQuizBankResultDialog from "./report-quizbank-result-dialog"

type Props = {
  buttonContent: string
  quizbankId: string
  token: string
} & React.ComponentProps<"div">

export default function ReportQuizBankDialog({
  buttonContent,
  quizbankId,
  token,
  ...props
}: Props) {
  const i18n = useTranslations("ReportQuizBank")
  const errorI18n = useTranslations("Errors")
  const [open, setOpen] = useState<boolean>(false)
  const [openResultDialog, setOpenResultDialog] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectedReason, setSelectedReason] = useState<string>("")

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
          defaultValue={field.value}
          required
        >
          <SelectTrigger>
            {items && <SelectValue placeholder={items[0].text} />}
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{label}</SelectLabel>
              {items?.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.text}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )
    },
    [isLoading]
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
      setOpenResultDialog(!openResultDialog)
      setSelectedReason(reason)

      if (!result) {
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
    },
    [errorI18n, i18n, openResultDialog]
  )

  const onSubmit = useCallback(
    async (values: ReportQuizBankSchemaType) => {
      const { reason } = values
      setIsLoading(true)
      // const result = await copyQuizBankToClassroom(token, quizbankId, classRoom)
      // TODO: call api PUT report
      const result = "TODO"
      onSubmitCb(result, reason)
    },
    [onSubmitCb]
  )

  const reportForm = useCallback(
    () => (
      <>
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => {
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
                <FormMessage />
              </div>
            )
          }}
        />

        <FormField
          control={form.control}
          name="more_details"
          render={({ field }) => {
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
                <FormMessage />
              </div>
            )
          }}
        />
      </>
    ),
    [form.control, i18n, renderReportChoice]
  )

  return (
    <div>
      <Dialog {...props} open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <ReportButton content={buttonContent} />
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
        <ReportQuizBankResultDialog
          openResultDialog={openResultDialog}
          setOpenResultDialog={setOpenResultDialog}
          buttonContent={buttonContent}
          quizBankId={quizbankId}
          reasonChoiceID={selectedReason}
          time="17/3/2024"
          ticket_id="12"
        />
      )}
    </div>
  )
}
