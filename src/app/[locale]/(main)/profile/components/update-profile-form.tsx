import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import { User } from "@/types"
import { useTranslations } from "next-intl"
import { z } from "zod"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { updateUserProfileAction } from "../actions/update-user-profile"
import { toast } from "@/components/ui/use-toast"
import { useUser } from "@/hooks/useUser"
import { useRouter } from "next/navigation"

type Props = {
  userData: User
}

const formSchema = z.object({
  fullname: z.string().min(2, {
    message: "errors.update_profile_form.fullname",
  }),
  dob: z.coerce.date(),
})

export default function UpdateProfileForm({ userData }: Props) {
  const i18n = useTranslations("Settings")
  const e = useTranslations("Errors")
  const validationsi18n = useTranslations("Validations")
  const user = useUser()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: userData.fullName,
      dob: new Date(userData.dob),
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await updateUserProfileAction({
      id: userData.id.toString(),
      token: user.user!.accessToken.token,
      values: values,
    })

    if (!result.ok) {
      return toast({
        title: e("index"),
        description: e(result.message),
        variant: "flat",
        color: "danger",
      })
    }
    router.refresh()

    toast({
      title: i18n("success.title"),
      description: i18n("success.description"),
      variant: "flat",
      color: "success",
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fullname"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>
                {i18n("profile.update_dialog.label.display_name")}
              </FormLabel>
              <FormControl>
                <Input {...field} />
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
          name="dob"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{i18n("profile.update_dialog.label.dob")}</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  value={
                    field.value instanceof Date
                      ? field.value.toISOString().split("T")[0]
                      : field.value
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogClose>
          <Button type="submit">
            {i18n("profile.update_dialog.submit_btn")}
          </Button>
        </DialogClose>
      </form>
    </Form>
  )
}
