import { getMyQuizbankAction } from "@/app/[locale]/(main)/quizbank/actions/get-my-quizbank-action"
import QuizBank from "@/types/QuizBank"
import PagedRequest from "@/types/paged-request"
import PagedResponse from "@/types/paged-response"
import { useInfiniteQuery } from "@tanstack/react-query"

type UsePostListProps = {
  classroomId: string
  filter?: Partial<PagedRequest>
  initialData?: PagedResponse<QuizBank>
  options?: any
}

export function useQuizbankList({
  classroomId,
  filter,
  initialData,
  options,
}: UsePostListProps) {
  return useInfiniteQuery({
    ...options,
    queryKey: ["quizbank", classroomId, filter?.search],
    queryFn: async ({ pageParam }) => {
      const res = await getMyQuizbankAction({
        // classroomId,
        ...filter,
        skip: pageParam as number,
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
    initialData: initialData && { pages: [initialData], pageParams: [0] },
  })
}
