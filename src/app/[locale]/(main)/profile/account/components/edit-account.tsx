"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Icons } from "@/components/ui/icons"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { useUser } from "@/hooks/useUser"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { changePasswordAction } from "../actions/change-password"

const FormSchema = z
  .object({
    oldPassword: z.string().min(8, {
      message: "errors.edit_account.old_password",
    }),
    password: z.string().min(8, {
      message: "errors.edit_account.new_password",
    }),
    confirmPassword: z.string().min(8, {
      message: "errors.edit_account.confirm_password",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "errors.edit_account.mismatch_password",
    path: ["confirmPassword"],
  })

export default function EditAccount() {
  const i18n = useTranslations("Settings")
  const validationsi18n = useTranslations("Validations")
  const e = useTranslations("Errors")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const user = useUser()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true)
    const result = await changePasswordAction({
      token: user.user!.accessToken.token,
      values: { oldPassword: data.oldPassword, password: data.password },
    })

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
      title: i18n("success.title"),
      description: i18n("success.description"),
      variant: "flat",
      color: "success",
    })

    setIsLoading(false)
  }

  return (
    <div className="w-full space-y-8">
      <div className="w-full gap-5 border-b border-solid border-neutral-400 pb-2.5 max-md:flex-wrap">
        <div className="text-xl font-semibold leading-8 text-black">
          {i18n("account.title")}
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-7/12 max-w-full justify-between gap-2 whitespace-nowrap text-base leading-6 text-black max-md:flex-wrap"
        >
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel required>{i18n("account.old_password")}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="**************"
                    {...field}
                    autoComplete="true"
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
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel required>{i18n("account.new_password")}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="**************"
                    {...field}
                    autoComplete="true"
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
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel required>
                  {i18n("account.confirm_password")}
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="**************"
                    {...field}
                    autoComplete="true"
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
              </FormItem>
            )}
          />
          <div className="mt-2">
            <Button
              className="mr-2"
              type="reset"
              variant={"ghost"}
              disabled={isLoading}
            >
              {isLoading && <Icons.Loader className="animate-spin" />}
              {i18n("account.cancel_btn")}
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Icons.Loader className="animate-spin" />}
              {i18n("account.submit_btn")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
