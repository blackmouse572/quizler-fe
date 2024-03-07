"use client"

import CopyButton from "@/components/copy-button"
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
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
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
import { useCallback, useMemo, useState } from "react"
import getCopyQuizShema, {
  CopyQuizBankSchemaType,
  ECopyTo,
  copyToChoice,
} from "./copy-validate"
import { ControllerRenderProps, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Classroom } from "@/types"
import { copyQuizBankToClassroom } from "@/services/quiz.service"
import { toast } from "@/components/ui/use-toast"

type Props = {
  buttonContent: string
  classes?: Classroom[]
  quizbankId: string
  token: string
} & React.ComponentProps<"div">

type TClassroomChoices = {
  id: string
  text: string
}[]

export default function CopyQuizBankDialog({
  buttonContent,
  classes,
  quizbankId,
  token,
  ...props
}: Props) {
  const i18n = useTranslations("CopyQuizBank")
  const errorI18n = useTranslations("Errors")
  const [copyToValue, setCopyToValue] = useState<ECopyTo>(ECopyTo.classroom)
  const classRoomChoices: TClassroomChoices = useMemo(
    // cast id to string to change field value
    () =>
      classes?.map((c) => ({ id: c.id.toString(), text: c.classname })) ?? [],
    [classes]
  )
  const [open, setOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const renderClassChoice = useCallback(
    (
      field: ControllerRenderProps<
        {
          name: string
          copyTo: string
          classRoom: string
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
            {items && (
              <SelectValue placeholder="Select a verified email to display" />
            )}
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

  const copyTochoices = copyToChoice.map((choice) => choice.id) as [
    string,
    ...string[],
  ]
  const classRoomchoicesSchema = classRoomChoices?.map(
    (choice) => choice.id
  ) as [string, ...string[]]

  const form = useForm<CopyQuizBankSchemaType>({
    resolver: zodResolver(
      getCopyQuizShema(copyTochoices, classRoomchoicesSchema)
    ),
    defaultValues: {
      name: "",
      copyTo: copyTochoices[0],
      classRoom: classRoomchoicesSchema?.[0] ?? "",
    },
  })

  const onSubmitCb = (result: any) => {
    console.log("result:", result)
    setOpen(false)
    setIsLoading(false)
    if (!result?.ok) {
      return toast({
        title: "Something went wrong.",
        description: errorI18n(result.message as any),
        variant: "flat",
        color: "danger",
      })
    }
  }

  async function onSubmit(values: CopyQuizBankSchemaType) {
    const { classRoom } = values
    setIsLoading(true)
    const result = await copyQuizBankToClassroom(token, quizbankId, classRoom)
    onSubmitCb(await result)
  }

  const copyForm = useCallback(
    () => (
      <>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => {
            return (
              <div className="space-y-1">
                <FormLabel required htmlFor="">
                  {i18n("form.name.label")}
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    required
                    className="rounded-sm"
                    id="name"
                    placeholder={i18n("form.name.placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </div>
            )
          }}
        />

        <FormField
          control={form.control}
          name="copyTo"
          render={({ field }) => {
            field.onChange = (...event: any[]) => {
              setCopyToValue(event[0])
            }
            return (
              <div className="space-y-1">
                <FormLabel required htmlFor="">
                  {i18n("form.copyTo.text")}
                </FormLabel>
                <FormControl>
                  {renderClassChoice(
                    field,
                    i18n("form.copyTo.text"),
                    copyToChoice
                  )}
                </FormControl>
                <FormMessage />
              </div>
            )
          }}
        />

        <FormField
          control={form.control}
          name="classRoom"
          render={({ field }) => {
            return copyToValue === ECopyTo.classroom ? (
              <div className="space-y-1">
                <FormLabel required htmlFor="">
                  {i18n("form.classroom.text")}
                </FormLabel>
                <FormControl>
                  {renderClassChoice(
                    field,
                    i18n("form.classroom.text"),
                    classRoomChoices
                  )}
                </FormControl>
                <FormMessage />
              </div>
            ) : (
              <div className="ml-1 mt-2 flex items-center space-x-2">
                <Checkbox id={i18n("form.public.label")} variant={"square"} />
                <Label htmlFor={i18n("form.public.label")}>
                  {i18n("form.public.text")}
                </Label>
              </div>
            )
          }}
        />
      </>
    ),
    [
      classRoomChoices,
      copyToValue,
      form.control,
      i18n,
      isLoading,
      renderClassChoice,
    ]
  )

  return (
    <Dialog {...props} open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <CopyButton content={buttonContent} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <div className="space-y-2">
                <DialogTitle>{i18n("title")}</DialogTitle>
                <DialogDescription>
                  {i18n("description")}
                  <span className="font-bold"> 230 {i18n("quizzes")}</span>?
                </DialogDescription>
              </div>

              <div className="grid w-full max-w-sm items-center gap-1.5">
                {copyForm()}
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
                  {i18n("form.button.cancel")}
                </Button>
              </DialogClose>
              <Button disabled={isLoading} type="submit" variant="default">
                {i18n("form.button.submit")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
