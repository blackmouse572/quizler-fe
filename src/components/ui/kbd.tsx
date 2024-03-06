import { cn } from "@/lib/utils"
import React from "react"

type Props = React.HTMLAttributes<HTMLElement>

function KBD({ className, children, ...props }: Props) {
  return (
    <kbd
      {...props}
      className={cn(
        "pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100",
        className
      )}
    >
      <span className="text-xs">{children}</span>
    </kbd>
  )
}

export default KBD
