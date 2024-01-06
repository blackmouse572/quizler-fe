import { useLocale, useTranslations } from "next-intl"
import Link from "next/link"

import { isAuthenticated } from "@/lib/auth"
import LogoutButton from "@/components/logout-btn"
import { Button } from "@/components/ui/button"
import { CardInfo, ICardInfoProps } from "@/components/ui/card"
import { Boxes } from "@/components/background-box"

const cardInfos: ICardInfoProps[] = [
  {
    title: "Create project",
    subTitle: "Deploy your new project in one-click.",
  },
  {
    title: "Create project",
    subTitle: "Deploy your new project in one-click.",
  },
  {
    title: "Create project",
    subTitle: "Deploy your new project in one-click.",
  },
  {
    title: "Create project",
    subTitle: "Deploy your new project in one-click.",
  },
]

export default function Home() {
  const t = useTranslations("Index")
  const locale = useLocale()
  const isAuth = isAuthenticated()

  return (
    <div className="min-h-screen">
      <div className="relative flex h-[70vh] w-full flex-col items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-10 h-full w-full bg-background [mask-image:linear-gradient(to_top_right,white_40%,transparent_50%)]" />
        <Boxes row={60} className="to-[-30%]" />
        <p className="relative z-20 bg-gradient-to-b from-slate-400 to-slate-800 bg-clip-text font-heading text-4xl font-black text-transparent sm:text-7xl">
          {t("title")}
        </p>
        <p className="relative z-20 bg-gradient-to-b from-slate-300 to-slate-700 bg-clip-text text-sm font-black tracking-wider  text-transparent sm:text-base ">
          Bring joy and fun to your classroom
        </p>
      </div>

      {/* Recent and stats */}
      <div className="bg-slate-600 p-10">
        <div className="p-2">
          <div className="underline mb-2">Recent</div>
          <div className="flex justify-between space-x-4">
            {cardInfos.map((card, i) => (
              <CardInfo key={i} title={card.title} subTitle={card.subTitle} />
            ))}
          </div>
        </div>
        <div className="p-2">
          <div className="underline mb-2">Stats</div>
          <div className="flex justify-between space-x-4">
            {cardInfos.map((card, i) => (
              <CardInfo key={i} title={card.title} subTitle={card.subTitle} />
            ))}
          </div>
        </div>
      </div>
      {/* footer */}
      <div className="text-center space-y-4 h-[100px]">
        <div className="space-x-2">
          <Link href="signup">
            <Button variant="default" color={"primary"}>
              Sign up
            </Button>
          </Link>
          <Link href={locale === "vi" ? "/en" : "vi"}>
            <Button variant="default" color={"primary"}>
              {locale === "vi" ? "English" : "Vietnamese"}
            </Button>
          </Link>
        </div>
        {isAuth && (
          <div className="space-x-2">
            <Button variant="flat" color={"primary"}>
              If you see this. You are authenticated!
            </Button>
            <LogoutButton />
          </div>
        )}
      </div>
    </div>
  )
}
