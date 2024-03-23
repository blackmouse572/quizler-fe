"use client"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { useEffect, useRef, useState } from "react"

function GameNavbar() {
  const [progress, setProgress] = useState(1000)
  const timeInterval = useRef<NodeJS.Timeout>()

  useEffect(() => {
    timeInterval.current = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timeInterval.current)
          return 0
        }
        return prev - 1
      })
    }, 100)

    return () => {
      clearInterval(timeInterval.current)
    }
  }, [])

  console.log(progress)
  return (
    <div className="fixed top-0 h-16 w-full border-b border-input bg-background shadow-md">
      <div className="relative block h-full">
        <div className="flex h-full w-full items-center justify-between px-5">
          <Button isIconOnly color="danger" variant="light">
            <Icons.X />
          </Button>
          <div className="space-x-2">
            <Button isIconOnly variant="flat">
              <Icons.ChevronLeft />
            </Button>
            <Button isIconOnly variant="flat">
              <Icons.ChevronRight />
            </Button>
          </div>
        </div>
        <progress
          className="absolute -bottom-1 h-1 origin-center bg-foreground transition-all duration-1000 ease-linear"
          style={{ width: `${progress / 10}%` }}
        />
      </div>
    </div>
  )
}

export default GameNavbar
