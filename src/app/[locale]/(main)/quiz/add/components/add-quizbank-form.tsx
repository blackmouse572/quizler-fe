"use client"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useCallback, useMemo } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import AddTagForm from "./add-tag-form"
import { Icons } from "@/components/ui/icons"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

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
  desciption: z
    .string({
      required_error: "errors.invalid_type_received_undefined",
    })
    .min(3, {
      message: "errors.too_small.string.inclusive",
    })
    .max(255, {
      message: "errors.too_big.string.inclusive",
    }),
  visibility: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  quiz: z.array(
    z.object({
      question: z
        .string({
          required_error: "errors.invalid_type_received_undefined",
        })
        .min(3, {
          message: "errors.too_small.string.inclusive",
        })
        .max(255, {
          message: "errors.too_big.string.inclusive",
        }),
      answer: z
        .string({
          required_error: "errors.invalid_type_received_undefined",
        })
        .min(3, {
          message: "errors.too_small.string.inclusive",
        })
        .max(255, {
          message: "errors.too_big.string.inclusive",
        }),
    })
  ),
})

type AddQuizbank = z.infer<typeof addQuizbankSchema>

type AddQuizbankFormProps = {
  initialValues?: AddQuizbank
}
function AddQuizbankForm({ initialValues }: AddQuizbankFormProps) {
  const errori18n = useTranslations("Validations")
  const i18n = useTranslations("AddQuiz")
  const form = useForm<AddQuizbank>({
    resolver: zodResolver(addQuizbankSchema),
    values: initialValues,
  })
  const { append, fields, remove } = useFieldArray({
    control: form.control,
    name: "quiz",
  })
  const onSubmit = useCallback(() => {}, [])
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
              {...form.register(`quiz.${index}.question`)}
            />
            {form.getFieldState(`quiz.${index}.question`).error && (
              <FormMessage>
                {errori18n(
                  form.getFieldState(`quiz.${index}.question`).error
                    ?.message as any,
                  {
                    maximum: 255,
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
              placeholder={i18n("form.definition.placeholder")}
              {...form.register(`quiz.${index}.answer`)}
            />
            {form.getFieldState(`quiz.${index}.answer`).error && (
              <FormMessage>
                {errori18n(
                  form.getFieldState(`quiz.${index}.answer`).error
                    ?.message as any,
                  {
                    maximum: 255,
                    minimum: 3,
                  }
                )}
              </FormMessage>
            )}
          </FormItem>
        </CardContent>
      </Card>
    ))
  }, [errori18n, fields, form, i18n])

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
        <form
          id="addForm"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="my-4 flex items-center justify-between border-b border-primary">
            <h3 className="text-lg font-bold">{i18n("form.title")}</h3>
            <Button type="submit" variant={"flat"} isIconOnly color={"accent"}>
              <Icons.Checked />
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
            name="desciption"
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
                    {errori18n(fieldState.error?.message as any)}
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
                      checked={field.value}
                      onCheckedChange={field.onChange}
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
