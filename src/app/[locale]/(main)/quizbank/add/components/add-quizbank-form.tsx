"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Icons } from "@/components/ui/icons"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import { addQuizBankClassroomAction } from "@/app/[locale]/(main)/quizbank/add/actions/add-quiz-bank-classroom-action"
import BatchImportQuizbankForm from "@/app/[locale]/(main)/quizbank/add/components/batch-import-quizbank-form"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { EFormAction } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCallback, useMemo, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import {
  TAPIResult,
  addQuizBankAction,
  editQuizBankAction,
} from "../actions/add-quiz-bank-action"
import AddTagForm from "./add-tag-form"

const addQuizbankSchema = z.object({
  bankName: z
    .string({
      required_error: "errors.invalid_type_received_undefined",
    })
    .min(3, {
      message: "errors.too_small.string.inclusive",
    })
    .max(255, {
      message: "errors.too_big.string.inclusive",
    }),
  description: z
    .string({
      required_error: "errors.invalid_type_received_undefined",
    })
    .min(3, {
      message: "errors.too_small.string.inclusive",
    })
    .max(255, {
      message: "errors.too_big.string.inclusive",
    })
    .optional()
    .default(""),
  visibility: z.enum(["Public", "Private"]).default("Public"),
  tags: z.array(z.string()).default([]),
  quizes: z
    .array(
      z
        .object({
          question: z
            .string({
              required_error: "errors.invalid_type_received_undefined",
            })
            .min(1, {
              message: "errors.too_small.string.inclusive",
            })
            .max(1000, {
              message: "errors.too_big.string.inclusive",
            }),
          answer: z
            .string({
              required_error: "errors.invalid_type_received_undefined",
            })
            .min(1, {
              message: "errors.too_small.string.inclusive",
            })
            .max(1000, {
              message: "errors.too_big.string.inclusive",
            }),
        })
        .default({ question: "", answer: "" })
    )
    .min(1)
    .max(999),
  explaination: z
    .string({
      required_error: "errors.invalid_type_received_undefined",
    })
    .optional(),
})

export type AddQuizbank = z.infer<typeof addQuizbankSchema>

type AddQuizbankFormProps = {
  initialValues?: AddQuizbank
  // action if the form
  action?: EFormAction
  /**
   * needed when action is edit
   */
  quizBankId?: string
  classroomId?: string
}
function AddQuizbankForm({
  initialValues,
  action = EFormAction.Add,
  quizBankId,
  classroomId,
}: AddQuizbankFormProps) {
  const errori18n = useTranslations("Validations")
  const i18Term = +action === +EFormAction.Add ? "AddQuiz" : "EditQuiz"
  const [isLoading, setIsLoading] = useState(false)
  const i18n = useTranslations(i18Term)
  const errorI18n = useTranslations("Errors")
  const router = useRouter()
  const { toast } = useToast()
  const form = useForm<AddQuizbank>({
    resolver: zodResolver(addQuizbankSchema),
    values: initialValues,
  })
  const { append, fields, remove } = useFieldArray({
    control: form.control,
    name: "quizes",
  })

  const onSubmitCallback = useCallback(
    (res: TAPIResult<any>) => {
      if (!res.ok) {
        setIsLoading(false)
        toast({
          title: errorI18n("index"),
          color: "danger",
          description: errorI18n(res.message),
        })
      } else {
        router.push(`/quizbank/${res.data.id}`)
      }
    },
    [errorI18n, router, toast]
  )

  const onSubmit = useCallback(
    async (value: AddQuizbank) => {
      setIsLoading(true)
      let res
      if (+action === +EFormAction.Add) {
        if (!classroomId || classroomId === null) {
          res = await addQuizBankAction(value)
        } else {
          res = await addQuizBankClassroomAction(classroomId, value)
        }
      } else {
        res = await editQuizBankAction(value, quizBankId?.toString() ?? "")
      }
      onSubmitCallback(res)
    },
    [action, classroomId, onSubmitCallback, quizBankId]
  )

  const onTagChange = useCallback(
    (tags: string[]) => form.setValue("tags", tags),
    [form]
  )

  const addEmptyQuiz = useCallback(() => {
    append({ question: "", answer: "" })
  }, [append])
  const removeQuiz = useCallback(
    (index: number) => {
      remove(index)
    },
    [remove]
  )

  const renderItems = useMemo(() => {
    return fields.reverse().map((item, index) => (
      <Card key={item.question + item.id} className="relative">
        <Icons.X
          className={cn(
            "absolute right-4 top-4 h-4 w-4 cursor-pointer text-neutral-500",
            {
              hidden: index === 0,
            }
          )}
          onClick={() => removeQuiz(index)}
        />
        <CardContent className="flex justify-evenly gap-2 pt-6">
          <FormItem className="w-full">
            <Label required>{i18n("form.term.label")}</Label>
            <Textarea
              required
              placeholder={i18n("form.term.placeholder")}
              rows={5}
              maxLength={1000}
              {...form.register(`quizes.${index}.question`)}
            />
            {form.getFieldState(`quizes.${index}.question`).error && (
              <FormMessage>
                {errori18n(
                  form.getFieldState(`quizes.${index}.question`).error
                    ?.message as any,
                  {
                    maximum: 1000,
                    minimum: 1,
                  }
                )}
              </FormMessage>
            )}
          </FormItem>
          <FormItem className="w-full">
            <Label required>{i18n("form.definition.label")}</Label>
            <Textarea
              rows={5}
              key={item.question + index}
              maxLength={1000}
              placeholder={i18n("form.definition.placeholder")}
              {...form.register(`quizes.${index}.answer`)}
            />
            {form.getFieldState(`quizes.${index}.answer`).error && (
              <FormMessage>
                {errori18n(
                  form.getFieldState(`quizes.${index}.answer`).error
                    ?.message as any,
                  {
                    maximum: 1000,
                    minimum: 1,
                  }
                )}
              </FormMessage>
            )}
          </FormItem>
        </CardContent>
      </Card>
    ))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errori18n, fields, form, i18n, removeQuiz, form.formState])

  const renderAddButton = useMemo(() => {
    return (
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <Card
            className="flex h-32 cursor-pointer items-center justify-center border-dashed bg-neutral-200 text-neutral-500 transition-colors hover:bg-neutral-300"
            onClick={addEmptyQuiz}
          >
            <Icons.Plus className="h-10 w-10" />
          </Card>
        </TooltipTrigger>
        <TooltipContent>{i18n("form.quiz.new")}</TooltipContent>
      </Tooltip>
    )
  }, [addEmptyQuiz, i18n])

  const onImport = useCallback(
    (
      data: {
        question: string
        answer: string
      }[]
    ) => {
      const prev = form.getValues("quizes")
      //Remove all empty quizes
      const filtered = prev.filter(
        (item) => item.question !== "" && item.answer !== ""
      )

      form.setValue("quizes", [...filtered, ...data])
      return
    },
    [form]
  )

  return (
    <Form {...form}>
      <div className="mx-auto w-full max-w-xl space-y-8 pb-6">
        {isLoading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-neutral-900/50">
            <Icons.Loader className="text-primary-500 h-10 w-10 animate-spin" />
          </div>
        )}
        <div className="my-4 flex items-center justify-between border-b border-primary">
          <div className="flex items-center gap-1">
            {action === EFormAction.Edit && (
              <Link href={`/quizbank/${quizBankId}`}>
                <Button variant="ghost" color="accent" isIconOnly>
                  <Icons.ChevronLeft />
                </Button>
              </Link>
            )}
            <h3 className="text-lg font-bold">{i18n("form.title")}</h3>
          </div>
          <div>
            <BatchImportQuizbankForm onSuccessfulImport={onImport} />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="submit"
                  variant={"ghost"}
                  form="addForm"
                  isIconOnly
                  color={"accent"}
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <Icons.Loader className="animate-spin" />
                  ) : (
                    <Icons.Checked />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent className="z-10">
                {i18n("form.title")}
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        <form
          id="addForm"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="bankName"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel required>{i18n("form.name.label")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={i18n("form.name.placeholder")}
                    {...field}
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
            name="description"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>{i18n("form.description.label")}</FormLabel>
                <FormControl>
                  <Textarea
                    required
                    placeholder={i18n("form.description.placeholder")}
                    {...field}
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
            name="visibility"
            render={({ field, fieldState }) => (
              <FormItem>
                <div className="flex items-center gap-1">
                  <FormControl>
                    <Checkbox
                      variant={"square"}
                      checked={field.value === "Public"}
                      onCheckedChange={(checked) => {
                        form.setValue(
                          "visibility",
                          checked ? "Public" : "Private"
                        )
                      }}
                    />
                  </FormControl>
                  <FormLabel>{i18n("form.public.label")}</FormLabel>
                </div>
                <FormDescription>
                  {i18n("form.public.description")}
                </FormDescription>
                {fieldState.error && (
                  <p className="text-xs text-danger-500">
                    {errori18n(fieldState.error?.message as any)}
                  </p>
                )}
              </FormItem>
            )}
          />
        </form>
        <AddTagForm
          initialValues={initialValues?.tags}
          onTagChange={onTagChange}
          action={action}
        />
        <div className="space-y-4">
          {renderAddButton}
          <div className="max-h-screen w-full scroll-ml-4 space-y-4 overflow-y-auto">
            {renderItems}
          </div>
        </div>
      </div>
    </Form>
  )
}

export default AddQuizbankForm
