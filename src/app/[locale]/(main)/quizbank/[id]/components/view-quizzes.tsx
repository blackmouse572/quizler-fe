import { fetchQuiz } from "@/app/[locale]/(main)/quizbank/[id]/actions/fetch-quiz"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Quiz } from "@/types/QuizBank"
import PagedResponse from "@/types/paged-response"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { useCallback, useMemo, useState } from "react"
import { PiSparkle } from "react-icons/pi"
import { fetchAIquestion } from "../actions/fetch-AI-question"
import ViewAIExplain from "./view-AI-explain"

type Props = {
  initialData: PagedResponse<Quiz>

  id: string
}

interface HiddenAIAnswerState {
  [key: string]: {
    hidden: boolean
    answerAIRes: string
  }
}

export default function ViewQuizzes({ initialData, id }: Props) {
  const i18n = useTranslations("ViewQuizBank")
  const [hiddenAIAnswer, setHiddenAIAnswer] = useState<HiddenAIAnswerState>({})

  const {
    data,
    error,
    isLoading,
    isFetching,
    fetchNextPage,
    isError,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["fetchQuiz", id],
    queryFn: async ({ pageParam }) => {
      const res = await fetchQuiz(id, {
        take: 10,
        skip: pageParam,
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

  const handleButtonAIClick = useCallback(
    async (
      quizKey: string,
      question: string,
      answer: string,
      explaination?: string
    ) => {
      setHiddenAIAnswer((prevState) => ({
        ...prevState,
        [quizKey]: {
          ...prevState[quizKey],
          hidden: !prevState[quizKey]?.hidden,
        },
      }))

      try {
        const res = await fetchAIquestion(question, answer, explaination)
        const answerAIRes = res.candidates[0].content.parts[0].text

        setHiddenAIAnswer((prevState) => ({
          ...prevState,
          [quizKey]: {
            ...prevState[quizKey],
            answerAIRes: answerAIRes,
          },
        }))
      } catch (error) {
        console.error("Error fetching AI question:", error)
      }
    },
    []
  )

  const renderTitle = useMemo(
    () => (
      <div className="z-10 mt-16">
        <h3 className="text-xl font-bold  text-black">
          {i18n("ViewQuizzes.term")} ({data.pages[0]?.metadata.totals ?? 0})
        </h3>
      </div>
    ),
    [data.pages, i18n]
  )

  const renderItem = useCallback(
    (quiz: Quiz) => {
      const questionWithDiv = quiz.question
        .split("\n")
        .map((line: string, index: number) => <div key={index}>{line}</div>)

      return (
        <div key={quiz.id}>
          <div className="rounded-xl border border-solid border-border bg-white px-6 py-4 shadow-sm max-md:px-5">
            <div className="max-md: flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex w-6/12 flex-col max-md:ml-0 max-md:w-full">
                <div className="border-r-2 border-gray-300 text-base leading-6 text-black max-md:mt-10">
                  {questionWithDiv}
                </div>
              </div>
              <div className="ml-5 flex w-6/12 flex-col max-md:ml-0 max-md:w-full">
                <div className="text-base leading-6 text-black max-md:mt-10">
                  {quiz.answer}
                </div>
              </div>
              <div className="">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={async () =>
                          await handleButtonAIClick(
                            quiz.id.toString(),
                            quiz.question,
                            quiz.answer,
                            ""
                          )
                        }
                        variant="light"
                        color={null}
                      >
                        <PiSparkle />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{i18n("ViewQuizzes.view_AI_answer")}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            {hiddenAIAnswer[quiz.id.toString()] && (
              <ViewAIExplain
                key={quiz.id}
                hiddenOrNot={
                  hiddenAIAnswer[quiz.id.toString()]?.hidden
                    ? "block"
                    : "hidden"
                }
                explain={hiddenAIAnswer[quiz.id.toString()]?.answerAIRes || ""}
              />
            )}
          </div>
        </div>
      )
    },
    [handleButtonAIClick, hiddenAIAnswer, i18n]
  )

  if (isLoading) {
    return (
      <section>
        {renderTitle}
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </section>
    )
  }

  if (isError) {
    return (
      <>
        {renderTitle}
        <div className="text-xs text-danger">
          {error instanceof Error ? error.message : error}
        </div>
      </>
    )
  }

  return (
    <section>
      {renderTitle}

      <div className="space-y-4">
        {data.pages.map(
          (page, i) => page?.data.map((quiz) => renderItem(quiz))
        )}
      </div>
      <div className="flex items-center gap-4">
        <Separator className="shrink" />
        {hasNextPage && (
          <Button
            className="mx-auto mt-2"
            onClick={() => fetchNextPage()}
            variant="light"
          >
            {i18n("ViewQuizzes.see_more_btn")}
          </Button>
        )}
        <Separator className="shrink" />
      </div>
    </section>
  )
}
