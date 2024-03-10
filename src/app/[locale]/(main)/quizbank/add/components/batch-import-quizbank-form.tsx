import { Button } from "@/components/ui/button"
import {
  Dialog,
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
} from "@/components/ui/form"
import { Icons } from "@/components/ui/icons"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useCallback, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const batchImportQuizbankSchema = z.object({
  data: z
    .string({
      required_error: "errors.invalid_type_received_undefined",
    })
    .min(3, {
      message: "errors.invalid_type_received_undefined",
    })
    .max(5000, {
      message: "errors.invalid_type_received_undefined",
    }),
  itemSeperator: z
    .string({
      required_error: "errors.invalid_type_received_undefined",
    })
    .default(","),
  quizSeperator: z
    .string({
      required_error: "errors.invalid_type_received_undefined",
    })
    .default(";"),
})

export type BatchImportQuizbank = z.infer<typeof batchImportQuizbankSchema>

type Props = {
  onSuccessfulImport?: (
    data: {
      question: string
      answer: string
    }[]
  ) => void
}

function BatchImportQuizbankForm({ onSuccessfulImport }: Props) {
  const errori18n = useTranslations("Validations")
  const formRef = useRef<HTMLFormElement>(null)
  const i18n = useTranslations("AddQuiz.import-form")
  const [isOpen, setOpen] = useState(false)
  const form = useForm<BatchImportQuizbank>({
    resolver: zodResolver(batchImportQuizbankSchema),
    defaultValues: {
      data: "",
      itemSeperator: ",",
      quizSeperator: ";",
    },
  })
  const onSubmit = useCallback(
    (value: BatchImportQuizbank) => {
      const { data, itemSeperator, quizSeperator } = value
      const quizs = data.split(quizSeperator)
      const item = quizs.map((e) => e.split(itemSeperator))

      const payload: {
        question: string
        answer: string
      }[] = []

      item.map((quiz) => {
        const question = quiz[0] ?? ""
        const answer = quiz[1] ?? ""
        if (question === "" && answer === "") {
          return
        }
        payload.push({
          question: question.trim(),
          answer: answer.trim(),
        })
      })

      onSuccessfulImport?.(payload)
      form.reset()
      setOpen(false)
    },
    [form, onSuccessfulImport]
  )

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="flat"
              isIconOnly
              color="accent"
              type="button"
              onClick={() => setOpen(true)}
            >
              <Icons.Plus />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="z-10">{i18n("title")}</TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{i18n("title")}</DialogTitle>
          <DialogDescription>{i18n("descriptions")}</DialogDescription>
        </DialogHeader>
        <div className="">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              id="import"
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="data"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel required>{i18n("data.label")}</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        maxLength={5000}
                        minLength={3}
                        rows={8}
                        placeholder={i18n("data.placeholder")}
                      />
                    </FormControl>
                    {fieldState.error && (
                      <p className="text-xs text-danger-500">
                        {errori18n(fieldState.error?.message as any, {
                          maximum: 5000,
                          minimum: 3,
                        })}
                      </p>
                    )}
                  </FormItem>
                )}
              />
              <div className="flex justify-between gap-8">
                <FormField
                  control={form.control}
                  name="itemSeperator"
                  render={({ field, fieldState }) => (
                    <FormItem className="flex-1">
                      <FormLabel required>
                        {i18n("itemSeperator.label")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={i18n("itemSeperator.placeholder")}
                        />
                      </FormControl>
                      {fieldState.error && (
                        <p className="text-xs text-danger-500">
                          {errori18n(fieldState.error?.message as any, {
                            maximum: 255,
                            minimum: 3,
                          })}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quizSeperator"
                  render={({ field, fieldState }) => (
                    <FormItem className="flex-1">
                      <FormLabel required>
                        {i18n("quizSeperator.label")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={i18n("quizSeperator.placeholder")}
                        />
                      </FormControl>
                      {fieldState.error && (
                        <p className="text-xs text-danger-500">
                          {errori18n(fieldState.error?.message as any, {
                            maximum: 255,
                            minimum: 3,
                          })}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button type="submit" form="import">
                  {i18n("title")}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default BatchImportQuizbankForm
