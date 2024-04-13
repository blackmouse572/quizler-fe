"use client"
import { useGameList } from "@/app/[locale]/(main)/classrooms/[id]/games/components/useGameList"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Game } from "@/types"
import PagedRequest from "@/types/paged-request"
import PagedResponse from "@/types/paged-response"
import { useInView } from "framer-motion"
import { useFormatter, useTranslations } from "next-intl"
import Link from "next/link"
import { useEffect, useMemo, useRef } from "react"
import GameCard from "./game-card"
type Props = {
  classroomId: string
  filter?: Partial<PagedRequest>
  initialData?: PagedResponse<Game>
}

function GameList(props: Props) {
  const errorI18n = useTranslations("Errors")
  const loadmoreRef = useRef<HTMLDivElement>(null)
  const inView = useInView(loadmoreRef)
  const {
    isLoading,
    data,
    isError,
    hasNextPage,
    error,
    refetch,
    fetchNextPage,
  } = useGameList({
    ...props,
  })
  const renderLoadingItem = useMemo(() => {
    return <Skeleton className="h-48 w-full bg-white" />
  }, [])
  const renderLoadmore = useMemo(() => {
    return <div id="loadmore" ref={loadmoreRef} />
  }, [])
  const renderItems = useMemo(() => {
    return data?.pages.map((page) => {
      return page?.data.map((game) => {
        return (
          <GameCard
            classroomId={props.classroomId}
            game={game}
            displayActions={true}
          />
        )
      })
    })
  }, [data?.pages, props.classroomId])

  useEffect(() => {
    if (inView && hasNextPage && !isLoading) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, inView, isLoading])

  if (isError) {
    return (
      <div className="space-y-4 text-danger">
        <h3 className="text-lg">{errorI18n("index")}</h3>
        <p>{errorI18n(error?.message as any)}</p>
        <Button onClick={() => refetch()}>{errorI18n("refresh")}</Button>
      </div>
    )
  }
  if (isLoading)
    return (
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4 ">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i}>{renderLoadingItem}</div>
        ))}
      </div>
    )
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
      {renderItems}
      {renderLoadmore}
    </div>
  )
}

export default GameList
