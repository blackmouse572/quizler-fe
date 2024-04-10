import { fetchMyClassrooms } from "@/app/[locale]/(main)/classrooms/actions/fetch-my-classroom"
import { Classroom } from "@/types"
import PagedRequest from "@/types/paged-request"
import PagedResponse from "@/types/paged-response"
import { useInfiniteQuery } from "@tanstack/react-query"

export default function useClassroomList({
  initialData,
  options,
}: {
  initialData: PagedResponse<Classroom>
  options?: Partial<PagedRequest>
}) {
  console.log({ options })
  return useInfiniteQuery({
    queryKey: ["classrooms", options?.search],
    queryFn: async ({ pageParam }) => {
      console.log("options", options)
      const res = await fetchMyClassrooms({
        ...options,
        skip: pageParam,
        take: 20,
      })
      if (!res.ok) {
        throw new Error(res.message)
      }

      return res.data
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const params =
        (lastPage?.metadata.skip || 0) + (lastPage?.metadata.take || 10)
      const hasMore = lastPage?.metadata.hasMore
      return hasMore ? params : undefined
    },
    initialData: { pages: [initialData], pageParams: [0] },
  })
}
