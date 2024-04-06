"use client"

import { Button } from "@/components/ui/button"
import { IIconKeys, Icons } from "@/components/ui/icons"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import AdminSidebarDropdown from "@/components/user-dropdown/admin-sidebar"
import { cn } from "@/lib/utils"
import { User } from "@/types"
import { MenuItem } from "@/types/dropdown-menu"
import { Variants, motion } from "framer-motion"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { useSelectedLayoutSegments } from "next/navigation"
import { useMemo, useState } from "react"

type Props = {
  user: User
}
const labelVariants: Variants = {
  open: (custom) => ({
    opacity: 1,
    x: 0,
    display: "block",
    transition: {
      delay: custom.index * 0.175,
      ease: "easeInOut",
    },
  }),
  closed: {
    opacity: 0,
    x: 80,
    transitionEnd: { display: "none" },
    transition: {
      delay: 0.2,
    },
  },
}
const iconVariants: Variants = {
  open: { opacity: 1, x: 0, display: "block" },
  closed: { opacity: 0, x: 80, transitionEnd: { display: "none" } },
}

type SidebarItem = {
  label: string
  icon: IIconKeys
  href: string
}

const ITEMS: SidebarItem[] = [
  {
    label: "sidebar.label.dashboard",
    icon: "TableFilled",
    href: "dashboard",
  },
  {
    label: "sidebar.label.users",
    icon: "UserFilled",
    href: "users",
  },
  {
    label: "sidebar.label.classrooms",
    icon: "School",
    href: "classrooms",
  },
  {
    label: "sidebar.label.quizbank",
    icon: "Icon",
    href: "quizbank",
  },
  {
    label: "sidebar.label.reports",
    icon: "Info",
    href: "reports",
  },
]

function Sidebar({ user }: Props) {
  const [isExpanded, setIsExpanded] = useState(true)
  const segments = useSelectedLayoutSegments()
  const i18n = useTranslations("AdminSidebar")

  const renderItems = useMemo(() => {
    return ITEMS.map((item, index) => {
      const Icon = Icons[item.icon]
      const isSelected = segments.includes(item.href)
      return (
        <Tooltip key={item.href}>
          <Link
            href={isSelected ? "#" : item.href}
            className={cn(
              "flex w-full min-w-8 cursor-pointer items-center gap-2.5 px-2.5 transition-all",
              isSelected ? "opacity-100" : "opacity-70",
              "hover:opacity-100"
            )}
            key={item.href}
          >
            <TooltipTrigger asChild>
              <div
                style={{
                  pointerEvents: isExpanded ? "none" : "auto",
                }}
                className={cn(
                  "p-[0.425rem] transition-all",
                  isSelected
                    ? "rounded-sm bg-emerald-600"
                    : "rounded-sm bg-neutral-700"
                )}
              >
                <span className={cn("aspect-square min-w-4")} id="playicon">
                  <Icon className="h-4 w-4" />
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={28}>
              <span className="font-medium">{i18n(item.label as any)}</span>
            </TooltipContent>
            <motion.div
              className="flex flex-1 flex-col justify-center"
              initial="closed"
              custom={{ index }}
              animate={isExpanded ? "open" : "closed"}
              variants={labelVariants}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
                bounce: 0,
              }}
            >
              <span className="font-medium">{i18n(item.label as any)}</span>
            </motion.div>
          </Link>
        </Tooltip>
      )
    })
  }, [i18n, isExpanded, segments])

  const menuItems: MenuItem[][] = [
    [
      {
        label: i18n("dropdown.profile"),
        href: `/profile`,
        shortcut: "⌘+P",
      },
    ],
  ]

  return (
    <motion.div
      layout
      id="sidebar"
      initial={{
        width: "13rem",
      }}
      animate={{
        width: isExpanded ? "13rem" : "5rem",
        transition: {
          delay: isExpanded ? 0 : 0.5,
          bounceDamping: 1,
          bounceStiffness: 1,
          bounce: 1,
        },
      }}
      className={cn("flex min-w-fit flex-col px-4 py-3 text-sm")}
    >
      <motion.span
        className="mx-auto "
        initial={{
          y: 0,
          opacity: 1,
        }}
        animate={{
          y: isExpanded ? 0 : -20,
          opacity: isExpanded ? 1 : 0,
          transition: {
            delay: isExpanded ? 0.5 : 0,
          },
        }}
      >
        <Icons.Icon className="w-6 min-w-6" />
      </motion.span>
      <motion.div variants={labelVariants} className="my-8 w-full space-y-2.5">
        {renderItems}
      </motion.div>
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute right-0 top-11 origin-center translate-x-1/2 rounded-full bg-background text-foreground shadow-md transition-all ease-out hover:bg-neutral-100"
        isIconOnly
        size={"sm"}
      >
        <Icons.SignatureArrow
          className={cn(
            "duration-400 transition-all ease-out",
            isExpanded ? "rotate-180" : ""
          )}
        />
      </Button>
      <AdminSidebarDropdown user={user} menuItems={menuItems} />
    </motion.div>
  )
}

export default Sidebar
