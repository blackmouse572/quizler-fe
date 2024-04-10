import getAllGamesByClassroomAction from "@/app/[locale]/(main)/classrooms/[id]/games/actions/get-game-action"
import { Game } from "@/types"
import PagedRequest from "@/types/paged-request"
import PagedResponse from "@/types/paged-response"
import { useInfiniteQuery } from "@tanstack/react-query"

type UseGameListProps = {
  classroomId: string
  filter?: Partial<PagedRequest>
  initialData?: PagedResponse<Game>
  options?: any
}

export function useGameList({
  classroomId,
  filter,
  options,
  initialData,
}: UseGameListProps) {
  return useInfiniteQuery({
    queryKey: ["games", `game-classroom-${classroomId}`],
    queryFn: async ({ pageParam }) => {
      const res = await getAllGamesByClassroomAction({
        filter: { ...filter, skip: pageParam as number },
        classroomId,
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
    ...options,
  })
}
