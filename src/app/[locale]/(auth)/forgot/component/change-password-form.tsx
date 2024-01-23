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
  FormMessage,
} from "@/components/ui/form"
import { Icons } from "@/components/ui/icons"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { ChangePasswordAction } from "../actions/change-password-action"
import ChangePasswordSchema, {
  ChangePasswordSchemaType,
} from "../validations/change-password-validate"

export default function ChangePasswordForm() {
  const t = useTranslations("ChangePassword")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const form = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(ChangePasswordSchema),
  })

  async function onSubmit(values: ChangePasswordSchemaType) {
    setIsLoading(true)
    const result = await ChangePasswordAction(values)

    if (!result.ok) {
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
      description: "We have sent the verification code to your email",
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
              name="password"
              render={({ field }) => {
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
                    <FormMessage />
                  </div>
                )
              }}
            />

            <FormField
              control={form.control}
              name="confirm"
              render={({ field }) => {
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
