"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast, useToast } from "@/components/ui/use-toast"
import SignUpSchema, {
  SignUpSchemaType,
} from "@/app/[locale]/(auth)/signup/vaidations/sign-up-validate"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { useTranslations } from "next-intl"
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SignUpAction } from "../actions/signup-action"
import { useRouter } from "next/navigation"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
      confirm: "",
      gender: undefined
    }
  })

  const t = useTranslations("SignUp")
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const genders = ["Male", "Female", "Other"] as const
  const router = useRouter()
  const { toast } = useToast()

  async function onSubmit(values: SignUpSchemaType) {
    setIsLoading(true)
    const result = await SignUpAction(values)
    
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

    return router.push("/signup/verify")
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
              name="name"
              render={({ field }) => {
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
                    <FormMessage />
                  </div>
                )
              }}
            />

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
              name="username"
              render={({ field }) => {
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

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => {
                return (
                  <div className="space-y-1">
                    <FormLabel required>{t("form.gender.label")}</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("form.gender.placeholder")}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>{t("form.gender.label")}</SelectLabel>
                            {genders.map((key, i) => (
                              <SelectItem key={i} value={key}>
                                {t(`form.gender.type.${key}.value`)}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
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
