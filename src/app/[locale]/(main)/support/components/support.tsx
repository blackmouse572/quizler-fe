"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useTranslations } from "next-intl"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "errors.contact.name",
  }),
  email: z.string().email({
    message: "errors.contact.email",
  }),
  reason: z
    .string()
    .min(2, {
      message: "errors.contact.reason",
    })
    .max(1000, {
      message: "errors.contact.reason",
    }),
})

export default function Support() {
  const t = useTranslations("Support")
  const validationsi18n = useTranslations("Validations")

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      reason: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    alert(
      t.rich("message.index", {
        br: () => "\n",
        email: values.email,
      })
    )
  }

  return (
    <div>
      <div className="flex justify-center text-3xl font-extrabold">
        {t("index")}
      </div>
      <div className="flex justify-center pt-5 font-normal">
        {t.rich("search_docs.index", {
          docs: (children) => (
            <Link href={"/docs"}>
              <span className="mx-1 text-orange-500">{children}</span>
            </Link>
          ),
        })}
      </div>
      <div className="flex justify-center py-5 text-3xl font-extrabold">
        {t("search_docs.or")}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex justify-center text-3xl font-extrabold">
            {t("form.index")}
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel required>{t("form.name.label")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("form.name.placeholder")} {...field} />
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
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel required>{t("form.email.label")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("form.email.placeholder")} {...field} />
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
            name="reason"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel required>{t("form.reason.label")}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t("form.reason.placeholder")}
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
          <div className="pt-5">
            <Button type="submit">{t("form.submit")}</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
