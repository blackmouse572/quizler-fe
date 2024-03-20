"use client"

import { Badge, BadgeProps } from "@/components/ui/badge"
import { Icons } from "@/components/ui/icons"
import { cn } from "@/lib/utils"
import { formatDuration, intervalToDuration } from "date-fns"
import React, { useEffect } from "react"

type Props = {
  duration: number
  onTimeEnd?: () => void
} & BadgeProps

function Counter({ duration, className, onTimeEnd, ...props }: Props) {
  const [time, setTime] = React.useState(duration)
  const interval = React.useRef<NodeJS.Timeout>()

  useEffect(() => {
    interval.current = setInterval(() => {
      setTime((time) => {
        if (time <= 0) {
          clearInterval(interval.current)
          onTimeEnd?.()
          return 0
        }
        return time - 1
      })
    }, 1000)
    return () => clearInterval(interval.current)
  }, [onTimeEnd])
  const intervalTimer = intervalToDuration({ start: 0, end: time * 1000 })

  const zeroPad = (num: number) => String(num).padStart(2, "0")

  const formatted = formatDuration(intervalTimer, {
    format: ["minutes", "seconds"],
    zero: true,
    delimiter: ":",
    locale: {
      formatDistance: (_token, count) => zeroPad(count),
    },
  })
  return (
    <Badge
      size="lg"
      variant="flat"
      onClick={() => {}}
      color={time <= 10 ? "danger" : "primary"}
      {...props}
      className={cn("h-10 origin-center transition-all", className)}
    >
      <Icons.Timer className="mr-2 h-5 w-5 opacity-70" />
      <span className="min-w-4 text-end">{formatted}</span>
    </Badge>
  )
}

export default Counter
