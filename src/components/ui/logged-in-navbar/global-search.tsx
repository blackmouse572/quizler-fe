"use client"

import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import * as React from "react"

import {
  CommandDialog,
  CommandInput,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "../button"
import SearchResults from "./search-results"
import { cn } from "@/lib/utils"

type Props = {
  className: string
}

export default function GlobalSearch({ className }: Props) {
  const tNav = useTranslations("Navbar")

  const [open, setOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const router = useRouter()

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams()
    params.set(name, value)

    return params.toString()
  }

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }

      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        setOpen((open) => !open)
        router.push("/search" + "?" + createQueryString("search", searchQuery))
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [router, searchQuery])

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <>
      <Button
        onClick={handleClick}
        variant={"ghost"}
        color={"accent"}
        className={cn(className)}
      >
        <MagnifyingGlassIcon />
        <div className="mr-4">{tNav("nav_search.search")}</div>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>J
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          value={searchQuery}
          onValueChange={setSearchQuery}
          placeholder={tNav("nav_search.type_something")}
        />

        <SearchResults searchQuery={searchQuery} />
        <CommandSeparator />

        <Button
          onClick={() => setOpen(!open)}
          className="mt-2 self-end whitespace-nowrap font-bold text-zinc-500"
          variant="light"
          color={null}
          asChild
        >
          <Link href={{ pathname: "/search", query: { search: searchQuery } }}>
            {tNav("nav_search.see_more_results")}
            <CommandShortcut>(⌘Enter)</CommandShortcut>
          </Link>
        </Button>
      </CommandDialog>
    </>
  )
}
