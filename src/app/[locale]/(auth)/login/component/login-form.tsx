"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"

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
import { LoginAction } from "@/app/[locale]/(auth)/login/actions/login-action"
import LoginSchema, {
  LoginSchemaType,
} from "@/app/[locale]/(auth)/login/validations/login-validate"
import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"

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
        description: <pre className="max-w-sm">{JSON.stringify(result)}</pre>,
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

  const { data, status } = useSession()

  if (status === "loading") return <h1> loading... please wait</h1>

  if (data && data.user && status === "authenticated") {
    const src = data.user.image;

    return (
      <div>
        <h1> Hi {data.user.name}</h1>
        <Image width={300} height={300} loader={() => src!} src={src!} alt={data.user.name + " photo"} unoptimized={true} />
        <Button onClick={() => signOut()}>Sign out</Button>
      </div>
    )
  }

  return (
    <Card className="min-w-96">
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
              name="email"
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

        <CardDescription className="m-5 flex justify-center text-sm text-neutral-500">
          ----- {t("or_signin")} -----
        </CardDescription>

        <Button
          className="w-full"
          color="primary"
          variant="default"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          {t("signin_with_google")}
        </Button>
      </CardContent>
    </Card>
  )
}

export default LoginForm
