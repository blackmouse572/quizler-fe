import getAllGamesByClassroomAction from "@/app/[locale]/(main)/classrooms/[id]/games/actions/get-game-action"
import { Game } from "@/types"
import PagedRequest from "@/types/paged-request"
import PagedResponse from "@/types/paged-response"
import { useInfiniteQuery } from "@tanstack/react-query"

type UseGameListProps = {
  classroomId: string
  filter?: Partial<PagedRequest>
  initialData?: PagedResponse<Game>
}

export function useGameList({
  classroomId,
  filter,
  initialData,
}: UseGameListProps) {
  return useInfiniteQuery({
    queryKey: ["game", classroomId, filter],
    queryFn: async ({ pageParam }) => {
      const res = await getAllGamesByClassroomAction({
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
