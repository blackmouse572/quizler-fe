"use client"

import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import { enUS, vi } from "date-fns/locale"
import * as React from "react"
import { DayPicker, useNavigation } from "react-day-picker"

import { Button, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { addMonths, subMonths } from "date-fns"
import { useFormatter, useLocale } from "next-intl"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  locale,
  ...props
}: CalendarProps) {
  const lcl = useLocale()
  const fmt = useFormatter()
  const currentLocale = React.useMemo(() => {
    if (locale) return locale
    if (lcl === "vi") return vi
    return enUS
  }, [lcl, locale])
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      locale={currentLocale}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: cn(
          "text-sm font-medium",
          props.captionLayout === "dropdown-buttons" ? "sr-only" : ""
        ),
        caption_dropdowns: "flex w-full items-center justify-between gap-2",
        nav: cn(
          "flex items-center space-x-1",
          props.captionLayout === "dropdown-buttons" ? "sr-only" : ""
        ),
        nav_button: cn(
          buttonVariants({ variant: "flat", isIconOnly: true }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-neutral-500 rounded-md w-8 font-normal text-[0.8rem] dark:text-neutral-400",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-neutral-100 dark:[&:has([aria-selected])]:bg-neutral-800 [&:has([aria-selected].day-outside)]:bg-neutral-100/50 dark:[&:has([aria-selected].day-outside)]:bg-neutral-800/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          "inline-flex h-8 w-8 cursor-pointer items-center justify-center whitespace-nowrap rounded-md p-0 text-sm font-medium transition-all ease-out hover:bg-primary hover:text-primary-foreground focus:bg-primary/90 focus:text-primary-foreground focus:opacity-100 focus:ring-2 focus:ring-primary aria-selected:bg-foreground aria-selected:text-background aria-selected:opacity-100 dark:hover:bg-primary/90 dark:hover:text-primary-foreground dark:hover:opacity-100 dark:focus:bg-primary/90 dark:focus:text-primary-foreground dark:focus:opacity-100 dark:focus:ring-2 dark:focus:ring-primary-foreground dark:aria-selected:bg-primary/90 dark:aria-selected:text-primary-foreground dark:aria-selected:opacity-100"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-neutral-900 text-neutral-50 hover:bg-neutral-900 hover:text-neutral-50 focus:bg-neutral-900 focus:text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50 dark:hover:text-neutral-900 dark:focus:bg-neutral-50 dark:focus:text-neutral-900",
        day_today: "bg-accent text-accent-foreground border border-primary",
        day_outside:
          "day-outside text-neutral-500 opacity-50 aria-selected:bg-neutral-100/50 aria-selected:text-neutral-500 aria-selected:opacity-30 dark:text-neutral-400 dark:aria-selected:bg-neutral-800/50 dark:aria-selected:text-neutral-400",
        day_disabled: "text-neutral-500 opacity-50 dark:text-neutral-400",
        day_range_middle:
          "aria-selected:bg-neutral-100 aria-selected:text-neutral-900 dark:aria-selected:bg-neutral-800 dark:aria-selected:text-neutral-50",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        Dropdown: ({ value, onChange, children, ...props }) => {
          const options = React.Children.toArray(
            children
          ) as React.ReactElement<React.HTMLProps<HTMLOptionElement>>[]
          const selected = options.find((child) => child.props.value === value)
          const handleChange = (value: string) => {
            const changeEvent = {
              target: { value },
            } as React.ChangeEvent<HTMLSelectElement>
            onChange?.(changeEvent)
          }
          return (
            <Select
              value={value?.toString()}
              onValueChange={(value) => {
                handleChange(value)
              }}
            >
              <SelectTrigger className="pr-1.5 focus:ring-0">
                <SelectValue>{selected?.props?.children}</SelectValue>
              </SelectTrigger>
              <SelectContent position="popper">
                <ScrollArea className="h-80">
                  {options.map((option, id: number) => {
                    return (
                      <SelectItem
                        key={`${option.props.value}-${id}`}
                        value={option.props.value?.toString() ?? ""}
                      >
                        {option.props.children}
                      </SelectItem>
                    )
                  })}
                </ScrollArea>
              </SelectContent>
            </Select>
          )
        },
        IconLeft: ({ ...props }) => <ChevronLeftIcon className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRightIcon className="h-4 w-4" />,
        Footer: ({ displayMonth }) => {
          const { currentMonth, goToMonth, goToDate } = useNavigation()
          if (props.captionLayout === "dropdown-buttons")
            return (
              <div className="flex items-center justify-between">
                <Button
                  variant="flat"
                  color="accent"
                  isIconOnly
                  onClick={() => goToMonth(subMonths(currentMonth, 1))}
                >
                  <Icons.ChevronLeft />
                </Button>
                <Button
                  variant="flat"
                  color="accent"
                  onClick={() => {
                    goToDate(new Date())
                  }}
                  className="text-sm font-bold"
                >
                  {fmt.dateTime(new Date(), {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </Button>
                <Button
                  variant="flat"
                  color="accent"
                  isIconOnly
                  onClick={() => goToMonth(addMonths(currentMonth, 1))}
                >
                  <Icons.ChevronRight />
                </Button>
              </div>
            )

          return null
        },
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
