"use client"
import MyQuizbankAutocomplete from "@/app/[locale]/(main)/classrooms/[id]/games/components/quizbank-autocomplete"
import { useCreateGame } from "@/app/[locale]/(main)/classrooms/[id]/games/components/useCreateGame"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { TimePicker } from "@/components/ui/time-picker/time-picker"
import { NamedToolTip } from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast"
import { cn, getAbsoluteURL } from "@/lib/utils"
import { GameType } from "@/types/game"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
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
    quizbankId: z.string({
      required_error: "errors.invalid_type_received_undefined",
    }),
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
    startTime: z
      .date({
        invalid_type_error: "errors.invalid_date",
        required_error: "invalid_type_received_undefined",
      })
      .optional()
      .default(() => new Date()),
    endTime: z
      .date({
        invalid_type_error: "errors.invalid_date",
        required_error: "invalid_type_received_undefined",
      })
      .optional()
      .default(() => new Date()),
    quizTypes: z
      .nativeEnum(GameType)
      .array()
      .min(1, {
        message: "errors.too_small.array.inclusive",
      })
      .max(4, {
        message: "errors.too_big.array.inclusive",
      }),
  })
  .refine((data) => new Date(data.startTime) < new Date(data.endTime), {
    message: "errors.too_small.date.not_inclusive",
    path: ["endTime"],
  })
const GAME_TYPE_OPTIONS = [
  { label: "actions.create.form.gameType.mcq", value: GameType.MultipleChoice },
  { label: "actions.create.form.gameType.tf", value: GameType.TrueFalse },
  { label: "actions.create.form.gameType.dnd", value: GameType.Dnd },
  {
    label: "actions.create.form.gameType.fill",
    value: GameType.ConstructedResponse,
  },
]
export type AddGameFormType = z.infer<typeof AddGameSchema>

type AddGameFormProp = {
  intialValues: Partial<AddGameFormType>
}

function AddGameForm({ intialValues }: AddGameFormProp) {
  const [isOpen, setOpen] = useState(false)
  const form = useForm<AddGameFormType>({
    resolver: zodResolver(AddGameSchema),
    defaultValues: {
      ...intialValues,
      startTime: new Date(),
      endTime: new Date(),
    },
  })
  const t = useTranslations("ClassroomGame")
  const errorsI18n = useTranslations("Errors")
  const { toast } = useToast()
  const { mutate, isPending } = useCreateGame({
    classroomId: intialValues.classroomId ?? "",
    onSuccess: (game) => {
      toast({
        title: t("actions.create.form.success.title"),
        description: t("actions.create.form.success.description"),
        color: "success",
        action: (
          <Button
            onClick={() => {
              const link = getAbsoluteURL(
                `/classrooms/${game.classroomId}/games/${game.id}`
              )
              //copy to clipboard
              navigator.clipboard.writeText(link)
            }}
            isIconOnly
          >
            <Icons.Copy />
          </Button>
        ),
      })
      form.reset()
    },
    onError(e) {
      toast({
        title: errorsI18n("index"),
        description: errorsI18n(e.message as any),
        color: "danger",
      })
    },
  })
  const vali18n = useTranslations("Validations")

  const onSubmit = useCallback(
    (data: AddGameFormType) => {
      mutate(data)
    },
    [mutate]
  )

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <NamedToolTip content={t("actions.create.title")}>
        <DialogTrigger asChild>
          <Button isIconOnly>
            <Icons.Plus />
          </Button>
        </DialogTrigger>
      </NamedToolTip>
      <DialogContent className="max-w-screen-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>{t("actions.create.title")}</DialogTitle>
              <DialogDescription>
                {t("actions.create.description")}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
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
                        disabled={isPending}
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
                        disabled={isPending}
                        {...field}
                        onChange={(e) => {
                          field.onChange(parseInt(e.target.value))
                        }}
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
                        disabled={isPending}
                        {...field}
                        onChange={(e) => {
                          field.onChange(parseInt(e.target.value))
                        }}
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
                    <Popover>
                      <FormControl>
                        <PopoverTrigger asChild>
                          <Button
                            disabled={isPending}
                            variant="outline"
                            color="accent"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <Icons.Calendar className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP HH:mm:ss")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                      </FormControl>
                      <PopoverContent className="w-auto p-0" side="bottom">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                        <div className="border-t border-border p-3">
                          <TimePicker
                            setDate={field.onChange}
                            date={field.value}
                          />
                        </div>
                      </PopoverContent>
                    </Popover>

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
                    <Popover>
                      <FormControl>
                        <PopoverTrigger asChild>
                          <Button
                            disabled={isPending}
                            variant="outline"
                            color="accent"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <Icons.Calendar className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP HH:mm:ss")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                      </FormControl>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          fromYear={new Date(
                            form.getValues("startTime")
                          ).getFullYear()}
                          fromDate={new Date(form.getValues("startTime"))}
                          fromMonth={new Date(form.getValues("startTime"))}
                          initialFocus
                        />
                        <div className="border-t border-border p-3">
                          <TimePicker
                            setDate={field.onChange}
                            date={field.value}
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                    {fieldState.error && (
                      <p className="text-xs text-danger-500">
                        {vali18n(fieldState.error?.message as any, {
                          datetime: t("actions.create.form.startTime.label"),
                        })}
                      </p>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quizbankId"
                render={({ field, fieldState }) => (
                  <FormItem className="flex flex-col items-start justify-end gap-1">
                    <FormLabel>
                      {t("actions.create.form.quizbank.label")}
                    </FormLabel>
                    <MyQuizbankAutocomplete
                      onSelect={(e) => field.onChange(e.id.toString())}
                      disabled={isPending}
                      initialData={field.value}
                      classroomId={intialValues.classroomId ?? ""}
                      terms={{
                        empty: t("actions.create.form.quizbank.empty"),
                        inputPlaceholder: t(
                          "actions.create.form.quizbank.placeholder"
                        ),
                      }}
                    />
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
                name="quizTypes"
                render={({ field, fieldState }) => (
                  <FormItem className="col-span-2 mt-2 flex flex-col items-start justify-end gap-1">
                    <FormLabel required>
                      {t("actions.create.form.gameType.label")}
                    </FormLabel>
                    <div className="grid w-full grid-cols-2 gap-3">
                      {GAME_TYPE_OPTIONS.map((item) => (
                        <FormField
                          key={item.label}
                          control={form.control}
                          name="quizTypes"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.label}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.value)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...(field.value ?? []),
                                            item.value,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.value
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {t(item.label as any)}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    {fieldState.error && (
                      <p className="text-xs text-danger-500">
                        {vali18n(fieldState.error?.message as any, {
                          maximum: 4,
                          minimum: 1,
                        })}
                      </p>
                    )}
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                type="reset"
                onClick={() => setOpen(false)}
                color="accent"
                disabled={isPending}
              >
                {t("actions.create.form.cancel")}
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending && <Icons.Loader className="animate-spin" />}
                {t("actions.create.form.submit")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddGameForm
