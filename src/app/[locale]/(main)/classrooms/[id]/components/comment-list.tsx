import DeleteCommentConfirmDialog from "@/app/[locale]/(main)/classrooms/[id]/components/delete-comment-confirm"
import { useCommentList } from "@/app/[locale]/(main)/classrooms/[id]/components/useCommentList"
import { usePostComment } from "@/app/[locale]/(main)/classrooms/[id]/components/usePostComment"
import Preview from "@/components/editor/preview"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/ui/icons"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import UserDisplay from "@/components/user-display"
import { useUser } from "@/hooks/useUser"
import { Comment, Post } from "@/types"
import { useInView } from "framer-motion"
import { useFormatter, useTranslations } from "next-intl"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  post: Post | undefined
}
function CommentList({ onOpenChange, open, post, ...props }: Props) {
  const t = useTranslations("ClassroomDetails")
  const errorI18n = useTranslations("Errors")
  const timeI18n = useFormatter()
  const [content, setContent] = useState("")
  const loadmoreRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const inView = useInView(loadmoreRef)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<Comment>()
  const user = useUser().user

  const {
    isLoading,
    data,
    isError,
    hasNextPage,
    error,
    refetch,
    isFetchingNextPage,
    fetchNextPage,
  } = useCommentList({
    postId: post?.id ?? "",
    filter: { take: 5 },
    options: {
      enabled: open && post !== undefined,
    },
  })

  const { mutateAsync, isPending } = usePostComment(post?.id || "")

  const renderLoadingItem = useMemo(() => {
    return (
      <div className="flex">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="ml-2 flex-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    )
  }, [])

  const renderItems = useMemo(() => {
    return data?.pages.map(
      (page, i) =>
        page?.data.map((comment) => (
          <div
            key={comment.id}
            className="group space-y-2 focus-within:bg-accent hover:bg-accent/40"
          >
            <div className="flex justify-between">
              <UserDisplay
                user={comment.author}
                secondaryText={timeI18n.relativeTime(new Date(comment.created))}
              />
              {comment.author.id === user?.id && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="sm"
                      isIconOnly
                      variant="ghost"
                      color="accent"
                      className="invisible opacity-0 transition-all duration-200 focus:visible focus:opacity-100 focus-visible:visible focus-visible:opacity-100 group-hover:visible group-hover:opacity-100"
                      onClick={() => {
                        setSelectedItem(comment)
                      }}
                    >
                      <Icons.DotVertical />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => setIsDeleteDialogOpen(true)}
                      hidden={comment.author.id !== user?.id}
                      className="focus:bg-danger-500/20 focus:text-danger-500"
                    >
                      <Icons.Delete className="mr-2 inline-block h-4 w-4" />
                      {t("posts.comments.delete")}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            <p className="indent-2">{comment.content}</p>
          </div>
        ))
    )
  }, [data?.pages, t, timeI18n, user?.id])

  const renderLoadmore = useMemo(() => {
    if (isFetchingNextPage)
      return <>{Array.from({ length: 2 }).map((e) => renderLoadingItem)}</>
    if (hasNextPage)
      return (
        <button
          onClick={() => fetchNextPage()}
          className="text-sm text-muted-foreground"
        >
          {t("posts.comments.load_more")}
        </button>
      )
    return <div id="loadmore" ref={loadmoreRef}></div>
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, renderLoadingItem, t])

  const renderError = useMemo(() => {
    return isError ? (
      <div className="space-y-2 text-red-500">
        <h3 className="text-lg">{errorI18n("index")}</h3>
        <p>{errorI18n(error?.message as any)}</p>
        <Button color="accent" onClick={() => refetch()}>
          {errorI18n("refresh")}
        </Button>
      </div>
    ) : null
  }, [error?.message, errorI18n, isError, refetch])

  useEffect(() => {
    if (inView && hasNextPage && !isLoading) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, inView, isLoading])

  const onSubmit = useCallback(() => {
    if (content.trim() === "") return
    mutateAsync(content).then((cm) => {
      if (contentRef.current) {
        loadmoreRef.current?.scrollIntoView({
          behavior: "smooth",
        })
      }
    })
    setContent("")
  }, [content, mutateAsync])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DeleteCommentConfirmDialog
        comment={selectedItem}
        post={post}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      />
      <DialogContent className="p-0">
        <div className="rounded-t-md bg-accent">
          <DialogHeader className="p-6">
            <DialogTitle>
              {t(post?.title as any, {
                user: post?.author.fullName,
              })}
            </DialogTitle>
          </DialogHeader>
          <Separator />
        </div>
        <div className="max-h-[60vh] overflow-auto" ref={contentRef}>
          <div className="min-h-[440px] p-6">
            <Preview
              content={post?.content}
              className="border-none bg-transparent p-0"
            />
          </div>
          <Separator />
          <div className="space-y-2 p-6 pt-3">
            {renderLoadmore}
            {renderError}
            {isLoading ? (
              Array.from({ length: 2 }).map((_, index) => (
                <div key={index}>{renderLoadingItem}</div>
              ))
            ) : (
              <div className="flex flex-col-reverse gap-6">{renderItems}</div>
            )}
          </div>
        </div>
        <DialogFooter className="p-6 pt-0">
          <Textarea
            value={content}
            required
            onChange={(e) => {
              setContent(e.target.value)
            }}
          />
          <Button
            isIconOnly
            variant="ghost"
            disabled={isPending}
            onClick={onSubmit}
          >
            {isPending ? (
              <Icons.Loader className="animate-spin" />
            ) : (
              <Icons.Send />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CommentList
