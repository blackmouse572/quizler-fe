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
import { Skeleton } from "@/components/ui/skeleton"
import { Toggle } from "@/components/ui/toggle"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import QuizBank, { Quiz } from "@/types/QuizBank"
import PagedResponse from "@/types/paged-response"
import {
  EnterFullScreenIcon,
  PauseIcon,
  PlayIcon,
  ShuffleIcon,
  StarIcon,
} from "@radix-ui/react-icons"
import { InfiniteData } from "@tanstack/react-query"
import Autoplay from "embla-carousel-autoplay"
import { useTranslations } from "next-intl"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

type Props = {
  data: InfiniteData<PagedResponse<Quiz> | null, unknown>
  quizBankData: QuizBank
  onSeeMore: () => void
  isLoading: boolean
  isError: boolean
  take: number
  totals: number
  hasMore: boolean
}

export default function ViewFlashcard({
  data,
  hasMore,
  isError,
  isLoading,
  onSeeMore,
  totals,
  take,
  quizBankData,
}: Props) {
  const i18n = useTranslations("ViewQuizBank")

  const [api, setApi] = useState<CarouselApi>()
  const autoPlay = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true, playOnInit: false })
  )

  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const [selectedItem, setSelectedItem] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  const totalLoaded = useMemo(() => data.pages.length * take, [data, take])
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

  // trigger see more on near end of the list
  useEffect(() => {
    if (hasMore && !isLoading && !isError) {
      if (totalLoaded - current < 5) {
        onSeeMore()
      }
    }
  }, [current, hasMore, isError, isLoading, onSeeMore, totalLoaded])

  const loadingItem = useMemo(() => {
    if (isLoading) {
      return (
        <CarouselItem key="loading" className="bg-background">
          <Skeleton className="h-full w-full" />
        </CarouselItem>
      )
    }
  }, [isLoading])

  const renderItem = useCallback(
    (item: Quiz) => {
      const questionWithDiv = item.question
        .split("\n")
        .map((line: string, index: number) => <div key={index}>{line}</div>)

      return (
        <CarouselItem key={item.id}>
          <div className="p-1">
            <Card>
              <CardContent className="flex aspect-video items-center justify-center p-6">
                <span className="text-4xl">
                  {selectedItem ? questionWithDiv : item.answer}
                </span>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      )
    },
    [selectedItem]
  )

  const handleButtonClick = (newValue: boolean) => {
    setIsPlaying(newValue)
    if (autoPlay.current.isPlaying()) {
      autoPlay.current.stop()
    } else {
      autoPlay.current.play()
    }
  }

  const toggleAutoPlay = useCallback(() => {
    const autoplay = api?.plugins()?.autoplay as any
    if (!autoplay) return

    const playOrStop = autoplay.isPlaying() ? autoplay.stop : autoplay.play
    playOrStop()
  }, [api])

  useEffect(() => {
    const autoplay = api?.plugins()?.autoplay as any
    if (!autoplay) return

    setIsPlaying(autoplay.isPlaying())
    api
      // @ts-ignore
      ?.on("autoplay:play", () => setIsPlaying(true))
      // @ts-ignore
      .on("autoplay:stop", () => setIsPlaying(false))
      .on("reInit", () => setIsPlaying(false))
  }, [api])

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
        plugins={[autoPlay.current]}
      >
        <CarouselContent>
          {data.pages.map((page) => page?.data.map((item) => renderItem(item)))}
          {loadingItem}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="flex items-center justify-between gap-5 ">
        <div className="flex justify-between gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                onClick={toggleAutoPlay}
                aria-label={
                  isPlaying
                    ? i18n("ViewFlashcard.pause_button")
                    : i18n("ViewFlashcard.play_button")
                }
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </Toggle>
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
              <Toggle aria-label={i18n("ViewFlashcard.shuffle_button")}>
                <ShuffleIcon />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>{i18n("ViewFlashcard.shuffle_button")}</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="flex-1 text-center text-xs font-semibold leading-4 text-black">
          {current}/{count}
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
