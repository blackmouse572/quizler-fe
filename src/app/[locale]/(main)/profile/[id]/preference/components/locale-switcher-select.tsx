"use client"

import { useParams, useRouter } from "next/navigation"
import { useTransition } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { locales } from "@/config"
import { useTranslations } from "next-intl"

type Props = {
  defaultValue: string
  label: string
}

export default function LocaleSwitcherSelect({ defaultValue, label }: Props) {
  const [isPending, startTransition] = useTransition()
  const params = useParams()
  const t = useTranslations("LocaleSwitcher")
  const link = `/profile/${params.id}/preference`
  const router = useRouter()

  function onSelectChange(newValue: string) {
    const nextLocale = newValue
    startTransition(() => {
      router.push(`/${nextLocale}${link}`)
      router.refresh()
    })
  }

  return (
    <Select
      defaultValue={defaultValue}
      onValueChange={(value) => onSelectChange(value)}
      disabled={isPending}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={label} />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup defaultValue={defaultValue}>
          <SelectLabel>{label}</SelectLabel>
          {locales.map((cur) => (
            <SelectItem key={cur} value={cur}>
              {t("locale", { locale: cur })}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
