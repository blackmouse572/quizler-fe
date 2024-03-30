
import QuizBank from "@/types/QuizBank"
import PagedRequest from "@/types/paged-request"
import PagedResponse from "@/types/paged-response"
import { useInfiniteQuery } from "@tanstack/react-query"
import getAllClassroomQuizBanksAction from "../actions/get-classroom-quizbanks-action"

type UseClassroomQuizbanksListProps = {
  classroomId: string
  filter?: Partial<PagedRequest>
  initialData?: PagedResponse<QuizBank>
}

export function useClassroomQuizbanksList({
  classroomId,
  filter,
  initialData,
}: UseClassroomQuizbanksListProps) {
  return useInfiniteQuery({
    queryKey: [`classroom-${classroomId}-quizbanks`, classroomId, filter],
    queryFn: async ({ pageParam }) => {
      const res = await getAllClassroomQuizBanksAction({
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
