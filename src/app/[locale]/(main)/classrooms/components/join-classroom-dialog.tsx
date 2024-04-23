"use client"
import { joinClassroomAction } from "@/app/[locale]/(main)/classrooms/actions/join-classroom"
import { queryClient } from "@/app/[locale]/provider"
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
import { NamedToolTip } from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast"
import PagedRequest from "@/types/paged-request"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

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

type Props = {
  defaultOpen?: boolean
  defaultValue?: string
  isOwner: boolean
  trigger?: React.ReactNode
  filter?: Partial<PagedRequest>
}

type FormData = z.infer<typeof JoinClassroomSchema>

function JoinClassroomDialog({ defaultOpen, isOwner, defaultValue, filter }: Props) {
  const [isOpen, setOpen] = useState(defaultOpen)
  const t = useTranslations("Join_classroom")
  const classroomT = useTranslations("Classroom")
  const validationsi18n = useTranslations("Validations")
  const errori18n = useTranslations("Errors")
  const form = useForm<FormData>({
    resolver: zodResolver(JoinClassroomSchema),
    defaultValues: {
      code: defaultValue,
    },
  })
  const router = useRouter()

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
      queryClient.invalidateQueries({ queryKey: ["classrooms", filter, isOwner] })

      toast({
        title: t("success.title"),
        color: "success",
        description: t("success.description"),
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <NamedToolTip side="bottom" content={classroomT("actions.join")}>
        <DialogTrigger asChild>
          <Button isIconOnly>
            <Icons.Join />
          </Button>
        </DialogTrigger>
      </NamedToolTip>
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
