"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { LoginAction } from "@/app/[locale]/(auth)/login/actions/login-action"
import { LoginGoogleAction } from "@/app/[locale]/(auth)/login/actions/login-google"
import LoginSchema, {
  LoginSchemaType,
} from "@/app/[locale]/(auth)/login/validations/login-validate"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Icons } from "@/components/ui/icons"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useGoogleLogin } from "@react-oauth/google"

type Props = {}

function LoginForm({}: Props) {
  const t = useTranslations("SignIn")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  })

  async function onSubmit(values: LoginSchemaType) {
    setIsLoading(true)
    const result = await LoginAction(values)

    if (!result.ok) {
      setIsLoading(false)
      return toast({
        title: "Something went wrong.",
        description: result.message,
        variant: "flat",
        color: "danger",
      })
    }

    toast({
      title: "Success",
      description: "You have been logged in.",
      variant: "flat",
      color: "success",
    })
    return router.push("/")
  }
  const [errMsg, setErrMsg] = useState<string | undefined>("")

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (res) => {
      LoginGoogleAction(res.access_token).then(() => {
        setIsLoading(false)
        router.push("/")
      })
    },
    onError: (error) => {
      setIsLoading(false)
      setErrMsg(error.error_description)
    },
    onNonOAuthError: (error) => {
      setIsLoading(false)
      setErrMsg(t("error.invalid_popup"))
    },
  })

  return (
    <Card className="min-w-96">
      <div className="px-4 py-1.5">
        {errMsg && (
          <Alert className="mx-auto bg-danger-500/20 text-danger-500">
            <AlertTitle>{t("error.google")}</AlertTitle>
            <AlertDescription>{errMsg}</AlertDescription>
          </Alert>
        )}
      </div>
      <CardHeader>
        <CardTitle className="font-heading text-lg">{t("title")}</CardTitle>
        <CardDescription className="text-sm text-neutral-500">
          {t.rich("descritpion", {
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
              name="emailOrUsername"
              render={({ field }) => {
                return (
                  <div className="space-y-1">
                    <FormLabel required htmlFor="">
                      {t("form.email.label")}
                    </FormLabel>
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
              name="password"
              render={({ field }) => {
                return (
                  <div className="flex items-center justify-start gap-2">
                    <FormControl className="">
                      <Checkbox
                        disabled={isLoading}
                        size={"sm"}
                        id="remember"
                        {...field}
                      />
                    </FormControl>
                    <FormLabel className="text-sm" htmlFor="remember">
                      {t("form.remember")}
                    </FormLabel>
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
        <hr className="my-4" />

        <Button
          disabled={isLoading}
          className="w-full"
          color="primary"
          variant="default"
          type="submit"
          onClick={() => {
            setIsLoading(true)
            loginWithGoogle()
          }}
        >
          {isLoading && <Icons.Loader className="animate-spin" />}
          <Icons.Google />
          {t("form.google")}
        </Button>
      </CardContent>
    </Card>
  )
}

export default LoginForm
