"use client"

import useGame from "@/app/[locale]/(fullscreen)/classrooms/[id]/game/[gameId]/components/useGame"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { useEffect, useRef, useState } from "react"
type Props = {
  duration: number
}
function GameNavbar({ duration: initDuration }: Props) {
  const questions = useGame((state) => state.questions)
  const {
    nextQuestion,
    prevQuestion,
    currentIndex,
    isNextDisabled,
    isPrevDisabled,
    updateDuration,
    duration,
  } = useGame()
  const [progress, setProgress] = useState(initDuration)
  const timeInterval = useRef<NodeJS.Timeout>()
  useEffect(() => {
    timeInterval.current = setInterval(() => {
      setProgress((prev) => {
        let res = prev - 1
        if (prev <= 0) {
          clearInterval(timeInterval.current)
          res = 0
        }
        updateDuration(res)
        return res
      })
    }, 100)

    return () => {
      clearInterval(timeInterval.current)
    }
  }, [updateDuration])

  function resetProgress() {
    setProgress(initDuration)
  }

  function handleNextQuestion() {
    resetProgress()
    nextQuestion()
  }

  function handlePrevQuestion() {
    resetProgress()
    prevQuestion()
  }

  return (
    <div className="fixed top-0 h-16 w-full border-b border-input bg-background shadow-md">
      <div className="relative block h-full">
        <div className="flex h-full w-full items-center justify-between px-5">
          <Button isIconOnly color="danger" variant="light">
            <Icons.X />
          </Button>
          <div>
            <p className="text-sm font-bold">
              {currentIndex + 1}/{questions.length}
            </p>
          </div>
          <div className="space-x-2">
            <Button
              isIconOnly
              variant="flat"
              onClick={handlePrevQuestion}
              disabled={isPrevDisabled}
            >
              <Icons.ChevronLeft />
            </Button>
            <Button
              isIconOnly
              variant="flat"
              onClick={handleNextQuestion}
              disabled={isNextDisabled}
            >
              <Icons.ChevronRight />
            </Button>
          </div>
        </div>
        <progress
          className="absolute -bottom-1 h-1 origin-center bg-foreground"
          style={{ width: `${progress / 10}%` }}
        />
      </div>
    </div>
  )
}

export default GameNavbar
