import { useAddView } from "@/app/[locale]/(main)/classrooms/[id]/components/useAddView"
import { queryClient } from "@/app/[locale]/provider"
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
import { NamedToolTip } from "@/components/ui/tooltip"
import UserDisplay from "@/components/user-display"
import { useUser } from "@/hooks/useUser"
import { Post } from "@/types"
import { useInView } from "framer-motion"
import { useFormatter, useTranslations } from "next-intl"
import Link from "next/link"
import { useCallback, useEffect, useRef } from "react"

type Props = {
  post: Post
  classroomId: string
  setSelectedPost: (post: Post) => void
  setDeletePostDialogOpen: (open: boolean) => void
  setEditPostDialogOpen: (open: boolean) => void
  setViewPostDialogOpen: (open: boolean) => void
}
function PostItem({
  post,
  classroomId,
  setDeletePostDialogOpen,
  setEditPostDialogOpen,
  setViewPostDialogOpen,
  setSelectedPost,
}: Props) {
  const { author, title, content, created } = post
  const containerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, {
    once: true,
  })
  const t = useTranslations("ClassroomDetails")
  const timeI18n = useFormatter()
  const user = useUser().user
  const date = new Date(post.updated || post.created)
  const now = new Date()
  const { mutate, isPending } = useAddView({
    classroomId: classroomId,
    onError: (e, i, context) => {
      queryClient.setQueryData(["post"], context.previousPosts)
      console.error("[ERROR] cannot mark post as read", e)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] })
    },
  })

  useEffect(() => {
    if (inView) {
      mutate(post.id)
    }
  }, [inView, mutate, post.id])

  const renderAttachCard = useCallback(
    (post: Post) => {
      if (post.bankLink) {
        const quizBank = post.quizBank
        return (
          <Link href={`/quizbank/${quizBank.id}`}>
            <Card className="relative">
              <CardHeader>
                <CardDescription>
                  {t("posts.link-quiz")} ({post.quizBank.quizCount})
                </CardDescription>
                <CardTitle>{post.quizBank.bankName}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        )
      }
    },
    [t]
  )
  return (
    <Card key={post.id} ref={containerRef}>
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
      <CardContent className="">
        <Preview content={content} className="border-none bg-transparent p-0" />
        {renderAttachCard(post)}
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div>
          <Button
            variant="light"
            color="accent"
            onClick={() => {
              setSelectedPost(post)
              setViewPostDialogOpen(true)
            }}
          >
            <Icons.Eye />
            {post.view}
            {isPending && <Icons.Loader />}
          </Button>
        </div>
        <div className="space-x-2">
          {user?.id === author.id && (
            <>
              <NamedToolTip content={t("posts.comments.delete")}>
                <Button
                  color="danger"
                  isIconOnly
                  variant="ghost"
                  onClick={() => {
                    setSelectedPost(post)
                    setDeletePostDialogOpen(true)
                  }}
                >
                  <Icons.Delete />
                </Button>
              </NamedToolTip>

              <NamedToolTip content={t("posts.comments.delete")}>
                <Button
                  color="success"
                  isIconOnly
                  variant="ghost"
                  onClick={() => {
                    setSelectedPost(post)
                    setEditPostDialogOpen(true)
                  }}
                >
                  <Icons.Edit />
                </Button>
              </NamedToolTip>
            </>
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
        </div>
      </CardFooter>
    </Card>
  )
}

export default PostItem
