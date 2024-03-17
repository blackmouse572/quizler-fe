"use client"
import { usePostList } from "@/app/[locale]/(main)/classrooms/[id]/components/usePostList"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import PagedRequest from "@/types/paged-request"
import PagedResponse from "@/types/paged-response"
import { Post } from "@/types/postsData"
import { useInView } from "framer-motion"
import { useTranslations } from "next-intl"
import { useEffect, useMemo, useRef } from "react"

type Props = {
  classroomId: string
  filter?: Partial<PagedRequest>
  initialData: PagedResponse<Post>
}

function PostList({ ...props }: Props) {
  const t = useTranslations("ClassroomDetails.posts")
  const errorI18n = useTranslations("Errors")
  const loadmoreRef = useRef<HTMLDivElement>(null)
  const inView = useInView(loadmoreRef)
  const {
    isLoading,
    data,
    isError,
    hasNextPage,
    error,
    refetch,
    fetchNextPage,
  } = usePostList({
    ...props,
  })

  const renderLoadingItem = useMemo(() => {
    return <Skeleton className="h-32 w-full bg-white" />
  }, [])

  const renderItems = useMemo(() => {
    return data?.pages.map((page, i) => {
      return page.data.map((post) => {
        return <div key={post.id}>{post.title}</div>
      })
    })
  }, [data?.pages])

  const renderLoadmore = useMemo(() => {
    return <div id="loadmore" ref={loadmoreRef} />
  }, [])

  useEffect(() => {
    if (inView && hasNextPage && !isLoading) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, inView, isLoading])

  if (isLoading) {
    return Array.from({ length: 5 }, (_, i) => (
      <div key={i}>{renderLoadingItem}</div>
    ))
  }

  if (isError) {
    return (
      <div className="space-y-4 text-danger">
        <h3 className="text-lg">{errorI18n("index")}</h3>
        <p>{errorI18n(error?.message as any)}</p>
        <Button onClick={() => refetch()}>{errorI18n("refresh")}</Button>
      </div>
    )
  }

  if (data?.pages.length === 0) {
    return <p className="text-neutral-500">{t("empty")}</p>
  }

  return (
    <div className="space-y-2">
      {renderItems}
      {renderLoadmore}
    </div>
  )
}

export default PostList
