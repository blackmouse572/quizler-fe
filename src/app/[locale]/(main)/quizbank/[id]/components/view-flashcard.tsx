"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import usePaginationValue from "@/hooks/usePaginationValue"
import QuizBank, { Quiz } from "@/types/QuizBank"
import PagedResponse from "@/types/paged-response"
import {
  EnterFullScreenIcon,
  PauseIcon,
  PlayIcon,
  ShuffleIcon,
  StarIcon,
} from "@radix-ui/react-icons"
import Autoplay from "embla-carousel-autoplay"
import { useTranslations } from "next-intl"
import { useEffect, useRef, useState } from "react"
import { fetchFlashcard } from "../actions/fetch-flashcard"

type Props = {
  id: string
  token: string
  quizBankData: QuizBank
  flashcardData: PagedResponse<Quiz>
}

export default function ViewFlashcard({
  id,
  token,
  quizBankData,
  flashcardData,
}: Props) {
  const i18n = useTranslations("ViewQuizBank")

  const [api, setApi] = useState<CarouselApi>()
  const plugin = useRef(Autoplay({ stopOnInteraction: true }))

  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const [selectedItem, setSelectedItem] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)

  const { skip, take, totals, hasMore } = usePaginationValue(
    flashcardData.metadata
  )
  const [data, setData] = useState(flashcardData.data)
  const [currentPage, setCurrentPage] = useState(skip)

  const handleSeemore = async () => {
    const nextPage = currentPage + 1

    try {
      const nextPageRes = await fetchFlashcard(id, token, nextPage)
      const nextPageData = await nextPageRes.json()

      setData((prevData: any) => [...prevData, ...nextPageData.data])
      setCurrentPage(nextPage)
    } catch (error) {
      console.error("Error loading more quizzes:", error)
    }
  }

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(totals)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })

    api.on("pointerDown", () => {
      setSelectedItem(!selectedItem)
    })
  }, [api, selectedItem, totals])

  const handleButtonClick = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying)
    if (isPlaying) {
      plugin.current.stop()
    } else {
      plugin.current.play()
    }
  }

  return (
    <>
      <div className="mt-7 flex w-full justify-between gap-5 whitespace-nowrap max-md:flex-wrap">
        <div className="flex flex-col px-5 text-black">
          <div className="text-2xl font-bold leading-9">
            {quizBankData.bankName}
          </div>
          <div className="text-lg font-medium leading-8">
            {quizBankData.description}
          </div>
        </div>
        <div className="my-auto flex justify-end gap-2.5 px-5 text-base leading-6 text-neutral-900">
          <StarIcon width="3rem" height="1.5rem" />
          <div className="grow">{quizBankData.averageRating} • 5</div>
        </div>
      </div>

      <div className="flex gap-2 self-start whitespace-nowrap text-center text-xs font-medium leading-4 text-zinc-500 max-md:ml-2.5">
        {Object.keys(quizBankData.tags).map((_, index) => {
          const tag = quizBankData.tags[index]
          return (
            <div
              key={index}
              className="aspect-[3.05] justify-center rounded-lg border border-solid border-border bg-white px-2 py-0.5 shadow-sm"
            >
              {tag}
            </div>
          )
        })}
      </div>

      {/* Flashcard */}
      <Carousel
        setApi={setApi}
        className="mt-6"
        opts={{
          align: "start",
        }}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.play}
      >
        <CarouselContent>
          {data.map((quizKey) => {
            const questionWithDiv = quizKey.question
              .split("\n")
              .map((line: string, index: number) => (
                <div key={index}>{line}</div>
              ))

            return (
              <CarouselItem key={quizKey.id}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-video items-center justify-center p-6">
                      <span className="text-4xl">
                        {selectedItem ? questionWithDiv : quizKey.answer}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="flex justify-between gap-5 ">
        <div className="flex justify-between gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={handleButtonClick} variant="light" isIconOnly>
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {isPlaying
                  ? i18n("ViewFlashcard.pause_button")
                  : i18n("ViewFlashcard.play_button")}
              </p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="light" isIconOnly>
                <ShuffleIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{i18n("ViewFlashcard.shuffle_button")}</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="flex justify-between gap-5 whitespace-nowrap text-xs font-semibold leading-4 text-black">
          <div className="my-auto">
            {current}/{count}
          </div>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="light" isIconOnly>
              <EnterFullScreenIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{i18n("ViewFlashcard.full_screen_button")}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </>
  )
}
