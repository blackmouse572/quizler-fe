import { fetchQuiz } from "@/app/[locale]/(main)/quizbank/[id]/actions/fetch-quiz"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Icons } from "@/components/ui/icons"
import { Skeleton } from "@/components/ui/skeleton"
import { Toggle } from "@/components/ui/toggle"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import QuizBank, { Quiz } from "@/types/QuizBank"
import PagedResponse from "@/types/paged-response"
import ReactCardFlipper from "react-card-flip"

import { useInfiniteQuery } from "@tanstack/react-query"
import Autoplay from "embla-carousel-autoplay"
import { useTranslations } from "next-intl"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

type Props = {
  initialData: PagedResponse<Quiz>
  quizBankData: QuizBank
  id: string
}

const LOAD_MORE_THRESHOLD = 3 // Load more when 3 items are left

import RateQuizbank from "@/app/[locale]/(main)/quizbank/[id]/components/rate-quizbank"
import { Badge } from "@/components/ui/badge"
import _ from "lodash"
import Link from "next/link"
import { useHotkeys } from "react-hotkeys-hook"

export default function ViewFlashcard({
  quizBankData,
  initialData,
  id,
}: Props) {
  const i18n = useTranslations("ViewQuizBank")

  const [api, setApi] = useState<CarouselApi>()
  const autoPlay = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true, playOnInit: false })
  )

  const [isShuffle, setIsShuffle] = useState(false)
  const [count] = useState(initialData?.metadata?.totals ?? 0)
  const [currentIndex, setCurrentIndex] = useState(count > 0 ? 1 : 0)
  const [totalLoaded, setTotalLoaded] = useState(initialData.data.length)
  const [currentItem, setCurrentItem] = useState<Quiz>()
  const [flipMap, setFlipMap] = useState<{ [key: number]: boolean }>(
    initialData.data.reduce(
      (acc, _, index) => {
        acc[index] = false
        return acc
      },
      {} as { [key: number]: boolean }
    )
  )
  const [isPlaying, setIsPlaying] = useState(true)

  const [shuffleField, shuffleDir] = useMemo(() => {
    if (!isShuffle) return ["created", "ASC"]
    const fields = ["answer", "question"]
    const field = fields[Math.floor(Math.random() * fields.length)]
    const dir = Math.random() > 0.5 ? "Asc" : "Desc"
    return [field, dir]
  }, [isShuffle])

  const {
    data,
    isLoading,
    isFetching,
    fetchNextPage,
    isError,
    refetch,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["fetchQuiz", "flashcard", id, shuffleField, shuffleDir],
    queryFn: async ({ pageParam }) => {
      const res = await fetchQuiz(id, {
        take: 10,
        skip: pageParam,
        sortBy: shuffleField,
        sortDirection: shuffleDir as "Asc" | "Desc",
      })
      if (!res.ok) {
        throw new Error(res.message)
      }
      setFlipMap((pre) => {
        const newMap = { ...pre }
        res.data?.data.forEach((_, index) => {
          newMap[index] = false
        })
        return newMap
      })
      setTotalLoaded((pre) => pre + 10)
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
    refetchOnWindowFocus: false,
    refetchInterval: false,
  })

  useEffect(() => {
    if (!api) {
      return
    }

    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap() + 1)
      data.pages.forEach((page) => {
        page?.data.find((item, index) => {
          if (index === api.selectedScrollSnap()) {
            setCurrentItem(item)
          }
        })
      })
    })
  }, [api, currentItem?.id, data.pages])

  const onSeeMore = useCallback(() => {
    if (!isError && !isLoading && hasNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, isError, isLoading])

  useEffect(() => {
    if (currentIndex === totalLoaded - LOAD_MORE_THRESHOLD) {
      onSeeMore()
    }
  }, [currentIndex, fetchNextPage, onSeeMore, totalLoaded])

  const loadingItem = useMemo(() => {
    if (isLoading) {
      return (
        <CarouselItem key="loading" className="bg-background">
          <Skeleton className="h-full w-full" />
        </CarouselItem>
      )
    }
  }, [isLoading])
  const shuffle = useCallback(() => {
    setCurrentIndex(1)
    setIsShuffle(!isShuffle)
    setTotalLoaded(10)
    refetch()
    api?.scrollTo(0)
  }, [isShuffle, refetch, api])

  useHotkeys("up,down,h,j", () => {
    setFlipMap((pre) => {
      const newMap = { ...pre }
      newMap[currentItem?.id || -1] = !newMap[currentItem?.id || -1]
      return newMap
    })
  })

  useHotkeys("r", () => {
    // do randown
    shuffle()
  })

  useHotkeys("p", () => {
    // do play
    toggleAutoPlay()
  })

  const renderItem = useCallback(
    (item: Quiz) => {
      const isFlip = flipMap[item.id] || false
      return (
        <CarouselItem
          key={item.id + "-carousel"}
          className="p-8"
          onClick={() => {
            setFlipMap((pre) => {
              const newMap = { ...pre }
              newMap[item.id] = !newMap[item.id]
              return newMap
            })
          }}
        >
          <ReactCardFlipper isFlipped={isFlip} flipDirection="vertical">
            <Card className="relative">
              <Badge className="fixed left-2 top-2">
                <Icons.LightBulb className="mr-2 h-4 w-4" />
                {_.truncate(item.answer, {
                  length: item.answer.length * 0.5,
                })}
              </Badge>
              <CardContent className="flex aspect-video items-center justify-center">
                <span className="text-4xl">{item.question}</span>
              </CardContent>
            </Card>
            <Card className="relative">
              <Badge className="fixed left-2 top-2 ">
                <Icons.LightBulb className="mr-2 h-4 w-4" />
                {_.truncate(item.question, {
                  length: item.question.length * 0.2,
                })}
              </Badge>
              <CardContent className="flex aspect-video items-center justify-center">
                <span className="text-4xl">{item.answer}</span>
              </CardContent>
            </Card>
          </ReactCardFlipper>
        </CarouselItem>
      )
    },
    [flipMap]
  )

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
          <RateQuizbank
            quizbankId={id}
            averageRating={quizBankData.averageRating}
          />
        </div>
      </div>

      <div className="flex gap-2 self-start whitespace-nowrap px-5 text-center text-xs font-medium leading-4 text-zinc-500 max-md:ml-2.5 ">
        {quizBankData.tags?.map((_, index) => {
          const tag = quizBankData.tags[index]
          return (
            <Link key={index} href={`/category?tag=${tag}`}>
              <Badge size="sm" color="accent">
                {tag}
              </Badge>
            </Link>
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
        autoFocus
      >
        {isFetching ? (
          <CarouselContent>
            <CarouselItem key={"loading-carousel"} className="p-8">
              <Card>
                <CardContent className="flex aspect-video items-center justify-center">
                  <Icons.Spinner className="h-10 w-10 animate-spin" />
                </CardContent>
              </Card>
            </CarouselItem>
          </CarouselContent>
        ) : (
          <CarouselContent>
            {data.pages.map(
              (page) => page?.data.map((item, index) => renderItem(item))
            )}
            {loadingItem}
          </CarouselContent>
        )}

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="flex items-center justify-between gap-5 ">
        <div className="flex justify-between gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                data-state={isPlaying ? "on" : "off"}
                onClick={toggleAutoPlay}
                aria-label={
                  isPlaying
                    ? i18n("ViewFlashcard.pause_button")
                    : i18n("ViewFlashcard.play_button")
                }
              >
                {isPlaying ? <Icons.Pause /> : <Icons.Play />}
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
              <Toggle
                aria-label={i18n("ViewFlashcard.shuffle_button")}
                onClick={shuffle}
                data-state={isShuffle ? "on" : "off"}
              >
                {isShuffle ? <Icons.ArrowsRight /> : <Icons.Shuffle />}
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>{i18n("ViewFlashcard.shuffle_button")}</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="flex-1 text-center text-xs font-semibold leading-4 text-black">
          {currentIndex}/{count}
        </div>
      </div>
    </>
  )
}
