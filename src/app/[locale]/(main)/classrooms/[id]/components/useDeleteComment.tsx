import { deleteCommentAction } from "@/app/[locale]/(main)/classrooms/[id]/actions/delete-comment-action"
import { queryClient } from "@/app/[locale]/provider"
import { Comment } from "@/types"
import PagedResponse from "@/types/paged-response"
import { InfiniteData, useMutation } from "@tanstack/react-query"
type UseDeleteCommentProps = {
  postId: string
  onError: (e: Error) => void
  onSuccess?: (data: string, variables: string) => void
}
export function useDeleteComment({
  postId,
  onError,
  onSuccess,
}: UseDeleteCommentProps) {
  return useMutation({
    mutationFn: async (commentId: string) => {
      const res = await deleteCommentAction({ commentId, postId })
      if (!res.ok) {
        throw new Error(res.message)
      }
      return commentId
    },
    onSuccess: (data, variables) => {
      if (data) {
        queryClient.setQueryData(
          ["comments", `post-${postId}`],
          (oldData: InfiniteData<PagedResponse<Comment>>) => {
            if (!oldData) return oldData
            return {
              ...oldData,
              pages: oldData.pages.map((page) => {
                return {
                  ...page,
                  data: page.data.filter((comment) => comment.id !== data),
                }
              }),
            }
          }
        )
      }
      onSuccess?.(data, variables)
    },
    onError,
  })
}
