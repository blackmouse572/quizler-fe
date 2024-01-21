"use client"

import { useTranslations } from "next-intl"

import { SearchBar } from "@/components/ui/searchbar"
import BackgoundSquare from "@/components/ui/background-square"

export type TErrorPageProps = {
  type: "Error" | "NotFound"
  error?: Error & { digest?: string }
  reset?: () => void
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
            <>
              <div className="h-[150px] w-max-w overflow-hidden rounded-md border border-input border-neutral-300">
                <div className="flex max-h-[100%] items-center justify-center overflow-auto bg-white font-mono font-medium">
                  <pre className="mx-[100px] my-[20px] mt-[100px] text-start max-w-[60%]">{error?.message}</pre>
                </div>
              </div>
            </>
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
