"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import usePaginationValue from "@/hooks/usePaginationValue"
import { Quiz } from "@/types/QuizBank"
import PagedResponse from "@/types/paged-response"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { PiSparkle } from "react-icons/pi"
import { fetchAIquestion } from "../actions/fetch-AI-question"
import { fetchQuiz } from "../actions/fetch-quiz"
import ViewAIExplain from "./view-AI-explain"

type Props = {
  id: string
  token: string
  quizData: PagedResponse<Quiz>
}

interface HiddenAIAnswerState {
  [key: string]: {
    hidden: boolean
    answerAIRes: string
  }
}

export default function ViewQuizzes({ id, token, quizData }: Props) {
  const i18n = useTranslations("ViewQuizBank")
  const { skip, take, totalPages, hasMore } = usePaginationValue(
    quizData.metadata
  )
  const router = useRouter()

  const [data, setData] = useState(quizData.data)
  const [currentPage, setCurrentPage] = useState(skip)

  const handleSeemore = async () => {
    const nextPage = currentPage + 1

    try {
      const nextPageRes = await fetchQuiz(id, token, nextPage)
      const nextPageData = await nextPageRes.json()

      setData((prevData: any) => [...prevData, ...nextPageData.data])
      setCurrentPage(nextPage)
    } catch (error) {
      console.error("Error loading more quizzes:", error)
    }
  }
  const [hiddenAIAnswer, setHiddenAIAnswer] = useState<HiddenAIAnswerState>({})

  const handleButtonAIClick = async (
    quizKey: string,
    token: string,
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
      const res = await fetchAIquestion(token, question, answer, explaination)
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
      return router.push("/login")
    }
  }

  return (
    <section>
      <div className="z-10 mt-16">
        <h3 className="text-xl font-bold  text-black">
          {i18n("ViewQuizzes.term")} ({quizData.metadata.totals})
        </h3>
      </div>

      <div className="space-y-4">
        {data.map((quiz) => {
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
                                token,
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
                    explain={
                      hiddenAIAnswer[quiz.id.toString()]?.answerAIRes || ""
                    }
                  />
                )}
              </div>
            </div>
          )
        })}
      </div>
      <div className="flex items-center gap-4">
        <Separator className="shrink" />
        {quizData.metadata.hasMore && (
          <Button
            className="mx-auto mt-2"
            onClick={handleSeemore}
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
