"use client"

import ActionDialogConfirm from "@/components/delete-confirm-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IIconKeys, Icons } from "@/components/ui/icons"
import { Game } from "@/types"
import { useFormatter, useTranslations } from "next-intl"
import Link from "next/link"
import { useCallback, useMemo, useState } from "react"
import { fetchEndGame } from "../actions/fetch-end-game"
import { toast } from "@/components/ui/use-toast"
import { queryClient } from "@/app/[locale]/provider"

type GameCardProps = {
  game: Game
  classroomId: string
  displayActions?: boolean
}

const GameCard = ({ game, displayActions, classroomId }: GameCardProps) => {
  const actionsI18n = useTranslations("ClassroomGame.actions")
  const cardI18n = useTranslations("ClassroomGame.card")
  const errorI18n = useTranslations("Errors")

  const joinAble = useMemo(
    () =>
      new Date(game.startTime) < new Date() &&
      new Date(game.endTime) > new Date(),
    [game.endTime, game.startTime]
  )

  const status = useMemo(() => {
    if (new Date(game.endTime) < new Date()) {
      return "inactive"
    } else if (new Date(game.startTime) > new Date()) {
      return "upcoming"
    } else {
      return "active"
    }
  }, [game.endTime, game.startTime])

  const format = useFormatter()
  const [isEnd, setIsEnd] = useState<boolean>(false)

  const onEndGame = useCallback(async () => {
    const result = await fetchEndGame(classroomId, game.id)
    if (!result.ok) {
      return toast({
        title: actionsI18n("stop.message.failed.title"),
        description: errorI18n(result.message as any),
        variant: "flat",
        color: "danger",
      })
    } else {
      queryClient.invalidateQueries({
        queryKey: ["games", `game-classroom-${game.classroomId}`],
      })
      return toast({
        title: actionsI18n("stop.message.success.title"),
        description: actionsI18n("stop.message.success.description"),
        variant: "flat",
        color: "success",
      })
    }
  }, [classroomId, game.id, game.classroomId, actionsI18n, errorI18n])

  const stopGameIconKey = "ClockStop"
  const options = useMemo<
    {
      icon?: IIconKeys
      title: string
      onClick?: () => void
      href?: string
      className?: string
    }[]
  >(
    () => [
      {
        title: actionsI18n("stop.title"),
        icon: stopGameIconKey,
        className:
          "text-destructive hover:bg-destructive/5 hover:text-destructive focus:bg-destructive/5 focus:text-destructive",
        onClick: () => {
          setIsEnd(true)
        },
      },
    ],
    [actionsI18n]
  )

  const renderGame = useMemo(
    () => (
      <div className="space-y-2">
        <p>
          {actionsI18n("create.form.amount.label")}:&nbsp;
          {game.numberOfQuizzes}
        </p>
        {new Date(game.endTime) < new Date() ? (
          <p>
            {actionsI18n("create.form.endTime.label")}:&nbsp;
            {format.relativeTime(new Date(game.endTime))}
          </p>
        ) : (
          <p>
            {actionsI18n("create.form.startTime.label")}:&nbsp;
            {format.relativeTime(new Date(game.startTime))}
          </p>
        )}
        <p>
          {actionsI18n("create.form.duration.label")}:&nbsp;
          {game.duration ?? cardI18n("unlimited")}
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
          {cardI18n(`${status}` as any)}
        </Badge>
      </div>
    ),
    [game, format, cardI18n, actionsI18n, status]
  )

  const renderOptions = useMemo(() => {
    if (!displayActions) return null
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button isIconOnly variant={"ghost"} color={"accent"}>
            <Icons.DotVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {options.map(({ href, title, icon, onClick, className }) => {
            const Icon = icon ? Icons[icon] : undefined
            if (href)
              return (
                <DropdownMenuItem key={href} asChild>
                  <Link className={className} href={href}>
                    <>
                      {Icon && <Icon className="mr-2 inline-block h-4 w-4" />}
                      {title}
                    </>
                  </Link>
                </DropdownMenuItem>
              )
            return (
              <DropdownMenuItem
                key={title}
                className={className}
                onClick={(e) => {
                  e.stopPropagation()
                  onClick?.()
                }}
              >
                {Icon && <Icon className="mr-2 inline-block h-4 w-4" />}
                <span>{title}</span>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }, [displayActions, options])

  return (
    <Card>
      <CardHeader>
        <Link href={`/classrooms/${classroomId}/game/${game.id}`}>
          <CardTitle>{game.gameName}</CardTitle>
        </Link>
      </CardHeader>
      <CardContent className="flex justify-between">
        {renderGame}
        <div className="flex self-end">{renderOptions}</div>
        <ActionDialogConfirm
          description={actionsI18n("stop.dialog.description")}
          title={actionsI18n("stop.dialog.title", { name: game.gameName })}
          isOpen={isEnd}
          setOpen={setIsEnd}
          onAction={() => onEndGame()}
          iconKey={stopGameIconKey}
          terms={{
            cancel: actionsI18n("stop.dialog.terms.cancel"),
            action: actionsI18n("stop.dialog.terms.action"),
          }}
        />
      </CardContent>
      <CardFooter>
        {joinAble ? (
          <Link href={`/classrooms/${classroomId}/game/${game.id}`}>
            <Button>{cardI18n("join")}</Button>
          </Link>
        ) : (
          <></>
        )}
        {new Date(game.endTime) < new Date() && (
          <Link href={`/classrooms/${classroomId}/games/${game.id}/result`}>
            <Button color="success">
              {actionsI18n("view_game_result.title")}
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  )
}

export default GameCard
