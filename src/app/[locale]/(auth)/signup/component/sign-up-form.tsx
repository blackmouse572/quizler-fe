"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as React from "react"
import { useForm } from "react-hook-form"

import SignUpSchema, {
  SignUpSchemaType,
} from "@/app/[locale]/(auth)/signup/vaidations/sign-up-validate"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { subYears } from "date-fns"
import { useFormatter, useTranslations } from "next-intl"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { SignUpAction } from "../actions/signup-action"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const format = useFormatter()

  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      fullName: "",
      username: "",
      password: "",
      confirm: "",
      dob: new Date(),
      email: "",
    },
  })

  const t = useTranslations("SignUp")
  const errorI188n = useTranslations("Errors")
  const validationsi18n = useTranslations("Validations")
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const router = useRouter()
  const { toast } = useToast()

  async function onSubmit(values: SignUpSchemaType) {
    setIsLoading(true)
    const result = await SignUpAction(values)

    if (!result?.ok) {
      setIsLoading(false)
      return toast({
        title: errorI188n("unknown"),
        description: errorI188n(result.message),
        variant: "flat",
        color: "danger",
      })
    }
    const params = new URLSearchParams({ email: values.email })
    return router.push(`/signup/verify?${params}`)
  }

  return (
    <Card className="min-w-96">
      <CardHeader>
        <CardTitle className="font-heading text-lg">{t("title")}</CardTitle>
        <CardDescription className="text-sm text-neutral-500">
          {t.rich("description", {
            login: (children) => (
              <Link
                className="font-medium underline opacity-75 hover:opacity-100"
                href="/login"
              >
                <b>{children}</b>
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
              name="fullName"
              render={({ field, fieldState }) => {
                return (
                  <div className="space-y-1">
                    <FormLabel required htmlFor="">
                      {t("form.name.label")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="rounded-sm"
                        id="name"
                        placeholder={t("form.name.placeholder")}
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
              name="email"
              render={({ field, fieldState }) => {
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
              name="username"
              render={({ field, fieldState }) => {
                return (
                  <div className="space-y-1">
                    <FormLabel required htmlFor="">
                      {t("form.username.label")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="rounded-sm"
                        id="username"
                        placeholder={t("form.username.placeholder")}
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

            <FormField
              control={form.control}
              name="dob"
              render={({ field, fieldState }) => {
                return (
                  <div className="space-y-1">
                    <FormLabel required>{t("form.dob.label")}</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal"
                              )}
                            >
                              {field.value ? (
                                format.dateTime(new Date(field.value), {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })
                              ) : (
                                <span>{t("form.dob.placeholder")}</span>
                              )}
                              <Icons.Calendar className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            captionLayout="dropdown-buttons"
                            fromYear={subYears(new Date(), 100).getFullYear()}
                            toYear={new Date().getFullYear()}
                            selected={new Date(field.value)}
                            onSelect={field.onChange}
                          />
                        </PopoverContent>
                      </Popover>
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
