import { updatePostAction } from "@/app/[locale]/(main)/classrooms/[id]/actions/update-post-action"
import { queryClient } from "@/app/[locale]/provider"
import { Post } from "@/types"
import PagedResponse from "@/types/paged-response"
import { InfiniteData, useMutation } from "@tanstack/react-query"

type Props = {
  onSuccess?: () => void
  onError?: (error: Error) => void
}

export function useUpdatePost({ onSuccess, onError }: Props) {
  return useMutation({
    mutationFn: async (post: Post) => {
      const res = await updatePostAction(post)
      if (!res.ok) {
        throw new Error(res.message)
      } else {
        return res.data
      }
    },
    onSettled: (data, error) => {
      if (error) {
        console.error(error)
      }
      if (!data) return
      queryClient.setQueryData(
        ["posts"],
        (old: InfiniteData<PagedResponse<Post>>) => {
          if (!old) return old
          return {
            ...old,
            pages: old.pages.map((page) => {
              return {
                ...page,
                data: page.data.map((p) => {
                  if (p.id === data.id) {
                    return data
                  }
                  return p
                }),
              }
            }),
          }
        }
      )
      onSuccess?.()
    },
    onError,
  })
}
