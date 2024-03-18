import { cn } from "@/lib/utils"
import { Interweave, InterweaveProps } from "interweave"

type Props = InterweaveProps

function Preview({ className, ...props }: Props) {
  return (
    <Interweave
      className={cn(
        "prose prose-sm w-full max-w-none rounded-md px-4 py-2.5 sm:prose-base dark:prose-invert",
        "prose-p:my-0",
        className
      )}
      {...props}
    />
  )
}

export default Preview
