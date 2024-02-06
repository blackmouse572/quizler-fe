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
import { useForm } from "react-hook-form"
import { z } from "zod"
import AddTagForm from "./add-tag-form"
import { Icons } from "@/components/ui/icons"
import { Checkbox } from "@/components/ui/checkbox"

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
  const onSubmit = useCallback(() => {}, [])
  const onTagChange = useCallback(
    (tags: string[]) => form.setValue("tags", tags),
    [form]
  )
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
                <FormLabel>{i18n("form.name.label")}</FormLabel>
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
                <FormLabel>{i18n("form.description.label")}</FormLabel>
                <FormControl>
                  <Textarea
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
      </div>
    </Form>
  )
}

export default AddQuizbankForm
