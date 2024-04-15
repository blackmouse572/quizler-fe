import { fetchQuiz } from "@/app/[locale]/(main)/quizbank/[id]/actions/fetch-quiz"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Icons } from "@/components/ui/icons"
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
import { useRouter } from "next/navigation"
import { useCallback, useMemo, useState } from "react"
import { fetchAIquestion } from "../actions/fetch-AI-question"
import ViewAIExplain from "./view-AI-explain"
import OverCountAILoggedInDialog from "./view-AI-explain-dialog/logged-in/over-count-ai-logged-in-dialog"

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
  const [openOverCountLoggedIn, setOpenOverCountLoggedIn] =
    useState<boolean>(false)
  const router = useRouter()

  const { data, error, isLoading, fetchNextPage, isError, hasNextPage } =
    useInfiniteQuery({
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

      if (!hiddenAIAnswer[quizKey]) {
        try {
          const res = await fetchAIquestion({ question, answer, explaination })

          if (res.message === "Unauthorized") {
            router.push("/login")
          } else {
            if (!res.ok || !res.data) {
              setOpenOverCountLoggedIn(true)
            }
          }

          const answerAIRes = res.data!.candidates[0].content.parts[0].text

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
      }
    },
    [hiddenAIAnswer, router]
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
          <div className="relative rounded-xl border border-solid border-border bg-white px-6 py-4 shadow-sm max-md:px-5">
            <div className="flex flex-col items-center justify-between gap-5 max-md:flex-col md:flex-row">
              <div className="flex-1 flex-col max-md:ml-0 max-md:w-full">
                <div className="text-base leading-6 text-black max-md:mt-10">
                  {questionWithDiv}
                </div>
              </div>
              <Separator orientation="vertical" className="min-h-32" />
              <div className="ml-5 flex-1 max-md:ml-0 max-md:w-full">
                <div className="text-base leading-6 text-black max-md:mt-10">
                  {quiz.answer}
                </div>
                <div className="">
                  <TooltipProvider>
                    <Dialog>
                      <Tooltip>
                        <DialogTrigger asChild>
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
                              isIconOnly
                              color="accent"
                              className="absolute right-2 top-2"
                            >
                              <Icons.AI />
                            </Button>
                          </TooltipTrigger>
                        </DialogTrigger>
                        <TooltipContent>
                          <p>{i18n("ViewQuizzes.view_AI_answer")}</p>
                        </TooltipContent>
                        {openOverCountLoggedIn && <OverCountAILoggedInDialog />}
                      </Tooltip>
                    </Dialog>
                  </TooltipProvider>
                </div>
              </div>
            </div>

            {!openOverCountLoggedIn && hiddenAIAnswer[quiz.id.toString()] && (
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
    [handleButtonAIClick, hiddenAIAnswer, i18n, openOverCountLoggedIn]
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
