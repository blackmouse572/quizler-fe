import { useTranslations } from "next-intl"

import { SearchBar } from "@/components/ui/searchbar"
import BackgoundSquare from "@/components/ui/background-square"

export default function NotFound() {
  const t = useTranslations("NotFoundPage")
  return (
    <BackgoundSquare
      variant={"topDown"}
      className="bg-grid-xl-slate-500/20"
    >
      <div className="flex h-screen w-screen flex-row items-center justify-center text-center">
        <div className="flex flex-col items-center space-y-11">
          <h2 className="text-4xl font-extrabold">{t("title")}</h2>
          <p className="font-medium">{t("message")}</p>
          <SearchBar
            container={{ className: "w-[80%]" }}
            className="bg-white"
            placeholder={t("input.placeholder")}
          />
        </div>
      </div>
    </BackgoundSquare>
  )
}
