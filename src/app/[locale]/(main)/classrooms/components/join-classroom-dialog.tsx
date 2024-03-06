"use client"
import { joinClassroomAction } from "@/app/[locale]/(main)/classrooms/[id]/actions/join-classroom"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Icons } from "@/components/ui/icons"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

type Props = {}

const JoinClassroomSchema = z.object({
  code: z
    .string({
      required_error: "errors.invalid_type_received_undefined",
    })
    .min(6, {
      message: "errors.too_small.string.inclusive",
    })
    .max(12, {
      message: "errors.too_big.string.inclusive",
    }),
})

type FormData = z.infer<typeof JoinClassroomSchema>

function JoinClassroomDialog({}: Props) {
  const [isOpen, setOpen] = useState(false)
  const t = useTranslations("Join_classroom")
  const validationsi18n = useTranslations("Validations")
  const errori18n = useTranslations("Errors")
  const form = useForm<FormData>({
    resolver: zodResolver(JoinClassroomSchema),
  })

  const { toast } = useToast()

  const onSubmit = async (data: FormData) => {
    const res = await joinClassroomAction(data.code)

    if (!res.ok) {
      toast({
        title: errori18n("index"),
        color: "danger",
        description: errori18n(res.message as any),
      })
    } else {
      setOpen(false)
      toast({
        title: t("success.title"),
        color: "success",
        description: t("success.description"),
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{t("title")}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel required>{t("form.code.label")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("form.code.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  {fieldState.error && (
                    <p className="text-xs text-danger-500">
                      {validationsi18n(fieldState.error?.message as any, {
                        maximum: 12,
                        minimum: 6,
                      })}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="reset"
                onClick={() => setOpen(false)}
                variant="light"
              >
                {t("form.cancel")}
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && (
                  <Icons.Loader className="mr-2 animate-spin repeat-infinite" />
                )}
                {t("form.submit")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default JoinClassroomDialog