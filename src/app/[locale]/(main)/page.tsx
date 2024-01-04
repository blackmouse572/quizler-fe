import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card/card"
import { Boxes } from "@/components/background-box"
import CardPrompt from "@/components/ui/card/card-prompt"

export default function Home() {
  const t = useTranslations("Index")
  const locale = useLocale()
  return (
    <div className="min-h-screen">
      <div className="relative h-[70vh] w-full overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 w-full h-full bg-background z-10 [mask-image:linear-gradient(to_top_right,white_40%,transparent_50%)] pointer-events-none" />
        <Boxes row={60} className="-top-[30%]" />
        <p className="font-black font-heading text-4xl sm:text-7xl relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-slate-400 to-slate-800">
          Quizler
        </p>
        <p className="font-black text-sm sm:text-base relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-slate-300 to-slate-700 tracking-wider">
          Bring joy and fun to your classroom
        </p>
      </div>

      {/* Recent and stats */}
      <div className="bg-slate-600 h-[200px]">
        <div>
          Recent
          <div className="flex justify-around">
            <Card />
            <CardPrompt />
            <Card />
            <Card />
          </div>
        </div>
        <div>Stats</div>
      </div>
      <div className="text-center space-y-4">
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
      </div>
    </div>
  )
}
