"use client"
import DeletePostConfirmDialog from "@/app/[locale]/(main)/classrooms/[id]/components/delete-post-confirm"
import { usePostList } from "@/app/[locale]/(main)/classrooms/[id]/components/usePostList"
import Preview from "@/components/editor/preview"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"
import { Skeleton } from "@/components/ui/skeleton"
import { NamedToolTip } from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast"
import UserDisplay from "@/components/user-display"
import { useUser } from "@/hooks/useUser"
import QuizBank from "@/types/QuizBank"
import PagedRequest from "@/types/paged-request"
import PagedResponse from "@/types/paged-response"
import { Post } from "@/types/postsData"
import { useInView } from "framer-motion"
import { useFormatter, useTranslations } from "next-intl"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

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
  const user = useUser().user
  const { toast } = useToast()
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [deletePostDialogOpen, setDeletePostDialogOpen] = useState(false)
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
  const renderAttachCard = useCallback(
    (quizbank: QuizBank) => (
      <Card className="relative">
        <CardHeader>
          <CardDescription>
            {t("posts.link-quiz")} ({quizbank.quizCount})
          </CardDescription>
          <CardTitle>{quizbank.bankName}</CardTitle>
        </CardHeader>
      </Card>
    ),
    [t]
  )
  const renderItem = useCallback(
    (post: Post) => {
      const {
        author,
        bankLink,
        classroom,
        comments,
        content,
        gameLink,
        title,
        created,
        updated,
        ...rest
      } = post
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
          <CardContent>
            <Preview
              content={content}
              className="border-none bg-transparent p-0"
            />
            {/* TODO: need to have quizbank to display */}
            {/* {bankLink && renderAttachCard({})} */}
          </CardContent>
          <CardFooter className="flex items-center justify-end gap-2">
            {user?.id === author.id && (
              <NamedToolTip content={t("posts.comments.delete")}>
                <Button
                  color="danger"
                  isIconOnly
                  variant="ghost"
                  disabled={deletePostDialogOpen}
                  onClick={() => {
                    setSelectedPost(post)
                    setDeletePostDialogOpen(true)
                  }}
                >
                  <Icons.Delete />
                </Button>
              </NamedToolTip>
            )}
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
    [deletePostDialogOpen, t, timeI18n, user?.id]
  )

  const renderItems = useMemo(() => {
    return data?.pages.map((page) => page?.data.map(renderItem))
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
      <DeletePostConfirmDialog
        open={deletePostDialogOpen}
        onOpenChange={setDeletePostDialogOpen}
        post={selectedPost}
      />
    </div>
  )
}

export default PostList
