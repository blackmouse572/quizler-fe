import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-accent duration-1000 ease-in-out",
        "h-full w-1/6",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
