"use client"

import { useRouter } from "@/app/[locale]/(main)/profile/components/navigation"
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
import { usePathname } from "next/navigation"
import { useTransition } from "react"

type Props = {
  defaultValue: string
  label: string
}

export default function LocaleSwitcherSelect({ defaultValue, label }: Props) {
  const [isPending, startTransition] = useTransition()
  const t = useTranslations("LocaleSwitcher")
  const router = useRouter()
  const location = usePathname()

  function onSelectChange(newValue: string) {
    var path = location
    if (path.startsWith("/vi")) {
      path = path.replace("/vi", "/")
    }
    // const path = "/profile/preference"
    startTransition(() => {
      router.push(
        {
          pathname: path as any,
        },
        {
          locale: newValue,
        }
      )
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
