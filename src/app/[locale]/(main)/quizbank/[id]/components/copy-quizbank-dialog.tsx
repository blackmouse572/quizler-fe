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
import { Form, FormField } from "@/components/ui/form"
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
    text: "Class of Ad"
  },
  {
    id: "class-of-Jaden-id",
    text: "Class of Jaden"
  },
  {
    id: "class-of-Grey-id",
    text: "Class of Grey"
  },
]


export default function CopyQuizBankDialog({ buttonContent, ...props }: Props) {

  const renderClassChoice = useCallback(
    (items: {id: string, text: string}[]) => (
      <Select required>
        <SelectTrigger >
          <SelectValue placeholder="Classroom" />
        </SelectTrigger>
        <SelectContent>
          {items.map(item => (<SelectItem value={item.id}>{item.text}</SelectItem>))}
        </SelectContent>
      </Select>
    ),
    []
  )

  const choices = classRoomChoices.map(choice => choice.id) as [string, ...string[]]

  const form = useForm<CopyQuizBankSchemaType>({
    resolver: zodResolver(getCopyQuizShema(choices, choices)),
    defaultValues: {
      name: "",
      copyTo: choices[0],
      classRoom: choices[0]
    },
  })

  // const copyForm = useCallback(() => (
  //   <Form>
  //     <FormField
      
  //     />
  //   </Form>
  // ), [])

  return (
    <Dialog {...props}>
      <DialogTrigger asChild>
        <CopyButton content={buttonContent} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="mb-4 space-y-2">
            <DialogTitle>Copy this quizbank</DialogTitle>
            <DialogDescription>
              {"Do you want to copy this bank with"}
              <span className="font-bold">230 quizzes</span>?
            </DialogDescription>
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label required htmlFor="email">Name</Label>
            <Input required type="text" id="name" placeholder="Name" />

            <Label required htmlFor="email">Copy to</Label>
            {renderClassChoice(classRoomChoices)}

            <Label required htmlFor="email">Classroom</Label>
            {renderClassChoice(classRoomChoices)}
          </div>
        </DialogHeader>
        <DialogFooter className="flex justify-between sm:justify-between mt-4">
          <DialogClose asChild>
            <Button variant="outline" color="accent">
              Cancel
            </Button>
          </DialogClose>
          <Button variant="default">
            Copy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
