"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useTranslations } from "next-intl"
import Link from "next/link"
import ForgotPasswordSchema, {
  ForgotPasswordSchemaType,
} from "../validations/forgot-password-validate"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { ForgotPasswordAction } from "../actions/forgot-password-action"
import { useRouter } from "next/navigation"

export default function ForgotPasswordForm() {
  const t = useTranslations("ForgotPassword")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const form = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(ForgotPasswordSchema),
  })

  async function onSubmit(values: ForgotPasswordSchemaType) {
    setIsLoading(true)
    const result = await ForgotPasswordAction(values)

    if (!result.ok) {
      setIsLoading(false)
      return toast({
        title: "Something went wrong.",
        description: <pre className="max-w-sm">{JSON.stringify(result)}</pre>,
        variant: "flat",
        color: "danger",
      })
    }
    const { data } = result
    const searchParams = new URLSearchParams()
    searchParams.set("t", data || "")
    toast({
      title: "Success",
      description: "We have sent the verification code to your email",
      variant: "flat",
      color: "success",
    })

    return router.push("/forgot/verify?" + searchParams.toString())
  }

  return (
    <Card className="min-w-96">
      <CardHeader>
        <CardTitle className="font-heading text-lg">{t("title")}</CardTitle>
        <CardDescription className="text-sm text-neutral-500">
          {t.rich("description", {
            forgot: (children) => (
              <Link
                className="font-medium underline opacity-75 hover:opacity-100"
                href="/forgot"
              >
                {children}
              </Link>
            ),
            need: (children) => (
              <Link
                className="font-medium underline opacity-75 hover:opacity-100"
                href="/signup"
              >
                {children}
              </Link>
            ),
          })}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <div className="space-y-1">
                    <FormLabel required htmlFor="">
                      {t("form.email.label")}
                    </FormLabel>
                    <FormDescription>
                      {t("form.email.description")}
                    </FormDescription>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="rounded-sm"
                        id="email"
                        placeholder={t("form.email.placeholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                )
              }}
            />

            <Button
              disabled={isLoading}
              className="w-full"
              color="primary"
              variant="default"
              type="submit"
            >
              {isLoading && <Icons.Loader className="animate-spin" />}
              {t("form.submit")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
