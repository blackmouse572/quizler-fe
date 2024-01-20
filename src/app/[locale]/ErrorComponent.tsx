"use client"

import { useTranslations } from "next-intl"

import { SearchBar } from "@/components/ui/searchbar"
import BackgoundSquare from "@/components/ui/background-square"
import { Suspense } from "react"
import { Button } from "@/components/ui/button"

export type TErrorPageProps = {
  type: "Error" | "NotFound"
  error?: any
  reset?: any
}

export function Error({ type, error, reset }: TErrorPageProps) {
  const t = useTranslations(type)
  const isProduction = process.env.NODE_ENV === "production"
  return (
    <BackgoundSquare variant={"topDown"} className="bg-grid-xl-slate-500/20">
      <div className="flex h-screen w-screen flex-row items-center justify-center text-center">
        <div className="flex flex-col items-center space-y-11">
          <h2 className="text-4xl font-extrabold">{t("title")}</h2>
          <p className="whitespace-pre-line text-center font-medium">
            {t("message")}
          </p>
          {!isProduction && type === "Error" ? (
            <Button variant="ghost" color={"primary"} className="bg-white border-neutral-300 w-[100%] h-[92px] font-medium font-mono">
              {t("errorBtn")}
            </Button>
          ) : (
            <SearchBar
              container={{ className: "w-[399px]" }}
              className="bg-white"
              placeholder={t("input.placeholder")}
            />
          )}
        </div>
      </div>
    </BackgoundSquare>
  )
}

export default Error
