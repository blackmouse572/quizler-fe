"use client"

import { useTranslations } from "next-intl"
import LocaleSwitcherSelect from "./locale-switcher-select"

type Props = {
  locale: string
}

export default function EditPreference({ locale }: Props) {
  const t = useTranslations("LocaleSwitcher")
  const i18n = useTranslations("Settings")

  return (
    <div className="w-full space-y-8">
      <div className="flex w-full max-w-full items-start justify-between border-b border-solid border-neutral-400 pb-2.5 max-md:flex-wrap">
        <div className="text-xl font-semibold leading-8 text-black">
          {i18n("preference")}
        </div>
      </div>

      <div className="flex w-full max-w-sm items-center justify-between text-base leading-6 text-black max-md:flex-wrap">
        <div className="flex justify-center gap-1 font-semibold">
          {t("label")}
        </div>
        <div>
          <LocaleSwitcherSelect defaultValue={locale} label={t("label")} />
        </div>
      </div>
    </div>
  )
}
