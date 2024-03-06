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
import { useCallback } from "react"
import getCopyQuizShema, { CopyQuizBankSchemaType, copyToChoice } from "./copy-validate"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"

type Props = {
  buttonContent: string
} & React.ComponentProps<"div">

const classRoomChoices = [
  {
    id: "class-of-Ad-id",
    text: "Class of Ad",
  },
  {
    id: "class-of-Jaden-id",
    text: "Class of Jaden",
  },
  {
    id: "class-of-Grey-id",
    text: "Class of Grey",
  },
]

export default function CopyQuizBankDialog({ buttonContent, ...props }: Props) {
  const i18n = useTranslations("CopyQuizBank")

  const renderClassChoice = useCallback(
    (items: { id: string; text: string }[], label: string) => (
      <Select required>
        <SelectTrigger>
          <SelectValue placeholder={items[0].text} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {items.map((item) => (
              <SelectItem value={item.id}>{item.text}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    ),
    []
  )

  const copyTochoices = copyToChoice.map((choice) => choice.id) as [
    string,
    ...string[],
  ]
  const classRoomchoices = classRoomChoices.map((choice) => choice.id) as [
    string,
    ...string[],
  ]

  const form = useForm<CopyQuizBankSchemaType>({
    resolver: zodResolver(getCopyQuizShema(copyTochoices, classRoomchoices)),
    defaultValues: {
      name: "",
      copyTo: copyTochoices[0],
      classRoom: classRoomchoices[0],
    },
  })

  async function onSubmit(values: CopyQuizBankSchemaType) {
    // setIsLoading(true)
    // const result = await SignUpAction(values)
    // if (!result?.ok) {
    //   setIsLoading(false)
    //   return toast({
    //     title: "Something went wrong.",
    //     description: errorI188n(result.message),
    //     variant: "flat",
    //     color: "danger",
    //   })
    // }
    // const params = new URLSearchParams({ email: values.email })
    // return router.push(`/signup/verify?${params}`)
    console.log("values:", values)
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
                    // disabled={isLoading}
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
            return (
              <div className="space-y-1">
                <FormLabel required htmlFor="">
                  {i18n("form.copyTo.text")}
                </FormLabel>
                <FormControl>
                  {renderClassChoice(copyToChoice, i18n("form.copyTo.text"))}
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
            return (
              <div className="space-y-1">
                <FormLabel required htmlFor="">
                  {i18n("form.classroom.text")}
                </FormLabel>
                <FormControl>
                  {renderClassChoice(
                    classRoomChoices,
                    i18n("form.classroom.text")
                  )}
                </FormControl>
                <FormMessage />
              </div>
            )
          }}
        />
      </>
    ),
    [form.control, i18n, renderClassChoice]
  )

  return (
    <Dialog {...props}>
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
                <Button type="reset" variant="outline" color="accent">
                  {i18n("form.button.cancel")}
                </Button>
              </DialogClose>
              <Button type="submit" variant="default">
                {i18n("form.button.submit")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
