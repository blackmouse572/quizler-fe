"use client"

import LocaleSwitcherSelect from "./locale-switcher-select"
import { locales } from "@/config"
import { useTranslations } from "next-intl"

type Props = {
  locale: string
}

export default function EditPreference({ locale }: Props) {
  const t = useTranslations("LocaleSwitcher")
  const i18n = useTranslations("Settings")

  return (
    <>
      <div className="h-px shrink-0 self-stretch max-md:max-w-full" />
      <div className="mt-5 flex w-7/12 max-w-full items-start justify-between gap-5 border-b border-solid border-neutral-400 pb-2.5 max-md:flex-wrap">
        <div className="text-xl font-semibold leading-8 text-black">
          {i18n("preference")}
        </div>
      </div>

      <div className="mt-3 flex w-7/12 max-w-full justify-between gap-5 whitespace-nowrap text-base leading-6 text-black max-md:flex-wrap">
        <div className="flex justify-center gap-1 font-semibold">
          {t("label")}
        </div>
        <div>
          <LocaleSwitcherSelect defaultValue={locale} label={t("label")}>
            {locales.map((cur) => (
              <option key={cur} value={cur}>
                {t("locale", { locale: cur })}
              </option>
            ))}
          </LocaleSwitcherSelect>
        </div>
      </div>
    </>
  )
}
