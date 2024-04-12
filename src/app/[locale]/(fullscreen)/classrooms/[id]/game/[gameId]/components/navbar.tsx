"use client"

import { useProgress } from "@/app/[locale]/(fullscreen)/classrooms/[id]/game/[gameId]/components/useProgress"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { Game } from "@/types"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useMemo } from "react"
type Props = {
  game: Game
}
function GameNavbar({ game }: Props) {
  const { current, total, setCurrent, reduce } = useProgress()
  const width = useMemo(() => (current / total) * 100, [current, total])
  const t = useTranslations("ClassroomGame")
  const router = useRouter()

  return (
    <div className="fixed top-0 h-16 w-full border-b border-input bg-background shadow-md">
      <div className="relative block h-full">
        <div className="flex h-full w-full items-center justify-between px-5">
          <div>
            <Icons.Icon />
          </div>
          <div>
            <p className="text-sm font-bold">
              {game.gameName.toLocaleUpperCase()}
            </p>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button isIconOnly color="danger" variant="light">
                <Icons.X />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t("actions.leave.title")}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t("actions.leave.description")}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel />
                <AlertDialogAction
                  onClick={() => router.push(`/classrooms/${game.classroomId}`)}
                >
                  {t("actions.leave.confirm")}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <progress
          className="absolute -bottom-1 h-1 origin-center bg-foreground"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  )
}

export default GameNavbar
