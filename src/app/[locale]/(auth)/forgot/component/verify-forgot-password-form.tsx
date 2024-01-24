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
import Otp from "@/components/ui/otp"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Icons } from "@/components/ui/icons"
import { notFound, useRouter, useSearchParams } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { VerifyForgotPasswordSchemaType } from "../validations/verify-forgot-password-validate"
import { VerifyForgotPasswordAction } from "../actions/verify-forgot-password-action"
import { ForgotPasswordAction } from "../actions/forgot-password-action"
import { ResentEmailAction } from "../actions/resend-email-action"

export default function VerifyForgotPasswordForm() {
  const t = useTranslations("VerifyForgotPassword")
  const form = useForm()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const s = useSearchParams()
  const { toast } = useToast()

  const [otp, setOtp] = useState<number>(0)
  const handleOtpChange = (value: number) => {
    setOtp(value)
  }

  async function onSubmit(values: VerifyForgotPasswordSchemaType) {
    setIsLoading(true)

    values = {
      otpCode: otp,
    }

    const result = await VerifyForgotPasswordAction(values)

    if (!result?.ok) {
      setIsLoading(false)
      return toast({
        title: "Something went wrong.",
        description: <pre className="max-w-sm">{JSON.stringify(result)}</pre>,
        variant: "flat",
        color: "danger",
      })
    }

    toast({
      title: "Success",
      description: "You have been signed up. Check your email",
      variant: "flat",
      color: "success",
    })

    return router.push("/")
  }

  async function onResentEmail() {
    setIsLoading(true)
    const token = s.get("t")
    if (token == null) return notFound()
    const result = await ResentEmailAction(token).finally(() =>
      setIsLoading(false)
    )

    if (!result.ok) {
      return toast({
        title: "Something went wrong.",
        description: <pre className="max-w-sm">{JSON.stringify(result)}</pre>,
        variant: "flat",
        color: "danger",
      })
    }

    toast({
      title: "Success",
      description: "We have sent the verification code to your email",
      variant: "flat",
      color: "success",
    })
  }

  return (
    <Card className="min-w-96">
      <CardHeader>
        <CardTitle className="font-heading text-lg">{t("title")}</CardTitle>
        <CardDescription className="text-sm text-neutral-500">
          {t.rich("description", {
            resent: (children) => (
              <button
                className="font-medium underline opacity-75 hover:opacity-100"
                onClick={onResentEmail}
              >
                <b>{children}</b>
              </button>
            ),
            br: () => <br />,
          })}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <CardTitle className="flex justify-center">{t("form.title")}</CardTitle>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <div className="mt-2 flex justify-center">
                    <FormControl>
                      <Otp
                        length={6}
                        otp={otp}
                        onOtpChange={handleOtpChange}
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
