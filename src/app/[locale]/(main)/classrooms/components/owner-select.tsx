"use client"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useTranslations } from "next-intl"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
type Props = {
  isOwner?: boolean
  onChange: (value: boolean) => void
}

const selectOpts = [
  {
    label: "All",
    value: "false",
  },
  {
    label: "Owner",
    value: "true",
  },
]

export function OwnerSelect() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const t = useTranslations("Classroom")
  const onChange = (value: boolean) => {
    const search = new URLSearchParams(searchParams)
    search.set("isOwner", value.toString())
    replace(`${pathname}?${search.toString()}`)
  }
  return (
    <Select
      defaultValue={searchParams.get("isOwner") === "true" ? "true" : "false"}
      onValueChange={(value) => {
        console.log("value:", value)
        onChange(value === "true" ? true : false)
      }}
    >
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {selectOpts.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {t(`actions.owner.${opt.label}` as any)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
