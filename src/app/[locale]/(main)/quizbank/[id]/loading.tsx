import { Skeleton } from "@/components/ui/skeleton"

type Props = {}

function LoadingQuizbank({}: Props) {
  return (
    <main className="space-y-8">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-8 w-1/4 bg-white" />
          <Skeleton className="h-5 w-1/3 bg-white" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-5 w-32 bg-white" />
          <Skeleton className="h-5 w-5 bg-white" />
        </div>
      </div>
      <div>
        <Skeleton className="aspect-video w-full rounded-md border border-border p-16" />
      </div>
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton className="h-32 w-full bg-white" />
        ))}
      </div>
    </main>
  )
}

export default LoadingQuizbank
