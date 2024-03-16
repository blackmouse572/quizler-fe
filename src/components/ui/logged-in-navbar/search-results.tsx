import * as React from "react"

import { fetchSearchGlobal } from "@/app/[locale]/(main)/search/actions/fetch-search-global"
import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { IIconKeys, Icons } from "@/components/ui/icons"
import { Skeleton } from "@/components/ui/skeleton"
import { useQuery } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { useDebounce } from "use-debounce"

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

export default function SearchResults({ searchQuery }: SearchResultsProps) {
  const tNav = useTranslations("Navbar")
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500)

  const enabled = !!debouncedSearchQuery

  const { data, isLoading, isError } = useQuery({
    queryKey: ["searchQuery", debouncedSearchQuery],
    queryFn: async () => {
      const res = await fetchSearchGlobal({
        search: debouncedSearchQuery,
        take: 4,
        skip: 0,
      })

      return res
    },
    enabled,
  })

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
          {fieldsData?.map((data: SearchType) =>
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

  const renderLoading = React.useMemo(() => {
    return Array.from({ length: 4 }).map((_, index) => (
      <CommandItem key={index} className="space-x-2">
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-14 w-full" />
      </CommandItem>
    ))
  }, [])

  if (isLoading) {
    return <CommandList>{renderLoading}</CommandList>
  }

  if (isError) {
    return (
      <CommandList>
        <CommandEmpty className="flex min-h-48 flex-col items-center justify-center text-neutral-500">
          <Icons.Empty className="h-16 w-16" />
          {tNav("nav_search.error_fetching_search")}
        </CommandEmpty>
      </CommandList>
    )
  }
  if (!data || (data.classrooms.length === 0 && data.quizBanks.length === 0)) {
    return (
      <CommandList>
        <CommandEmpty className="flex  min-h-48 flex-col items-center justify-center text-neutral-500">
          <Icons.Empty className="h-16 w-16" />
          {tNav("nav_search.no_search_result_found")}
        </CommandEmpty>
      </CommandList>
    )
  }

  const { quizBanks, classrooms } = data
  console.log("quizBanks", quizBanks, "classrooms", classrooms)

  return (
    <CommandList>
      {renderCommandGroup(
        quizBanks,
        tNav("quizbanks"),
        "Icon",
        "quizbank",
        "bankName"
      )}

      <CommandSeparator />

      {renderCommandGroup(
        classrooms,
        tNav("classrooms"),
        "School",
        "classrooms",
        "classname"
      )}
    </CommandList>
  )
}
