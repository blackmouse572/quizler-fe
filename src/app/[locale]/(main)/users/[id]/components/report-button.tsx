import { Button, ButtonProps } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import {
  NamedToolTip,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { MouseEventHandler } from "react"

type Props = ButtonProps & {
  content: string
}

export default function ReportButton({ onClick, content }: Props) {
  const hanldeClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    onClick?.(e)
  }

  return (
    <NamedToolTip content={content}>
      <Button onClick={hanldeClick} color="accent" isIconOnly>
        <Icons.Report />
      </Button>
    </NamedToolTip>
  )
}
