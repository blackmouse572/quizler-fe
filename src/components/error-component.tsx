"use client"

import { useTranslations } from "next-intl"

import BackgroundSquare from "@/components/background-square"
import { SearchBar } from "@/components/ui/searchbar"

export type TErrorPageProps = {
  type: "Error" | "NotFound"
  error?: Error & { digest?: string }
  reset?: () => void
}

export function ErrorFn({ type, error, reset }: TErrorPageProps) {
  const t = useTranslations(type)
  const isProduction = process.env.NODE_ENV === "production"
  return (
    <BackgroundSquare variant={"topDown"} className="bg-grid-xl-slate-500/20">
      <div className="flex h-screen w-screen flex-row items-center justify-center text-center">
        <div className="flex flex-col items-center space-y-11">
          <h2 className="text-4xl font-extrabold">{t("title")}</h2>
          <p className="whitespace-pre-line text-center font-medium">
            {t("message")}
          </p>
          {!isProduction && type === "Error" ? (
            <pre className="max-h-svh max-w-screen-xl overflow-auto text-wrap rounded-md border border-input border-neutral-200 bg-background px-4 py-2.5 text-start font-mono">
              {error?.message}
            </pre>
          ) : (
            <SearchBar
              container={{ className: "" }}
              className="bg-white"
              placeholder={t("input.placeholder")}
            />
          )}
        </div>
      </div>
    </BackgroundSquare>
  )
}

export default ErrorFn
