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
import { useRouter, useSearchParams } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { VerifySignUpAction } from "../actions/verify-signup-action"
import VerifySignUpSchema, {
  VerifySignUpSchemaType,
} from "../vaidations/verify-sign-up-validate"
import { zodResolver } from "@hookform/resolvers/zod"

interface VerifyRegisterProps {
  initialValues: VerifySignUpSchemaType
}
export function VerifyRegister({ initialValues }: VerifyRegisterProps) {
  const t = useTranslations("VerifySignUp")
  const errorsI18n = useTranslations("Errors")
  const form = useForm<VerifySignUpSchemaType>({
    defaultValues: initialValues,
    resolver: zodResolver(VerifySignUpSchema),
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()

  const [otp, setOtp] = useState<string>("")
  const handleOtpChange = (otp: string) => {
    setOtp(otp)
  }

  async function onSubmit(data: VerifySignUpSchemaType) {
    setIsLoading(true)

    const result = await VerifySignUpAction(data)

    if (!result?.ok) {
      setIsLoading(false)
      return toast({
        title: "Something went wrong.",
        description: errorsI18n(result.message),
        variant: "flat",
        color: "danger",
      })
    }

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
            <input type="text" hidden value={searchParams.get("email") || ""} />
            <FormField
              control={form.control}
              name="token"
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
