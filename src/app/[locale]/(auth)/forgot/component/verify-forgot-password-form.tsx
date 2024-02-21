"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useTranslations } from "next-intl"
import Otp from "@/components/ui/otp"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Icons } from "@/components/ui/icons"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import VerifyForgotPasswordSchema, {
  VerifyForgotPasswordSchemaType,
} from "../validations/verify-forgot-password-validate"
import { VerifyForgotPasswordAction } from "../actions/verify-forgot-password-action"
import { ResentEmailAction } from "../actions/resend-email-action"
import { zodResolver } from "@hookform/resolvers/zod"

export default function VerifyForgotPasswordForm({ email }: { email: string }) {
  const t = useTranslations("VerifyForgotPassword")
  const e = useTranslations("Errors")
  const form = useForm<VerifyForgotPasswordSchemaType>({
    resolver: zodResolver(VerifyForgotPasswordSchema),
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const { toast } = useToast()

  const [otp, setOtp] = useState<string>("")
  const handleOtpChange = (value: string) => {
    form.setValue("pin", value)
    setOtp(value)
  }

  async function onSubmit(values: VerifyForgotPasswordSchemaType) {
    setIsLoading(true)

    const result = await VerifyForgotPasswordAction({
      email: values.email,
      pin: otp,
    })

    if (!result?.ok) {
      setIsLoading(false)
      return toast({
        title: e("index"),
        description: e(result.message as any),
        variant: "flat",
        color: "danger",
      })
    }
    const searchParams = new URLSearchParams()
    searchParams.set("t", result.token!)
    return router.push("/forgot/verify?" + searchParams.toString())
  }

  async function onResentEmail() {
    setIsLoading(true)
    const result = await ResentEmailAction(email).finally(() =>
      setIsLoading(false)
    )

    if (!result.ok) {
      return toast({
        title: "Something went wrong.",
        description: e(result.message),
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
            <input hidden {...form.register("email")} value={email} />
            <FormField
              control={form.control}
              name="pin"
              render={({}) => {
                return (
                  <div className="my-2 px-4">
                    <FormControl>
                      <Otp
                        className="justify-between"
                        value={otp}
                        onChange={handleOtpChange}
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
