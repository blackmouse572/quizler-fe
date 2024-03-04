"use client"
import { addNewClassroom } from "@/app/[locale]/(main)/classrooms/add/actions/add-classroom-action"
import PlanSelectionForm from "@/app/[locale]/(main)/classrooms/add/components/plan-selection-form"
import { TAPIResult } from "@/app/[locale]/(main)/quizbank/add/actions/add-quiz-bank-action"
import { Button } from "@/components/ui/button"
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
import { useToast } from "@/components/ui/use-toast"
import { EFormAction } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useCallback } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const addClassroomSchema = z.object({
  className: z
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
    }),
  planId: z.string({
    required_error: "errors.invalid_type_received_undefined",
  }),
})

export type AddClassroom = z.infer<typeof addClassroomSchema>

type AddClassroomFormProps = {
  classRoomId?: string
  initialValues?: AddClassroom
  action: EFormAction
}

export default function AddClassroomForm({
  classRoomId,
  initialValues,
  action,
}: AddClassroomFormProps) {
  const validationsi18n = useTranslations("Validations")
  const i18Term = +action === +EFormAction.Add ? "AddQuiz" : "EditQuiz"

  const i18n = useTranslations("AddClassroom")
  const errori18n = useTranslations("Errors")
  const router = useRouter()
  const { toast } = useToast()
  const form = useForm<AddClassroom>({
    resolver: zodResolver(addClassroomSchema),
    values: initialValues,
  })
  const onSubmitCallback = useCallback(
    (res: TAPIResult) => {
      if (!res.ok) {
        toast({
          title: errori18n("index"),
          color: "danger",
          description: errori18n(res.message),
        })
      } else {
        router.push(`/classrooms/${res.data.id}`)
      }
    },
    [errori18n, router, toast]
  )

  const onSubmit = useCallback(
    async (value: AddClassroom) => {
      let res
      if (+action === +EFormAction.Add) {
        res = await addNewClassroom(value)
      } else {
        // res = await editQuizBankAction(value, quizBankId?.toString() ?? "")
      }
      //   onSubmitCallback(res)
    },
    [action]
  )

  return (
    <Form {...form}>
      <div className="mx-auto w-full max-w-xl space-y-8 pb-6">
        {form.formState.isSubmitting && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-neutral-900/50">
            <Icons.Loader className="text-primary-500 h-10 w-10 animate-spin" />
          </div>
        )}
        <form
          id="addForm"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="my-4 flex items-center justify-between border-b border-primary">
            <h3 className="text-lg font-bold">{i18n("form.title")}</h3>
            <Tooltip delayDuration={200}>
              <TooltipTrigger asChild>
                <Button
                  type="submit"
                  variant={"flat"}
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
          <FormField
            control={form.control}
            name="className"
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
                    {validationsi18n(fieldState.error?.message as any, {
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
                <FormLabel required>{i18n("form.description.label")}</FormLabel>
                <FormControl>
                  <Textarea
                    required
                    placeholder={i18n("form.description.placeholder")}
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
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="planId"
            render={({ field, fieldState }) => (
              <PlanSelectionForm onPlanSelection={(id) => field.onChange(id)} />
            )}
          />
        </form>
      </div>
    </Form>
  )
}