"use client"

import { Button } from "@/components/ui/button"
import { MainNavItem } from "@/components/ui/guest-navbar/guest-navbar"
import { Icons } from "@/components/ui/icons"
import { NamedToolTip } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { useRouter, useSelectedLayoutSegment } from "next/navigation"
import { useMemo } from "react"
type Props = {
  className?: string
  namespace?: string
  items: MainNavItem[]
}
export default function SideMenu({
  items,
  className,
  namespace = "Settings",
}: Props) {
  const t = useTranslations(namespace as any) as any

  const router = useRouter()
  const selectedLayout = useSelectedLayoutSegment()
  const itemsWithActived = useMemo(() => {
    return items.map((item) => {
      const segment = item.href.split("/")
      const actived =
        segment[segment.length - 1] ===
        (selectedLayout === null ? "" : selectedLayout)
      return { ...item, actived }
    })
  }, [items, selectedLayout])

  const handleClick = (href: string) => {
    router.push(href)
  }

  return (
    <div
      className={cn(
        "fixed bottom-0 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-md border border-input bg-background p-3 shadow-lg lg:bottom-auto lg:left-10 lg:top-1/2 2xl:left-20",
        className
      )}
    >
      <div className="relative flex gap-4 lg:flex-col">
        {itemsWithActived.map(({ href, title, actived, icon }) => {
          const Icon = icon ? Icons[icon] : undefined
          return (
            <Link href={href} key={href}>
              <NamedToolTip content={t(title)} side="left">
                <Button
                  variant={actived ? "default" : "light"}
                  className={cn(actived && "bg-emerald-500")}
                  onClick={() => handleClick(href!)}
                  isIconOnly
                >
                  {Icon && <Icon />}
                </Button>
              </NamedToolTip>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
