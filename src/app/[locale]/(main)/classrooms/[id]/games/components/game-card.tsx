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
import { useMemo } from "react"

type GameCardProps = {
  game: Game
  classroomId: string
  displayActions?: boolean
}

const GameCard = ({ game, displayActions, classroomId }: GameCardProps) => {
  const t = useTranslations("ClassroomGame")
  const format = useFormatter()

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
        title: "End Game",
        icon: "X",
        className:
          "text-destructive hover:bg-destructive/5 hover:text-destructive focus:bg-destructive/5 focus:text-destructive",
        onClick: () => {
          // setIsDelete(true)
        },
      },
    ],
    []
  )

  const renderGame = useMemo(
    () => (
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
        {new Date(game.endTime) < new Date() ? (
          <>
            <Badge color="accent">{t("card.inactive")}</Badge>
          </>
        ) : (
          <Badge color="success">{t("card.active")}</Badge>
        )}
      </div>
    ),
    [
      format,
      game.duration,
      game.endTime,
      game.numberOfQuizzes,
      game.startTime,
      t,
    ]
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
      </CardContent>
      <CardFooter>
        {(new Date(game.endTime) < new Date() ||
          game.numberOfQuizzes === 0) ?? <Button>{t("card.join")}</Button>}
      </CardFooter>
    </Card>
  )
}

export default GameCard
