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
import { format } from "date-fns"

type Props = {
  userData: User
}

const formSchema = z.object({
  fullname: z.string().min(2, {
    message: "fullname must be at least 2 characters.",
  }),
  dob: z.string(),
})

export default function UpdateProfileForm({ userData }: Props) {
  const i18n = useTranslations("Settings")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: userData.fullName,
      dob: format(new Date(userData.dob), "dd/MM/yyyy"),
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("kkk: " + JSON.stringify(values))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {i18n("profile.update_dialog.label.display_name")}
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
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
                <Input type="date" {...field} />
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
