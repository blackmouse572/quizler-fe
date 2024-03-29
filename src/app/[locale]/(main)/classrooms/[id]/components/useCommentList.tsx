import getAllCommentActions from "@/app/[locale]/(main)/classrooms/[id]/actions/get-comment-action"
import PagedRequest from "@/types/paged-request"
import { useInfiniteQuery } from "@tanstack/react-query"

type UsePostListProps = {
  postId: string
  filter?: Partial<PagedRequest>
  options?: any
}

export function useCommentList({ postId, filter, options }: UsePostListProps) {
  return useInfiniteQuery({
    queryKey: ["comments", `post-${postId}`],
    queryFn: async ({ pageParam }) => {
      const res = await getAllCommentActions({
        postId,
        filter: { ...filter, skip: pageParam as number },
      })
      if (!res.ok) {
        throw new Error(res.message)
      }

      return res.data
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage) return undefined
      if (lastPage.metadata.hasMore) {
        return lastPage.metadata.skip + (filter?.take || 20)
      }
      return undefined
    },
    initialPageParam: 0,

    ...options,
  })
}
