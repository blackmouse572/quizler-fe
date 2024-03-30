import { Skeleton } from "@/components/ui/skeleton"
import { INotification } from "@/types"
import { useInView } from "framer-motion"
import { useEffect, useRef } from "react"
type Props = {
  data: INotification[]
  isLoading: boolean
  isLoadMore: boolean
  loadMore: () => void
  renderDivider?: () => JSX.Element
  renderNotification: (notification: INotification) => JSX.Element
}
function NotificationList({
  data,
  renderNotification,
  isLoadMore,
  renderDivider,
  isLoading,
  loadMore,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {
    margin: "12px",
  })

  useEffect(() => {
    if (inView && isLoadMore && !isLoading) {
      loadMore()
    }
  }, [inView, isLoadMore, isLoading, loadMore])

  return (
    <div className="max-h-32 scroll-m-6 overflow-y-auto overflow-x-hidden">
      {data.map((notification) => {
        return (
          <>
            {renderNotification(notification)}
            {renderDivider && renderDivider()}
          </>
        )
      })}
      {isLoading && (
        <div className="sapce-y-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      )}
      <div ref={ref} />
    </div>
  )
}

export default NotificationList
