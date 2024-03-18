"use client"
import { usePostList } from "@/app/[locale]/(main)/classrooms/[id]/components/usePostList"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"
import { Skeleton } from "@/components/ui/skeleton"
import { NamedToolTip } from "@/components/ui/tooltip"
import UserDisplay from "@/components/user-display"
import PagedRequest from "@/types/paged-request"
import PagedResponse from "@/types/paged-response"
import { Post } from "@/types/postsData"
import { useInView } from "framer-motion"
import { Interweave } from "interweave"
import { useFormatter, useTranslations } from "next-intl"
import { useCallback, useEffect, useMemo, useRef } from "react"

type Props = {
  classroomId: string
  filter?: Partial<PagedRequest>
  initialData: PagedResponse<Post>
}

function PostList({ ...props }: Props) {
  const t = useTranslations("ClassroomDetails")
  const errorI18n = useTranslations("Errors")
  const timeI18n = useFormatter()
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

  const renderItem = useCallback(
    ({
      author,
      bankLink,
      classroom,
      comments,
      content,
      gameLink,
      title,
      created,
      updated,
      ...post
    }: Post) => {
      const date = new Date(updated || created)
      const now = new Date()
      return (
        <Card key={post.id}>
          <CardHeader>
            <UserDisplay
              user={{
                ...author,
                fullName: t(title as any, {
                  user: author.fullName,
                }),
              }}
              secondaryText={
                now.getTime() - date.getTime() < 86400000
                  ? timeI18n.relativeTime(new Date(created))
                  : timeI18n.dateTime(date, { timeStyle: "short" })
              }
            />
          </CardHeader>
          <CardContent className="prose prose-sm w-full max-w-none rounded-md sm:prose-base dark:prose-invert prose-p:my-0">
            <Interweave content={content} />
          </CardContent>
          <CardFooter className="flex items-center justify-end gap-2">
            <NamedToolTip content={t("posts.report.action")}>
              <Button color="accent" isIconOnly variant="ghost">
                <Icons.Report />
              </Button>
            </NamedToolTip>
            <NamedToolTip content={t("posts.comments.index")}>
              <Button color="accent" isIconOnly variant="ghost">
                <Icons.Comment />
              </Button>
            </NamedToolTip>
          </CardFooter>
        </Card>
      )
    },
    [t, timeI18n]
  )

  const renderItems = useMemo(() => {
    return data?.pages.map((page) => page.data.map(renderItem))
  }, [data?.pages, renderItem])

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
    return <p className="text-neutral-500">{t("posts.empty")}</p>
  }

  return (
    <div className="space-y-2">
      {renderItems}
      {renderLoadmore}
    </div>
  )
}

export default PostList
