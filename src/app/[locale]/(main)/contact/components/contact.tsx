"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import { useTranslations } from "next-intl"
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

export default function ContactForm() {
  const t = useTranslations("Contact")
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
    <div className="space-y-8">
      <div className="flex justify-center text-3xl font-extrabold">
        {t("index")}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel required>{t("form.name.label")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("form.name.placeholder")}
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
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel required>{t("form.email.label")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("form.email.placeholder")}
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
        <Card className="border-none bg-transparent shadow-none">
          <CardHeader>
            <CardTitle>{t("contact-card.index")}</CardTitle>
            <CardDescription>{t("contact-card.description")}</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2">
            <Link href="https://www.facebook.com/phamnhan823">
              <p className="item-center flex items-center gap-4 rounded-md border border-input bg-background px-2 py-3.5 font-medium">
                <div className="rounded-full bg-accent p-2">
                  <Icons.Facebook className="h-6 w-6 text-primary" />
                </div>
                Phạm Ngọc Nhân
              </p>
            </Link>
            <Link href="https://www.facebook.com/phamnhan823">
              <p className="item-center flex items-center gap-4 rounded-md border border-input bg-background px-2 py-3.5 font-medium">
                <div className="rounded-full bg-accent p-2">
                  <Icons.Facebook className="h-6 w-6 text-primary" />
                </div>
                Nguyễn Tuấn Ngọc
              </p>
            </Link>
            <Link href="https://github.com/blackmouse572/">
              <p className="item-center flex items-center gap-4 rounded-md border border-input bg-background px-2 py-3.5 font-medium">
                <div className="rounded-full bg-accent p-2">
                  <Icons.Github className="h-6 w-6 text-primary" />
                </div>
                blackmouse572
              </p>
            </Link>
            <Link href="https://github.com/quinnmike82/">
              <p className="item-center flex items-center gap-4 rounded-md border border-input bg-background px-2 py-3.5 font-medium">
                <div className="rounded-full bg-accent p-2">
                  <Icons.Github className="h-6 w-6 text-primary" />
                </div>
                quinnmike82
              </p>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
