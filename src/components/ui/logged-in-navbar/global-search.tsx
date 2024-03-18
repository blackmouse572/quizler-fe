"use client"

import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import * as React from "react"

import SearchBox from "@/components/searchbox"
import {
  CommandDialog,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "../button"
import SearchResults from "./search-results"

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
      if (e.key === "k" && (e.metaKey || e.altKey)) {
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
        className={cn(
          "min-w-56 justify-start border border-input bg-accent text-accent-foreground/50",
          className
        )}
      >
        <MagnifyingGlassIcon className="h-5 w-5" />
        <div className="flex-1 pr-5 text-start">
          {tNav("nav_search.search")}
        </div>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <SearchBox
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex h-12 w-full items-center rounded-none border-b border-input bg-transparent text-sm outline-none placeholder:text-neutral-500 disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder:text-neutral-400 [&_svg]:left-3"
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
            {tNav("nav_search.see_more_results")}&nbsp;
            <CommandShortcut>(⌘Enter)</CommandShortcut>
          </Link>
        </Button>
      </CommandDialog>
    </>
  )
}
