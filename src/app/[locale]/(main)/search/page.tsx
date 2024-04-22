"use client"

import { useQuery } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { notFound, useSearchParams } from "next/navigation"
import React from "react"
import { useDebounce } from "use-debounce"
import { fetchSearchGlobal } from "./actions/fetch-search-global"
import ResultClassrooms from "./components/result-classrooms"
import ResultFilterTag from "./components/result-filter-tag"
import ResultQuizbanks from "./components/result-quizbanks"
import ResultQuizzes from "./components/result-quizzes"
import ResultUsers from "./components/result-users"

export default function SearchGlobalPage() {
  const searchParams = useSearchParams()
  const search = searchParams.get("search")
  const take = Number(searchParams.get("take") || 10)
  const skip = Number(searchParams.get("skip") || 0)
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
  } = useQuery({
    queryKey: [debouncedSearchQuery, take, skip],
    queryFn: () =>
      fetchSearchGlobal({ search: debouncedSearchQuery!, take, skip }),
    enabled,
  })

  const isLoading = React.useMemo(
    () => enabled && isLoadingOrig,
    [enabled, isLoadingOrig]
  )
  if (!data) return null
  const { classrooms, posts, quizBanks, quizzes, users } = data

  return (
    <>
      {isError && tSearch("search_error")}

      <div className="container mx-auto">
        <ResultFilterTag search={search!} />

        <ResultQuizbanks quizBanksData={quizBanks} isLoading={isLoading} />

        <ResultClassrooms classroomsData={classrooms} isLoading={isLoading} />

        <ResultQuizzes quizzesData={quizzes} isLoading={isLoading} />

        <ResultUsers usersData={users} isLoading={isLoading} />
      </div>
    </>
  )
}
