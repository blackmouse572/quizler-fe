"use client"

import { useTranslations } from "next-intl"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  EnterFullScreenIcon,
  PauseIcon,
  PlayIcon,
  ShuffleIcon,
  StarIcon,
} from "@radix-ui/react-icons"
import { useEffect, useRef, useState } from "react"
import QuizBank from "@/types/QuizBank"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Autoplay from "embla-carousel-autoplay"

type Props = {
  quizBankData: QuizBank
  quizData: any
}

export default function ViewFlashcard({ quizBankData, quizData }: Props) {
  const i18n = useTranslations("ViewQuizBank")

  const [api, setApi] = useState<CarouselApi>()
  const plugin = useRef(Autoplay({ stopOnInteraction: true, }))

  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const [selectedItem, setSelectedItem] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })

    api.on("pointerDown", () => {
      setSelectedItem(!selectedItem)
    })
  }, [api, selectedItem])

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
      <div className="mt-7 flex w-[840px] max-w-full justify-between gap-5 whitespace-nowrap max-md:flex-wrap">
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
          <div className="grow">4.5 • 5</div>
        </div>
      </div>

      <div className="ml-72 mt-1.5 flex gap-1 self-start whitespace-nowrap text-center text-xs font-medium leading-4 text-zinc-500 max-md:ml-2.5">
        <div className="aspect-[3.05] justify-center rounded-lg border border-solid border-[color:var(--color-border,#E4E4E7)] bg-white px-2 py-0.5 shadow-sm">
          Biology
        </div>
        <div className="aspect-[3.05] justify-center rounded-lg border border-solid border-[color:var(--color-border,#E4E4E7)] bg-white px-2 py-0.5 shadow-sm">
          Biology
        </div>
      </div>

      {/* Flashcard */}
      <Carousel
        setApi={setApi}
        className="mt-6 w-[840px] max-w-full"
        opts={{
          align: "start",
        }}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.play}
      >
        <CarouselContent>
          {Object.keys(quizData).map((quizKey) => {
            const quiz = quizData[quizKey]

            {
              /* Replace '\n' with <div></div> */
            }
            const questionWithDiv = quiz.question
              .split("\n")
              .map((line: string, index: number) => (
                <div key={index}>{line}</div>
              ))

            return (
              <CarouselItem key={quizKey}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-video items-center justify-center p-6">
                      <span className="text-4xl">
                        {selectedItem ? questionWithDiv : quiz.answer}
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

      <div className="flex w-[840px] max-w-full justify-between gap-5 pr-5 max-md:flex-wrap">
        <div className="flex justify-between gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleButtonClick}
                  variant="light"
                  color={null}
                >
                  {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isPlaying ? i18n("ViewFlashcard.pause_button") : i18n("ViewFlashcard.play_button")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="light" color={null}>
                  <ShuffleIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{i18n("ViewFlashcard.shuffle_button")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex justify-between gap-5 whitespace-nowrap text-xs font-semibold leading-4 text-black">
          <div className="my-auto">
            Slide {current} of {count}
          </div>
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="light" color={null}>
                <EnterFullScreenIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{i18n("ViewFlashcard.full_screen_button")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  )
}
