"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField } from "@/components/ui/form"
import { Icons } from "@/components/ui/icons"
import Otp from "@/components/ui/otp"
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { VerifySignUpAction } from "../actions/verify-signup-action"
import VerifySignUpSchema, {
  VerifySignUpSchemaType,
} from "../vaidations/verify-sign-up-validate"

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
        title: errorsI18n("index"),
        description: errorsI18n(result.message),
        variant: "flat",
        color: "danger",
      })
    } else {
      router.push("/login")
      toast({
        color: "success",
        duration: 3000,
        title: t("signup-success"),
      })
    }
  }

  return (
    <Card className="min-w-96">
      <CardHeader>
        <CardTitle className="font-heading text-lg">{t("title")}</CardTitle>
      </CardHeader>

      <CardContent>
        <CardTitle className="flex justify-center">{t("form.title")}</CardTitle>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <input type="text" hidden value={searchParams.get("email") || ""} />
            <FormField
              control={form.control}
              name="token"
              render={({ field, fieldState }) => {
                return (
                  <div className="mt-2 space-y-4">
                    <FormControl>
                      <Otp
                        {...field}
                        className="flex justify-around"
                        value={otp}
                        onChange={(value) => {
                          handleOtpChange(value)
                          field.onChange(value)
                        }}
                      />
                    </FormControl>
                    {fieldState.error && (
                      <p className="text-sm text-red-500">
                        {errorsI18n(fieldState.error.message as any)}
                      </p>
                    )}
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
