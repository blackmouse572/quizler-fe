import { useTranslations } from "next-intl"

import { Boxes } from "@/components/background-box"
import { Button } from "@/components/ui/button"
import { Card, CardTitle } from "@/components/ui/card"
import { MainNavItem } from "@/components/ui/guest-navbar/guest-navbar"
import { Icons } from "@/components/ui/icons"
import { isAuthenticated } from "@/lib/auth"
import { SUBJECTS_NAVBAR_ITEMS } from "@/lib/config/navbar-config"
import Link from "next/link"

// async function getRelativeQuizbank() {
//   const random = Math.floor(Math.random() * 5)
//   const data = await fetchRelativeQuiz((random + 1).toString())
//     .then(async (res) => {
//       if (res.ok) {
//         const data: QuizBank[] = await res.json()
//         return {
//           ok: true,
//           data,
//         }
//       }
//       return { ok: false, data: undefined }
//     })
//     .catch((err) => {
//       return { ok: false, data: undefined }
//     })

//   return data
// }

export default function Home() {
  const t = useTranslations("Index")
  const nav = useTranslations("Navbar")
  const isAuth = isAuthenticated()
  // const { data } = await getRelativeQuizbank()

  return (
    <div className="min-h-screen">
      <div className="relative flex h-[70vh] w-full flex-col items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-10 h-full w-full bg-background [mask-image:linear-gradient(to_top_right,white_40%,transparent_50%)]" />
        <Boxes row={60} className="to-[-30%]" />
        <p className="relative z-20 bg-gradient-to-b from-slate-400 to-slate-800 bg-clip-text font-heading text-4xl font-black text-transparent sm:text-7xl">
          {t("title")}
        </p>
        <p className="relative z-20 bg-gradient-to-b from-slate-300 to-slate-700 bg-clip-text text-sm font-black tracking-wider  text-transparent sm:text-base ">
          {t("description")}
        </p>
        <div className="z-10 mt-12 flex items-center justify-between gap-3">
          <Link href={isAuth ? "/search?search=tư+tưởng" : "/login"}>
            <Button className="bg-emerald-500 transition-colors hover:bg-emerald-600 focus:bg-emerald-500 active:bg-emerald-400">
              <Icons.ChevronRight className="mr-2" />
              {t("getting-started")}
            </Button>
          </Link>
          <Link href={"/contact"}>
            <Button color="accent" variant="outline">
              {t("contact")}
            </Button>
          </Link>
        </div>
      </div>
      <div className="container mx-auto">
        <section className="">
          <h1 className="text-lg font-bold">{t("subjects")}</h1>
          <ul className="grid  gap-3 p-4 md:grid-cols-3  ">
            {SUBJECTS_NAVBAR_ITEMS.map((data, index) => {
              if (index === SUBJECTS_NAVBAR_ITEMS.length - 1) return // remove more options
              return (
                <SubjectItem
                  key={data.title}
                  {...data}
                  title={nav(data.title as any)}
                />
              )
            })}
          </ul>
        </section>
      </div>
    </div>
  )
}
function SubjectItem({ href, title, icon }: SubjectItemProp) {
  const Icon = Icons[icon || "AI"]
  return (
    <Link href={href}>
      <Card className="flex items-center gap-3 p-4 transition-all hover:border-emerald-500">
        <div className="rounded-full bg-accent/50 p-3">
          <Icon className="h-6 w-6 text-emerald-500" />
        </div>
        <CardTitle>{title}</CardTitle>
      </Card>
    </Link>
  )
}
type SubjectItemProp = MainNavItem & {
  title: string
}
