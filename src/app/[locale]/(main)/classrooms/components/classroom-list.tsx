"use client"
import ClassroomCard from "@/app/[locale]/(main)/classrooms/components/classroom-card"
import useClassroomList from "@/app/[locale]/(main)/classrooms/components/useClassroomList"
import { Skeleton } from "@/components/ui/skeleton"
import { Classroom } from "@/types"
import PagedRequest from "@/types/paged-request"
import PagedResponse from "@/types/paged-response"
import { useInView } from "framer-motion"
import { useCallback, useEffect, useRef } from "react"

type Props = {
  initialData: PagedResponse<Classroom>
  filter: Partial<PagedRequest>
}

function ClassroomList({ initialData, filter }: Props) {
  const inViewRef = useRef<HTMLDivElement>(null)
  const inView = useInView(inViewRef, {})
  const {
    data,
    isError,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useClassroomList({
    initialData,
  })
  const renderItem = useCallback(
    (item: Classroom) => <ClassroomCard key={item.id} item={item} />,
    []
  )
  const renderLoading = useCallback((length?: number) => {
    return Array.from({ length: length ?? 5 }).map((_, index) => (
      <Skeleton key={index} className="h-40 w-full rounded-md" />
    ))
  }, [])

  useEffect(() => {
    if (
      inView &&
      hasNextPage &&
      !isFetchingNextPage &&
      !isError &&
      !isLoading
    ) {
      fetchNextPage()
    }
  }, [
    inView,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
  ])
  if (isError) {
    return (
      <div className="flex min-h-52 items-center justify-center">
        {error.message}
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {renderLoading()}
      </div>
    )
  }
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
      {data?.pages.map((page, index) => {
        return page?.data.map((item) => renderItem(item))
      })}
      {isFetchingNextPage && renderLoading(4)}
      <div ref={inViewRef} />
    </div>
  )
}

export default ClassroomList
