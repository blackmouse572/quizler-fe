import getAllPostActions from "@/app/[locale]/(main)/classrooms/[id]/actions/get-all-posts-action"
import PagedRequest from "@/types/paged-request"
import PagedResponse from "@/types/paged-response"
import { Post } from "@/types/postsData"
import { useInfiniteQuery } from "@tanstack/react-query"

type UsePostListProps = {
  classroomId: string
  filter?: Partial<PagedRequest>
  initialData?: PagedResponse<Post>
}

export function usePostList({
  classroomId,
  filter,
  initialData,
}: UsePostListProps) {
  return useInfiniteQuery({
    queryKey: ["posts", classroomId, filter],
    queryFn: async ({ pageParam }) => {
      const res = await getAllPostActions({
        classroomId,
        filter: { ...filter, skip: pageParam },
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
    initialData: { pages: [initialData], pageParams: [0] },
  })
}
