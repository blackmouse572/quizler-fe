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
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Icons } from "@/components/ui/icons"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { VerifySignUpAction } from "../actions/verify-signup-action"
import { VerifySignUpSchemaType } from "../vaidations/verify-sign-up-validate"

export function VerifyRegister() {
  const t = useTranslations("VerifySignUp")
  const form = useForm()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const { toast } = useToast()

  const [otp, setOtp] = useState<string>("")
  const handleOtpChange = (otp: string) => {
    setOtp(otp)
  }

  async function onSubmit(values: VerifySignUpSchemaType) {
    setIsLoading(true)

    values = {
      otpCode: otp,
    }

    // TODO: change here
    console.log(values)

    const result = await VerifySignUpAction(values)

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

  return (
    <Card className="min-w-96">
      <CardHeader>
        <CardTitle className="font-heading text-lg">{t("title")}</CardTitle>
        <CardDescription className="text-sm text-neutral-500">
          {t.rich("description", {
            resent: (children) => (
              <Link
                className="font-medium underline opacity-75 hover:opacity-100"
                href="/"
              >
                <b>{children}</b>
              </Link>
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
                      <Otp {...field} value={otp} onChange={handleOtpChange} />
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
