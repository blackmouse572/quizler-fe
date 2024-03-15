import * as React from "react"

import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { IIconKeys, Icons } from "@/components/ui/icons"
import { useTranslations } from "next-intl"
import Link from "next/link"
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

export default function SearchResults({ searchQuery }: SearchResultsProps) {
  const tNav = useTranslations("Navbar")
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500)

  const enabled = !!debouncedSearchQuery

  const {
    data,
    isLoading: isLoadingOrig,
    isError,
  } = useQuery<SearchGlobalResults>({
    queryKey: ["searchQuery", debouncedSearchQuery],
    queryFn: () => fetchSearchGlobal(debouncedSearchQuery, null, null),
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

  var quizBanksData = data?.quizBanks || null
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
