"use client"
import { Button, ButtonProps } from "./ui/button"
import { Icons } from "./ui/icons"
import { cn } from "@/lib/utils"
import { MouseEventHandler } from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"

type Props = ButtonProps & {
    content: string
}

export default function CopyButton({ className, onClick, content, ...props }: Props) {

  // TODO: Implement action
  const hanldeClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    onClick?.(e)
  }
  return (
    <Tooltip delayDuration={200}>
      <TooltipTrigger asChild>
        <Button
          {...props}
          className={cn(className, "px-2")}
          onClick={hanldeClick}
          variant={"default"}
          color={"accent"}
        >
          <Icons.Copy style={{ marginRight: "unset" }} />
        </Button>
      </TooltipTrigger>
      <TooltipContent side={"top"}>{content}</TooltipContent>
    </Tooltip>
  )
}
