"use client"
import MyQuizbankAutocomplete from "@/app/[locale]/(main)/classrooms/[id]/games/components/quizbank-autocomplete"
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
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const AddGameSchema = z
  .object({
    gameName: z
      .string({
        required_error: "errors.invalid_type_received_undefined",
      })
      .min(1, {
        message: "errors.too_small.string.inclusive",
      })
      .max(255, {
        message: "errors.too_big.string.inclusive",
      }),
    isTest: z.boolean().default(false),
    classroomId: z.string(),
    quizbankId: z.string(),
    amount: z
      .number({ required_error: "errors.invalid_type_received_undefined" })
      .min(10, {
        message: "errors.too_big.number.inclusive",
      })
      .max(1000, {
        message: "errors.too_big.number.not_inclusive",
      }),
    duration: z
      .number({
        required_error: "errors.invalid_type_received_undefined",
      })
      .min(10, {
        message: "errors.too_big.number.inclusive",
      })
      .max(1000, {
        message: "errors.too_big.number.not_inclusive",
      }),
    startTime: z.string({
      invalid_type_error: "errors.invalid_date",
      required_error: "invalid_type_received_undefined",
    }),
    endTime: z.string({
      invalid_type_error: "errors.invalid_date",
      required_error: "invalid_type_received_undefined",
    }),
  })
  .refine(
    (data) => {
      if (new Date(data.startTime) > new Date(data.endTime)) {
        return false
      }
    },
    {
      message: "errors.too_big.date.not_inclusive",
      path: ["startTime", "endTime"],
    }
  )

export type AddGameFormType = z.infer<typeof AddGameSchema>

type AddGameFormProp = {
  intialValues: Partial<AddGameFormType>
  trigger: React.ReactNode
}

function AddGameForm({ intialValues, trigger }: AddGameFormProp) {
  const [isOpen, setOpen] = useState(false)
  const t = useTranslations("ClassroomGame")
  const errorsI18n = useTranslations("Errors")
  const vali18n = useTranslations("Validations")
  const form = useForm<AddGameFormType>({
    resolver: zodResolver(AddGameSchema),
    defaultValues: intialValues,
  })

  const onSubmit = useCallback(() => {}, [])

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="max-w-screen-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>{t("actions.create.title")}</DialogTitle>
              <DialogDescription>
                {t("actions.create.description")}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-x-8">
              <FormField
                control={form.control}
                name="gameName"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel required>
                      {t("actions.create.form.name.label")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t("actions.create.form.name.placeholder")}
                      />
                    </FormControl>
                    {fieldState.error && (
                      <p className="text-xs text-danger-500">
                        {vali18n(fieldState.error?.message as any, {
                          maximum: 255,
                          minimum: 1,
                        })}
                      </p>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel required>
                      {t("actions.create.form.duration.label")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder={t(
                          "actions.create.form.duration.placeholder"
                        )}
                      />
                    </FormControl>
                    {fieldState.error && (
                      <p className="text-xs text-danger-500">
                        {vali18n(fieldState.error?.message as any, {
                          maximum: 1000,
                          minimum: 10,
                        })}
                      </p>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>
                      {t("actions.create.form.amount.label")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder={t(
                          "actions.create.form.amount.placeholder"
                        )}
                      />
                    </FormControl>
                    {fieldState.error && (
                      <p className="text-xs text-danger-500">
                        {vali18n(fieldState.error?.message as any, {
                          maximum: 1000,
                          minimum: 10,
                        })}
                      </p>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startTime"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>
                      {t("actions.create.form.startTime.label")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="datetime-local"
                        placeholder={t(
                          "actions.create.form.startTime.placeholder"
                        )}
                      />
                    </FormControl>
                    {fieldState.error && (
                      <p className="text-xs text-danger-500">
                        {vali18n(fieldState.error?.message as any, {
                          maximum: 1000,
                          minimum: 10,
                        })}
                      </p>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endTime"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>
                      {t("actions.create.form.endTime.label")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="datetime-local"
                        placeholder={t(
                          "actions.create.form.endTime.placeholder"
                        )}
                      />
                    </FormControl>
                    {fieldState.error && (
                      <p className="text-xs text-danger-500">
                        {vali18n(fieldState.error?.message as any, {
                          maximum: 1000,
                          minimum: 10,
                        })}
                      </p>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quizbankId"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-between gap-0 pt-2">
                    <FormLabel>
                      {t("actions.create.form.quizbank.label")}
                    </FormLabel>
                    <MyQuizbankAutocomplete
                      onSelect={(e) => field.onChange(e.id)}
                      terms={{
                        empty: t("actions.create.form.quizbank.empty"),
                        inputPlaceholder: t(
                          "actions.create.form.quizbank.placeholder"
                        ),
                      }}
                    />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                type="reset"
                onClick={() => setOpen(false)}
                color="accent"
              >
                {t("actions.create.form.cancel")}
              </Button>
              <Button type="submit">{t("actions.create.form.submit")}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddGameForm
