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
  FormMessage,
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { useTranslations } from "next-intl"

const FormSchema = z
  .object({
    old_password: z.string().min(8, {
      message: "Old password must be at least 8 characters.",
    }),
    new_password: z.string().min(8, {
      message: "Old password must be at least 8 characters.",
    }),
    confirm_password: z.string().min(8, {
      message: "Old password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords don't match",
  })

export default function EditAccount() {
  const i18n = useTranslations("Settings")

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <div className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </div>
      ),
    })
  }

  return (
    <>
      <div className="h-px shrink-0 self-stretch max-md:max-w-full" />
      <div className="mt-5 flex w-7/12 max-w-full items-start justify-between gap-5 border-b border-solid border-neutral-400 pb-2.5 max-md:flex-wrap">
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
            name="old_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>{i18n("account.old_password")}</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="**************" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="new_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>{i18n("account.new_password")}</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="**************" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>{i18n("account.confirm_password")}</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="**************" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-2">
            <Button className="mr-2" type="reset" variant={"ghost"}>
              {i18n("account.cancel_btn")}
            </Button>
            <Button type="submit">{i18n("account.submit_btn")}</Button>
          </div>
        </form>
      </Form>
    </>
  )
}
