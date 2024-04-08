"use client"

import { useProgress } from "@/app/[locale]/(fullscreen)/classrooms/[id]/game/[gameId]/components/useProgress"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { Game } from "@/types"
import { useEffect, useMemo, useRef } from "react"
type Props = {
  game: Game
}
function GameNavbar({ game }: Props) {
  const { current, total, setCurrent, reduce } = useProgress()
  const timeInterval = useRef<NodeJS.Timeout>()
  const width = useMemo(() => (current / total) * 100, [current, total])

  useEffect(() => {
    timeInterval.current = setInterval(() => {
      if (current <= 0) return
      reduce()
    }, 1000)

    return () => {
      clearInterval(timeInterval.current)
    }
  }, [current, reduce])

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
          <Button isIconOnly color="danger" variant="light">
            <Icons.X />
          </Button>
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
