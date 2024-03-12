"use client"

import { useDebounce } from "use-debounce"
import ResultClassrooms from "./components/result-classrooms"
import ResultFilterTag from "./components/result-filter-tag"
import ResultQuizbanks from "./components/result-quizbanks"
import ResultUsers from "./components/result-users"
import { notFound, useSearchParams } from "next/navigation"
import { SearchGlobalResults } from "@/types/search-global-results"
import { useQuery } from "@tanstack/react-query"
import { fetchSearchGlobal } from "./actions/fetch-search-global"
import React from "react"
import { useTranslations } from "next-intl"
import ResultQuizzes from "./components/result-quizzes"
import ResultPosts from "./components/result-posts"

export default function SearchGlobalPage() {
  const searchParams = useSearchParams()
  const search = searchParams.get("search")
  const take = searchParams.get("take")
  const skip = searchParams.get("skip")
  const tSearch = useTranslations("SearchPage")

  {
    !search && notFound()
  }

  const [debouncedSearchQuery] = useDebounce(search, 500)

  const enabled = !!debouncedSearchQuery

  const {
    data,
    isLoading: isLoadingOrig,
    isError,
  } = useQuery<SearchGlobalResults>({
    queryKey: [debouncedSearchQuery, take, skip],
    queryFn: () => fetchSearchGlobal(debouncedSearchQuery!, take, skip),
    enabled,
  })

  const isLoading = React.useMemo(
    () => enabled && isLoadingOrig,
    [enabled, isLoadingOrig]
  )

  var quizzesData = data?.quizzes || null
  var quizBanksData = data?.quizBanks || null
  var postsData = data?.posts || null
  var classroomsData = data?.classrooms || null
  var usersData = data?.users || null

  return (
    <>
      {isError && tSearch("search_error")}

      <div className="flex flex-col px-5">
        <ResultFilterTag search={search!} />

        <ResultQuizbanks quizBanksData={quizBanksData} isLoading={isLoading} />

        <ResultClassrooms
          classroomsData={classroomsData}
          isLoading={isLoading}
        />

        <ResultQuizzes quizzesData={quizzesData} isLoading={isLoading} />

        <ResultUsers usersData={usersData} isLoading={isLoading} />

        <ResultPosts postsData={postsData} isLoading={isLoading} />
      </div>
    </>
  )
}
