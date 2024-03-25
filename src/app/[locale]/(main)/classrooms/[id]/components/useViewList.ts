import getViewDetails from "@/app/[locale]/(main)/classrooms/[id]/actions/get-view-details-action"
import PagedRequest from "@/types/paged-request"
import { useInfiniteQuery } from "@tanstack/react-query"

type UseViewListProps = {
  postId: string
  filter?: Partial<PagedRequest>
  options?: any
}

export function UseViewList({ postId, filter, options }: UseViewListProps) {
  return useInfiniteQuery({
    ...options,
    queryKey: ["post-view", postId, filter?.search],
    queryFn: async ({ pageParam }) => {
      const res = await getViewDetails({
        postId,
        filter: {
          ...filter,
          skip: pageParam as number,
        },
      })
      if (!res.ok) {
        throw new Error(res.message)
      }

      return res.data!
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage) return undefined
      if (lastPage.metadata.hasMore) {
        return lastPage.metadata.skip + (filter?.take || 20)
      }
      return undefined
    },
    initialPageParam: 0,
  })
}
