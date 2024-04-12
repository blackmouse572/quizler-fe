"use client"

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
  FormLabel,
} from "@/components/ui/form"
import { Icons } from "@/components/ui/icons"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { ChangePasswordAction } from "../actions/change-password-action"
import SetNewPasswordSchema, {
  SetNewPasswordSchemaType,
} from "../validations/set-new-password-validate"

type ChangePasswordPageProps = {
  email: string
  token: string
}

export default function SetNewPasswordForm({
  email,
  token,
}: ChangePasswordPageProps) {
  const t = useTranslations("ChangePassword")
  const e = useTranslations("Errors")
  const validationsi18n = useTranslations("Validations")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const form = useForm<SetNewPasswordSchemaType>({
    resolver: zodResolver(SetNewPasswordSchema),
  })

  async function onSubmit(values: SetNewPasswordSchemaType) {
    setIsLoading(true)
    const result = await ChangePasswordAction(values)

    if (!result.ok) {
      setIsLoading(false)
      return toast({
        title: e("index"),
        description: e(result.message),
        variant: "flat",
        color: "danger",
      })
    }

    toast({
      title: t("success.title"),
      description: t("success.description"),
      variant: "flat",
      color: "success",
    })
    return router.push("/login")
  }

  return (
    <Card className="min-w-96">
      <CardHeader>
        <CardTitle className="font-heading text-lg">{t("title")}</CardTitle>
        <CardDescription className="text-sm text-neutral-500">
          {t("description", {
            email,
          })}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <input hidden {...form.register("token")} value={token} />
            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState }) => {
                return (
                  <div className="space-y-1">
                    <FormLabel required htmlFor="">
                      {t("form.password.label")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="rounded-sm"
                        id="password"
                        type="password"
                        placeholder={t("form.password.placeholder")}
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
                  </div>
                )
              }}
            />

            <FormField
              control={form.control}
              name="confirm"
              render={({ field, fieldState }) => {
                return (
                  <div className="space-y-1">
                    <FormLabel required htmlFor="">
                      {t("form.confirm.label")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="rounded-sm"
                        id="confirm"
                        type="password"
                        placeholder={t("form.confirm.placeholder")}
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
