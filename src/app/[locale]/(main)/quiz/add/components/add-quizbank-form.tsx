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
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useCallback, useMemo } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { addQuizBankAction } from "../actions/add-quiz-bank-action"
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
    }),
  visibility: z.enum(["public", "private"]).default("public"),
  tags: z.array(z.string()).default([]),
  quizes: z.array(
    z
      .object({
        question: z
          .string({
            required_error: "errors.invalid_type_received_undefined",
          })
          .min(3, {
            message: "errors.too_small.string.inclusive",
          })
          .max(500, {
            message: "errors.too_big.string.inclusive",
          }),
        answer: z
          .string({
            required_error: "errors.invalid_type_received_undefined",
          })
          .min(3, {
            message: "errors.too_small.string.inclusive",
          })
          .max(500, {
            message: "errors.too_big.string.inclusive",
          }),
      })
      .default({ question: "", answer: "" })
  ),
})

export type AddQuizbank = z.infer<typeof addQuizbankSchema>

type AddQuizbankFormProps = {
  initialValues?: AddQuizbank
}
function AddQuizbankForm({ initialValues }: AddQuizbankFormProps) {
  const errori18n = useTranslations("Validations")
  const i18n = useTranslations("AddQuiz")
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

  const onSubmit = useCallback(
    async (value: AddQuizbank) => {
      const res = await addQuizBankAction(value)

      if (!res.ok) {
        toast({
          title: errorI18n("index"),
          color: "danger",
          description: errorI18n(res.message),
        })
      } else {
        router.push(`/quiz/${res.data.id}`)
      }
    },
    [errorI18n, router, toast]
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
    return fields.map((item, index) => (
      <Card key={item.question + item.id} className="relative">
        <Icons.X
          className="absolute right-4 top-4 h-4 w-4 cursor-pointer text-neutral-500"
          onClick={() => removeQuiz(index)}
        />
        <CardContent className="flex justify-evenly gap-2 pt-6">
          <FormItem className="w-full">
            <Label>{i18n("form.term.label")}</Label>
            <Textarea
              placeholder={i18n("form.term.placeholder")}
              rows={5}
              maxLength={500}
              {...form.register(`quizes.${index}.question`)}
            />
            {form.getFieldState(`quizes.${index}.question`).error && (
              <FormMessage>
                {errori18n(
                  form.getFieldState(`quizes.${index}.question`).error
                    ?.message as any,
                  {
                    maximum: 500,
                    minimum: 3,
                  }
                )}
              </FormMessage>
            )}
          </FormItem>
          <FormItem className="w-full">
            <Label>{i18n("form.definition.label")}</Label>
            <Textarea
              rows={5}
              key={item.question + index}
              maxLength={500}
              placeholder={i18n("form.definition.placeholder")}
              {...form.register(`quizes.${index}.answer`)}
            />
            {form.getFieldState(`quizes.${index}.answer`).error && (
              <FormMessage>
                {errori18n(
                  form.getFieldState(`quizes.${index}.answer`).error
                    ?.message as any,
                  {
                    maximum: 500,
                    minimum: 3,
                  }
                )}
              </FormMessage>
            )}
          </FormItem>
        </CardContent>
      </Card>
    ))
  }, [errori18n, fields, form, i18n, removeQuiz])

  const renderAddButton = useMemo(() => {
    return (
      <Card
        className="flex h-32 cursor-pointer items-center justify-center border-dashed bg-neutral-200 text-neutral-500 transition-colors hover:bg-neutral-300/50"
        onClick={addEmptyQuiz}
      >
        <Icons.Plus className="h-10 w-10" />
      </Card>
    )
  }, [addEmptyQuiz])

  return (
    <Form {...form}>
      <div className="mx-auto w-full max-w-xl space-y-8">
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
          </div>
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
                      checked={field.value === "public"}
                      onCheckedChange={(checked) => {
                        form.setValue(
                          "visibility",
                          checked ? "public" : "private"
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
        />
        <div className="space-y-4">
          {renderItems}
          {renderAddButton}
        </div>
      </div>
    </Form>
  )
}

export default AddQuizbankForm
