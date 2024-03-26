import { createCommentAction } from "@/app/[locale]/(main)/classrooms/[id]/actions/create-comment-action"
import { queryClient } from "@/app/[locale]/provider"
import PagedResponse from "@/types/paged-response"
import { InfiniteData, useMutation } from "@tanstack/react-query"

export function usePostComment(postId: string) {
  return useMutation({
    mutationFn: async (comment: string) => {
      const res = await createCommentAction({
        content: comment,
        postId: postId,
      })

      if (!res.ok) {
        throw new Error(res.message)
      }

      return res.data
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.setQueryData(
          ["comments", `post-${postId}`],
          (oldData: InfiniteData<PagedResponse<Comment>>) => {
            if (!oldData) return oldData
            return {
              ...oldData,
              pages: oldData.pages.map((page, index) => {
                if (index === 0) {
                  return {
                    ...page,
                    data: [data, ...page.data],
                  }
                } else {
                  return page
                }
              }),
            }
          }
        )
      }
    },
  })
}
