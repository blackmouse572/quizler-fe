"use client"
import { getMyQuizbankAction } from "@/app/[locale]/(main)/quizbank/actions/get-my-quizbank-action"
import QuizbankCard from "@/components/quizbank-card"
import { Skeleton } from "@/components/ui/skeleton"
import QuizBank from "@/types/QuizBank"
import PagedRequest from "@/types/paged-request"
import PagedResponse from "@/types/paged-response"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useInView } from "framer-motion"
import { useTranslations } from "next-intl"
import { useCallback, useEffect, useRef } from "react"
import { deleteQuizBank } from "../actions/detete-quiz-bank"
import { toast } from "@/components/ui/use-toast"

type Props = {
  data: PagedResponse<QuizBank>
  filter: Partial<PagedRequest>
  token: string
}

function QuizBankList({ data: initData, token, filter }: Props) {
  const t = useTranslations("MyQuizbanks")
  const inViewRef = useRef<HTMLDivElement>(null)
  const inView = useInView(inViewRef, {})

  const i18n = useTranslations("Delete_quizbank")
  const errorI18n = useTranslations("Errors")
  const {
    isFetchingNextPage,
    isLoading,
    data,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["quizbank"],
    queryFn: async ({ pageParam }) => {
      const res = await getMyQuizbankAction({
        skip: pageParam,
        take: 20,
      })
      if (!res.ok) {
        throw new Error(res.message)
      }

      return res.data
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const params =
        (lastPage?.metadata.skip || 0) + (lastPage?.metadata.take || 10)
      const hasMore = lastPage?.metadata.hasMore
      return hasMore ? params : undefined
    },
    initialData: { pages: [initData], pageParams: [0] },
  })

  const onDeleteQuizBank = useCallback( async (itemId: number, deleteSucceedCb: () => void) => {
    const result = await deleteQuizBank(token, itemId.toString())
    if (!result.isSuccess) {
      return toast({
        title: i18n("message.failed.title"),
        description: errorI18n(result.message as any),
        variant: "flat",
        color: "danger",
      })
    } else {
      deleteSucceedCb()
      return toast({
        title: i18n("message.success.title"),
        description: i18n("message.success.description"),
        variant: "flat",
        color: "success",
      })
    }
  },[errorI18n, i18n, token])

  const renderItem = useCallback(
    (item: QuizBank) => (
      <QuizbankCard
        key={item.id}
        item={item}
        translations={{
          terms: t("terms"),
        }}
        onDeleteQuizBank={onDeleteQuizBank}
      />
    ),
    [onDeleteQuizBank, t]
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
      {data?.pages.map((page, index) => {
        return page?.data.map((item) => renderItem(item))
      })}
      {isFetchingNextPage && renderLoading(4)}
      <div ref={inViewRef} />
    </div>
  )
}

export default QuizBankList
