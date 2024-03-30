import { getNotificationAction } from "@/components/notification-dropdown/actions/get-notification-action"
import { INotification } from "@/types"
import PagedRequest from "@/types/paged-request"
import PagedResponse from "@/types/paged-response"
import { useInfiniteQuery } from "@tanstack/react-query"

type Props = {
  initialData?: PagedResponse<INotification>
  options: any
  filter?: Partial<PagedRequest>
}

export function useNotification({ initialData, options, filter }: Props) {
  return useInfiniteQuery({
    ...options,
    queryKey: ["notification"],
    queryFn: async ({ pageParam }) => {
      const res = await getNotificationAction({
        // classroomId,
        sortBy: "created",
        sortDirection: "Desc",
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
