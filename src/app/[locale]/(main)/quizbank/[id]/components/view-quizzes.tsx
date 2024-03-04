"use client"

import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { PiSparkle } from "react-icons/pi"
import usePaginationValue from "@/hooks/usePaginationValue"
import { fetchQuiz } from "../actions/fetch-quiz"
import { useState } from "react"

type Props = {
  id: string
  token: string
  quizData: any
}

export default function ViewQuizzes({ id, token, quizData }: Props) {
  const i18n = useTranslations("ViewQuizBank")
  const { skip, take, totalPages, hasMore } = usePaginationValue(
    quizData.metadata
  )

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

  return (
    <>
      <div className="z-10 mt-16 flex w-[849px] max-w-full items-start justify-between gap-5 px-5 max-md:mt-10 max-md:flex-wrap">
        <div className="flex-auto self-start text-xl font-bold leading-8 text-black">
          {i18n("ViewQuizzes.term")} ({quizData.metadata.totals})
        </div>
        <div className="mt-5 flex flex-col self-end whitespace-nowrap pb-2 font-medium text-white">
          <div className="mr-3 justify-center self-end rounded-lg bg-red-600 px-1.5 text-center text-xs leading-4 shadow-sm max-md:mr-2.5">
            BETA
          </div>
        </div>
      </div>

      {/* Render quizzes */}
      {Object.keys(data).map((quizKey) => {
        const quiz = data[quizKey]

        {
          /* Replace '\n' with <div></div> */
        }
        const questionWithDiv = quiz.question
          .split("\n")
          .map((line: string, index: number) => <div key={index}>{line}</div>)

        return (
          <div key={quizKey}>
            <div className="mt-4 w-[849px] max-w-full rounded-xl border border-solid border-[color:var(--Colors-Neutral-300,#D4D4D4)] bg-white px-6 py-4 shadow-sm max-md:px-5">
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
                <div className="ml-5">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="light" color={null}>
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
            </div>
          </div>
        )
      })}

      {quizData.metadata.hasMore && (
        <Button className="mt-2" onClick={handleSeemore} variant="light">
          {i18n("ViewQuizzes.see_more_btn")}
        </Button>
      )}
    </>
  )
}
