import LocaleSwitcherSelect from "@/app/[locale]/(main)/profile/components/locale-switcher-select"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { MAIN_NAVBAR_ITEMS } from "@/lib/config/navbar-config"
import { useTranslations } from "next-intl"
import Link from "next/link"

type Props = {
  className?: string
  locale?: string
}

export default function Footer({ className, locale }: Props) {
  const tIndex = useTranslations("Index")
  const tFooter = useTranslations("Footer")
  const tNav = useTranslations("Navbar")

  return (
    <>
      <div className="mt-5 flex w-full items-start justify-center self-stretch border border-border px-10 py-5 text-base bg-dot-background max-md:mt-10 max-md:max-w-full max-md:px-5">
        <div className="flex-1 justify-between">
          <div className="text-blsack flex gap-1.5 whitespace-nowrap text-center tracking-widest">
            <Icons.Icon className="mr-2 h-6 w-6" />
            <span className="font-bold">{tIndex("title")}</span>
          </div>
          <div className="w-6/12 leading-6 text-zinc-900">
            {tFooter("description")}{" "}
          </div>
        </div>
        <div className="space-y-4">
          <div className="grid w-full grid-cols-2 items-center justify-between gap-x-8 gap-y-4 font-medium">
            {MAIN_NAVBAR_ITEMS.map((i) => (
              <Link
                href={i.href}
                key={i.href}
                className="opacity-70 transition-opacity hover:opacity-80 active:opacity-100"
              >
                {tNav(i.title.toLocaleLowerCase() as any)}
              </Link>
            ))}
          </div>
          <div className="flex gap-4">
            <LocaleSwitcherSelect label="" defaultValue={locale ?? "en"} />
            <Link href="https://github.com/blackmouse572/quizler-fe">
              <Button isIconOnly variant="light">
                <Icons.Github />
              </Button>
            </Link>
            <Link href="https://www.facebook.com/blackmouse572/">
              <Button isIconOnly variant="light">
                <Icons.Facebook />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
