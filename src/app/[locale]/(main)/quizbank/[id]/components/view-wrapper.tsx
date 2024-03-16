"use client"
import { fetchQuiz } from "@/app/[locale]/(main)/quizbank/[id]/actions/fetch-quiz"
import ViewFlashcard from "@/app/[locale]/(main)/quizbank/[id]/components/view-flashcard"
import ViewQuizzes from "@/app/[locale]/(main)/quizbank/[id]/components/view-quizzes"
import { useUser } from "@/hooks/useUser"
import { Quiz } from "@/types"
import QuizBank from "@/types/QuizBank"
import PagedResponse from "@/types/paged-response"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useState } from "react"

type Props = {
  initialData: PagedResponse<Quiz>
  quizBankData: QuizBank
  id: string
}

function ViewWrapper({ id, initialData, quizBankData }: Props) {
  const user = useUser((pre) => pre.user)
  const [isShuffle, setIsShuffle] = useState(false)

  const {
    data,
    error,
    isLoading,
    isFetching,
    fetchNextPage,
    isError,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["fetchQuiz", id, isShuffle],
    queryFn: async ({ pageParam }) => {
      const res = await fetchQuiz(id, user?.accessToken.token ?? "", {
        take: 10,
        skip: pageParam,
        sortBy: isShuffle ? "question" : "created",
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
    initialData: { pages: [initialData], pageParams: [0] },
  })

  return (
    <div>
      <ViewFlashcard
        quizBankData={quizBankData}
        take={data.pages[0]?.metadata.take ?? 0}
        key={id}
        isLoading={isLoading || isFetching}
        isError={isError}
        data={data}
        onSeeMore={() => fetchNextPage()}
        totals={data.pages[0]?.metadata.totals ?? 0}
        hasMore={hasNextPage}
        onShuffle={() => {
          setIsShuffle(!isShuffle)
          console.log("shuffle", isShuffle)
          fetchNextPage()
        }}
      />
      <ViewQuizzes
        key={id}
        isLoading={isLoading}
        isError={isError}
        data={data}
        onSeeMore={() => fetchNextPage()}
        totals={data.pages[0]?.metadata.totals ?? 0}
        hasMore={hasNextPage}
      />
    </div>
  )
}

export default ViewWrapper
