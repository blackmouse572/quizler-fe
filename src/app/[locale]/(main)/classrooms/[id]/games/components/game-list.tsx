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
type Props = {
  classroomId: string
  filter?: Partial<PagedRequest>
  initialData?: PagedResponse<Game>
}

function GameList(props: Props) {
  const t = useTranslations("ClassroomGame")
  const format = useFormatter()
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
        const joinAble =
          new Date(game.startTime) < new Date() &&
          new Date(game.endTime) > new Date()
        let status = "active"
        if (new Date(game.endTime) < new Date()) {
          status = "inactive"
        } else if (new Date(game.startTime) > new Date()) {
          status = "upcoming"
        }

        return (
          <Card>
            <CardHeader>
              <div>
                <CardTitle>{game.gameName}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>
                  {t("actions.create.form.amount.label")}:&nbsp;
                  {game.numberOfQuizzes}
                </p>
                {new Date(game.endTime) < new Date() ? (
                  <p>
                    {t("actions.create.form.endTime.label")}:&nbsp;
                    {format.relativeTime(new Date(game.endTime))}
                  </p>
                ) : (
                  <p>
                    {t("actions.create.form.startTime.label")}:&nbsp;
                    {format.relativeTime(new Date(game.startTime))}
                  </p>
                )}
                <p>
                  {t("actions.create.form.duration.label")}:&nbsp;
                  {game.duration ?? t("card.unlimited")}
                </p>
                <Badge
                  color={
                    status === "active"
                      ? "success"
                      : status === "inactive"
                        ? "danger"
                        : "warning"
                  }
                >
                  {t(`card.${status}` as any)}
                </Badge>
              </div>
            </CardContent>
            <CardFooter>
              {joinAble ? (
                <Link href={`/classrooms/${props.classroomId}/game/${game.id}`}>
                  <Button>{t("card.join")}</Button>
                </Link>
              ) : (
                <></>
              )}
              {new Date(game.endTime) < new Date() && (
                <Link
                  href={`/classrooms/${props.classroomId}/games/${game.id}/result`}
                >
                  <Button color="success">
                    {t("actions.view_game_result.title")}
                  </Button>
                </Link>
              )}
            </CardFooter>
          </Card>
        )
      })
    })
  }, [data?.pages, format, props.classroomId, t])

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
