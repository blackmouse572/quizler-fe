import { Button, ButtonProps } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { MouseEventHandler } from "react"

type Props = ButtonProps & {
  content?: string
}

export default function ReportButton({ onClick, content }: Props) {
  const hanldeClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    onClick?.(e)
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button onClick={hanldeClick} color="accent" isIconOnly>
          <Icons.Report />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  )
}
