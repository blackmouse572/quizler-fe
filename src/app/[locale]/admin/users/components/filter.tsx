import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Icons } from "@/components/ui/icons"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { User } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { PopoverClose } from "@radix-ui/react-popover"
import { Table } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import React, { useMemo } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

type FilterDropdownProps = {
  table: Table<User>
}
function FilterDropdown(props: FilterDropdownProps) {
  const t = useTranslations("Table")
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const [open, setOpen] = React.useState(false)

  const schema = useMemo(() => {
    return z.object({
      search: z.string().optional(),
      visibility: z.string().optional().default(""),
      sortBy: z.string().optional(),
      sortDirection: z.enum(["asc", "desc"]).default("asc"),
    })
  }, [])

  const { register, handleSubmit, reset, setValue, getValues, watch } = useForm<
    z.infer<typeof schema>
  >({
    defaultValues: {
      search: "",
      sortBy: "",
      visibility: "all",
    },
    values: {
      search: searchParams.get("search") || "",
      sortBy: searchParams.get("sortBy") || "",
      visibility: searchParams.get("visibility") || "all",
      sortDirection:
        searchParams.get("sortDirection") === "desc" ? "desc" : "asc",
    },
    resetOptions: {
      keepDefaultValues: true,
      keepValues: true,
    },
    mode: "onSubmit",
    resolver: zodResolver(schema),
  })

  const onSelected = React.useCallback(
    (key: string, checked: boolean) => {
      const value = getValues("visibility")
      if (value === "all" && !checked) {
        setValue("visibility", key === "public" ? "private" : "public")
        return
      }
      if (value === key) {
        setValue("visibility", "")
        return
      }

      if (value === "" || value === undefined) {
        setValue("visibility", key)
        return
      }

      if (
        ((value === "public" && key === "private") ||
          (value === "private" && key === "public")) &&
        checked
      ) {
        setValue("visibility", "all")
        return
      }

      if (value === "public" && key === "public" && !checked) {
        setValue("visibility", "private")
        return
      }

      if (value === "private" && key === "private" && !checked) {
        setValue("visibility", "public")
        return
      }

      setValue("visibility", "all")
    },
    [getValues, setValue]
  )

  const onClear = React.useCallback(() => {
    reset({
      search: "",
      sortBy: "",
      visibility: "all",
      sortDirection: "asc",
    })
    router.push(pathName)
  }, [pathName, reset, router])

  const onSubmit = React.useCallback(
    (values: z.infer<typeof schema>) => {
      setOpen(false)

      const params = new URLSearchParams()
      values.search && params.set("search", values.search.trim())
      values.sortBy && params.set("sortBy", values.sortBy.trim())
      values.visibility && params.set("visibility", values.visibility)
      params.set("sortDirection", values.sortDirection)
      router.push(pathName + "?" + params.toString())
    },
    [pathName, router]
  )

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <Button
          color="accent"
          size="sm"
          className="ml-auto"
          isIconOnly
          onClick={() => setOpen(true)}
        >
          <Icons.Filter />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="space-y-4 px-0" asChild>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center border-b border-neutral-200 px-3 pb-3 font-sans">
            <Icons.Filter className="mr-2 inline-block h-4 w-4 text-emerald-500" />
            <p className="text-sm font-semibold">{t("filter")}</p>
            <PopoverClose className="ml-auto">
              <Icons.X className="h-4 w-4" />
            </PopoverClose>
          </div>

          <div className="px-3">
            <Label>{t("search")}</Label>
            <div className="relative max-w-2xl items-center ">
              <Icons.Search className="absolute  left-2 top-1/2 h-4  w-4 -translate-y-1/2 " />
              <Input
                type="text"
                className="focus:border-primary-500 max-w-sm border border-border bg-transparent pl-9 focus:ring-0"
                {...register("search")}
              />
            </div>
          </div>
          <Separator />
          <div className="flex justify-between px-3">
            <Button variant="outline" color="accent" onClick={onClear}>
              {t("clear")}
            </Button>

            <Button type="submit" className="px-10">
              {t("apply")}
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  )
}

export default FilterDropdown
