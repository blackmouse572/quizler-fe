"use client"
import ClassroomCard from "@/app/[locale]/(main)/classrooms/components/classroom-card"
import useClassroomList from "@/app/[locale]/(main)/classrooms/components/useClassroomList"
import { queryClient } from "@/app/[locale]/provider"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/components/ui/use-toast"
import { Classroom, TClassRoomCardRef } from "@/types"
import PagedRequest from "@/types/paged-request"
import PagedResponse from "@/types/paged-response"
import { InfiniteData } from "@tanstack/react-query"
import { useInView } from "framer-motion"
import { useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useMemo, useRef } from "react"
import { onDeleteClassroom } from "./mixin"

type Props = {
  initialData: PagedResponse<Classroom>
  filter: Partial<PagedRequest>
}
function ClassroomList({ initialData, filter }: Props) {
  const inViewRef = useRef<HTMLDivElement>(null)
  const inView = useInView(inViewRef, {})
  const deleteII18n = useTranslations("Delete_classroom")
  const i18n = useTranslations("Classroom")
  const errorI18n = useTranslations("Errors")
  const classroomCardRef = useRef<TClassRoomCardRef>(null)
  const search = useSearchParams()
  const isOwner = useMemo(
    () => (search.get("isOwner") === "true" ? true : false),
    [search]
  )
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
    options: filter,
    isOwner,
  })

  const deleteSucceedCb = useCallback(
    (id: number) => {
      classroomCardRef.current?.setIsDelete(false)
      queryClient.setQueryData(
        ["classrooms"],
        (oldData: InfiniteData<PagedResponse<Classroom>>) => {
          if (!oldData) return oldData
          return {
            ...oldData,
            pages: oldData.pages.map((page) => {
              return {
                ...page,
                data: page.data.filter((classroom) => +classroom.id !== id),
              }
            }),
          }
        }
      )

      return toast({
        title: deleteII18n("message.success.title"),
        description: deleteII18n("message.success.description"),
        variant: "flat",
        color: "success",
      })
    },
    [deleteII18n]
  )

  const deleteFailCb = useCallback(
    (message: string) => {
      classroomCardRef.current?.setIsDelete(false)
      return toast({
        title: deleteII18n("message.failed.title"),
        description: errorI18n(message as any),
        variant: "flat",
        color: "danger",
      })
    },
    [errorI18n, deleteII18n]
  )
  const leaveClassroomSuccess = useCallback(
    (id: string) => {
      toast({
        title: i18n("actions.leave.success.title"),
        description: i18n("actions.leave.success.description"),
        color: "success",
      })
      queryClient.setQueryData(
        ["classrooms", filter],
        (oldData: InfiniteData<PagedResponse<Classroom>>) => {
          if (!oldData) return oldData
          return {
            ...oldData,
            pages: oldData.pages.map((page) => {
              return {
                ...page,
                data: page.data.filter((classroom) => classroom.id !== id),
              }
            }),
          }
        }
      )
    },
    [filter, i18n]
  )
  const renderItem = useCallback(
    (item: Classroom) => (
      <ClassroomCard
        ref={classroomCardRef}
        key={item.id}
        item={item}
        displayActions={true}
        onDeleteClassrooom={() =>
          onDeleteClassroom(+item.id, deleteSucceedCb, deleteFailCb)
        }
        onLeaveClassroom={leaveClassroomSuccess}
      />
    ),
    [deleteFailCb, deleteSucceedCb, leaveClassroomSuccess]
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

  if (data.pages.length === 0) {
    return <div className="flex min-h-52 items-center justify-center"></div>
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
