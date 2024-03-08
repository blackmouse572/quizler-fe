"use client"

import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import * as React from "react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { IIconKeys, Icons } from "@/components/ui/icons"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "../button"
import { useDebounce } from "use-debounce"
import { useQuery } from "@tanstack/react-query"
import { SearchGlobalResults } from "@/types/search-global-results"
import { fetchSearchGlobal } from "@/app/[locale]/(main)/search/actions/fetch-search-global"

interface SearchResultsProps {
  searchQuery: string
}

type SearchType = {
  icon: IIconKeys
  id: string
  href: string
  displayName: string
  [key: string]: any
}

function SearchResults({ searchQuery }: SearchResultsProps) {
  const tNav = useTranslations("Navbar")
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500)

  const enabled = !!debouncedSearchQuery

  const {
    data,
    isLoading: isLoadingOrig,
    isError,
  } = useQuery<SearchGlobalResults>({
    queryKey: ["searchQuery", debouncedSearchQuery],
    queryFn: () => fetchSearchGlobal(debouncedSearchQuery),
    enabled,
  })

  const isLoading = React.useMemo(
    () => enabled && isLoadingOrig,
    [enabled, isLoadingOrig]
  )

  const renderLink = React.useCallback((data: SearchType) => {
    const Icon = Icons[data.icon]

    return (
      <CommandItem key={data.id} value={data.id + data.displayName}>
        <Icon className="mr-2 h-4 w-4" />
        <Link href={data.href} className="truncate">
          {data.displayName}
        </Link>
      </CommandItem>
    )
  }, [])

  const renderCommandGroup = React.useCallback(
    (
      fieldsData: any,
      heading: string,
      icon: IIconKeys,
      linkName: string,
      displayName: string
    ) => {
      return (
        <CommandGroup
          className="[&_[cmdk-group-items]]:grid [&_[cmdk-group-items]]:grid-cols-2"
          heading={heading}
        >
          {fieldsData?.slice(0, 4).map((data: SearchType) =>
            renderLink({
              icon: icon,
              id: data.id,
              href: `/${linkName}/${data.id}`,
              displayName: data[displayName],
            })
          )}
        </CommandGroup>
      )
    },
    [renderLink]
  )

  if (!enabled) return null

  var quizzesData = data?.quizzes || null
  var quizBanksData = data?.quizBanks || null
  var postsData = data?.posts || null
  var classroomsData = data?.classrooms || null

  return (
    <CommandList>
      {isLoading && (
        <div className="p-4 text-sm">{tNav("nav_search.type_something")}</div>
      )}
      {!isError &&
        !isLoading &&
        !quizBanksData?.length &&
        !classroomsData?.length && (
          <div className="py-6 text-center text-sm">
            {tNav("nav_search.no_search_result_found")}
          </div>
        )}
      {isError && (
        <CommandEmpty>{tNav("nav_search.error_fetching_search")}</CommandEmpty>
      )}
      {renderCommandGroup(
        quizBanksData,
        tNav("quizbanks"),
        "Icon",
        "quizbank",
        "bankName"
      )}

      <CommandSeparator />

      {renderCommandGroup(
        classroomsData,
        tNav("classrooms"),
        "School",
        "classrooms",
        "classname"
      )}
    </CommandList>
  )
}

export default function GlobalSearch() {
  const tNav = useTranslations("Navbar")

  const [open, setOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }

      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        setOpen((open) => !open)
        router.push("/search")
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [router])

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <>
      <Button
        onClick={handleClick}
        variant={"ghost"}
        color={"accent"}
        className="hidden text-sm md:flex"
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
          <Link href="/search">
            {tNav("nav_search.see_more_results")}
            <CommandShortcut>(⌘Enter)</CommandShortcut>
          </Link>
        </Button>
      </CommandDialog>
    </>
  )
}
