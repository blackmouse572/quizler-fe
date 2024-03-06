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
import { Label } from "@/components/ui/label"
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Dialog } from "@radix-ui/react-dialog"
import { Select } from "@radix-ui/react-select"
import { useCallback } from "react"
import getCopyQuizShema, { CopyQuizBankSchemaType } from "./copy-validate"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

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
  const renderClassChoice = useCallback(
    (items: { id: string; text: string }[]) => (
      <Select required>
        <SelectTrigger>
          <SelectValue placeholder="Classroom" />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem value={item.id}>{item.text}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    ),
    []
  )

  const copyTochoices = classRoomChoices.map((choice) => choice.id) as [
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
                  {"Name"}
                </FormLabel>
                <FormControl>
                  <Input
                    // disabled={isLoading}
                    required
                    className="rounded-sm"
                    id="name"
                    placeholder={"name"}
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
                  {"Copy To"}
                </FormLabel>
                <FormControl>{renderClassChoice(classRoomChoices)}</FormControl>
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
                  {"Class Room"}
                </FormLabel>
                <FormControl>{renderClassChoice(classRoomChoices)}</FormControl>
                <FormMessage />
              </div>
            )
          }}
        />
      </>
    ),
    [form, renderClassChoice]
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
            <DialogTitle>Copy this quizbank</DialogTitle>
            <DialogDescription>
              {"Do you want to copy this bank with"}
              <span className="font-bold">230 quizzes</span>?
            </DialogDescription>
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            {copyForm()}
          </div>
        </DialogHeader>
        <DialogFooter className="mt-4 flex justify-between sm:justify-between">
          <DialogClose asChild>
            <Button type="reset" variant="outline" color="accent">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" variant="default">
            Copy
          </Button>
        </DialogFooter>
        </form>
      </Form>
      </DialogContent>
    </Dialog>
  )
}
