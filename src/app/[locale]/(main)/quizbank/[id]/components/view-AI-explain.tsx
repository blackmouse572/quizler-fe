import { Icons } from "@/components/ui/icons"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import Markdown from "markdown-parser-react"

type Props = {
  explain: string
  hiddenOrNot: string
}

export default function ViewAIExplain({ explain, hiddenOrNot }: Props) {
  return (
    <div
      className={cn(
        hiddenOrNot,
        "mt-5 whitespace-nowrap border-t-2 border-border max-md:mb-10"
      )}
    >
      <div className="mt-4 flex justify-center">
        <Icons.AI />
      </div>
      {explain === "" ? (
        <div className="space-y-1 py-5">
          <Skeleton className="h-6 w-5/6" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-6 w-5/6" />
        </div>
      ) : (
        <div className="mt-2 flex overflow-auto">
          <div className="text-pretty">
            <Markdown content={explain} />
          </div>
        </div>
      )}
    </div>
  )
}
