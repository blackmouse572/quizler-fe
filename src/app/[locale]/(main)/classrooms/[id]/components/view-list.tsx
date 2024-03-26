import { UseViewList } from "@/app/[locale]/(main)/classrooms/[id]/components/useViewList"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import UserDisplay from "@/components/user-display"
import { useInView } from "framer-motion"
import { useTranslations } from "next-intl"
import { useEffect, useMemo, useRef } from "react"
import { Button } from "react-day-picker"
type Props = {
  open: boolean
  onOpenChange: (isOpen: boolean) => void
  postId?: string
}
function ViewList({ open: isOpen, onOpenChange, postId = "" }: Props) {
  const loadmoreRef = useRef<HTMLDivElement>(null)
  const errorI18n = useTranslations("Errors")
  const inView = useInView(loadmoreRef)
  const {
    isLoading,
    data,
    isError,
    hasNextPage,
    error,
    refetch,
    fetchNextPage,
  } = UseViewList({
    postId,
    options: {
      enabled: isOpen && postId !== "",
    },
  })

  useEffect(() => {
    if (inView && hasNextPage && !isLoading) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, inView, isLoading])

  const renderError = useMemo(
    () =>
      isError && (
        <div className="space-y-4 text-danger-500">
          <h3 className="text-lg">{errorI18n("index")}</h3>
          <p className="text-sm">{errorI18n(error.message as any)}</p>
          <Button onClick={() => refetch()}>{errorI18n("refresh")}</Button>
        </div>
      ),
    [error?.message, errorI18n, isError, refetch]
  )

  const renderLoading = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => {
        return (
          <div key={i} className="flex gap-2">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        )
      }),
    []
  )

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        {isLoading && renderLoading}
        {renderError}
        <ScrollArea className="max-h-32 ">
          <div className="space-y-4">
            {data &&
              data.pages.map(
                (page) =>
                  page?.data.map((view) => (
                    <UserDisplay key={view.id} user={view} />
                  ))
              )}
          </div>
          <div id="loadmore" ref={loadmoreRef} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default ViewList
