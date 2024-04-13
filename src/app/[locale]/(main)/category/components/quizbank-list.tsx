"use client"
import QuizbankCard from "@/components/quizbank-card"
import { Skeleton } from "@/components/ui/skeleton"
import QuizBank from "@/types/QuizBank"
import PagedRequest from "@/types/paged-request"
import PagedResponse from "@/types/paged-response"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useInView } from "framer-motion"
import { useTranslations } from "next-intl"
import { useCallback, useEffect, useRef } from "react"
import { getQuizBankByTag } from "../actions/get-quizbank-by-tag"

type Props = {
  data: PagedResponse<QuizBank>
  filter: Partial<PagedRequest>
  tag: string
}

export default function CategoryQuizBankList({
  data: initData,
  tag,
  filter,
}: Props) {
  const t = useTranslations("CategoryQuizBank")
  const inViewRef = useRef<HTMLDivElement>(null)
  const inView = useInView(inViewRef, {})

  const {
    isFetchingNextPage,
    isLoading,
    data,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["quizbank", tag, filter],
    queryFn: async ({ pageParam }) => {
      const res = await getQuizBankByTag(
        {
          ...filter,
          skip: pageParam,
          take: 20,
        },
        tag
      )
      if (!res.ok) {
        throw new Error(res.message)
      }

      return res.data
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const params =
        (lastPage?.metadata.skip ?? 0) + (lastPage?.metadata.take ?? 10)
      const hasMore = lastPage?.metadata.hasMore
      return hasMore ? params : undefined
    },
    initialData: { pages: [initData], pageParams: [0] },
  })

  const renderItem = useCallback(
    (item: QuizBank) => (
      <QuizbankCard
        key={item.id}
        item={item}
        translations={{
          terms: t("terms"),
          delete: t("delete"),
          edit: t("edit"),
          cancel: t("cancel"),
        }}
      />
    ),
    [t]
  )

  const renderLoading = useCallback((length?: number) => {
    return Array.from({ length: length ?? 5 }).map((_, index) => (
      <Skeleton key={index} className="h-40 w-full rounded-md" />
    ))
  }, [])

  useEffect(() => {
    if (
      inView &&
      hasNextPage &&
      !isFetchingNextPage &&
      !isError &&
      !isLoading
    ) {
      fetchNextPage()
    }
  }, [
    inView,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
  ])

  if (isError) {
    return (
      <div className="flex min-h-52 items-center justify-center">
        {error.message}
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {renderLoading()}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
      {data?.pages.map((page) => {
        return page?.data.map((item) => renderItem(item))
      })}
      {isFetchingNextPage && renderLoading(4)}
      <div ref={inViewRef} />
    </div>
  )
}
