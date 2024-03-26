"use client"
import CommentList from "@/app/[locale]/(main)/classrooms/[id]/components/comment-list"
import DeletePostConfirmDialog from "@/app/[locale]/(main)/classrooms/[id]/components/delete-post-confirm"
import EditPost from "@/app/[locale]/(main)/classrooms/[id]/components/edit-post"
import PostItem from "@/app/[locale]/(main)/classrooms/[id]/components/post-item"
import { usePostList } from "@/app/[locale]/(main)/classrooms/[id]/components/usePostList"
import ViewList from "@/app/[locale]/(main)/classrooms/[id]/components/view-list"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import PagedRequest from "@/types/paged-request"
import PagedResponse from "@/types/paged-response"
import { Post } from "@/types/postsData"
import { useInView } from "framer-motion"
import { useTranslations } from "next-intl"
import { useEffect, useMemo, useRef, useState } from "react"

type Props = {
  classroomId: string
  filter?: Partial<PagedRequest>
  initialData: PagedResponse<Post>
}

function PostList({ ...props }: Props) {
  const t = useTranslations("ClassroomDetails")
  const errorI18n = useTranslations("Errors")
  const loadmoreRef = useRef<HTMLDivElement>(null)
  const inView = useInView(loadmoreRef)
  const [selectedPost, setSelectedPost] = useState<Post | undefined>()
  const [deletePostDialogOpen, setDeletePostDialogOpen] = useState(false)
  const [editPostDialogOpen, setEditPostDialogOpen] = useState(false)
  const [viewPostDialogOpen, setViewPostDialogOpen] = useState(false)
  const [commentDialogOpen, setCommentDialogOpen] = useState(false)

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
    return <Skeleton className="h-18 w-full" />
  }, [])

  const renderItems = useMemo(() => {
    return data?.pages.map((page) => {
      return page?.data.map((post) => {
        return (
          <PostItem
            key={post.id}
            classroomId={props.classroomId}
            post={post}
            setSelectedPost={setSelectedPost}
            setViewPostDialogOpen={setViewPostDialogOpen}
            setDeletePostDialogOpen={setDeletePostDialogOpen}
            setEditPostDialogOpen={setEditPostDialogOpen}
            setCommentDialogOpen={setCommentDialogOpen}
          />
        )
      })
    })
  }, [data?.pages, props.classroomId])

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
      <EditPost
        post={selectedPost}
        open={editPostDialogOpen}
        onOpenChange={setEditPostDialogOpen}
      />
      <ViewList
        postId={selectedPost?.id}
        open={viewPostDialogOpen}
        onOpenChange={setViewPostDialogOpen}
      />
      <CommentList
        post={selectedPost}
        open={commentDialogOpen}
        onOpenChange={setCommentDialogOpen}
      />
    </div>
  )
}

export default PostList
