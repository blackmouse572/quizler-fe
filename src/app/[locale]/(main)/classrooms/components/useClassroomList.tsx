import { fetchMyClassrooms } from "@/app/[locale]/(main)/classrooms/actions/fetch-my-classroom"
import { useUser } from "@/hooks/useUser"
import { Classroom } from "@/types"
import PagedRequest from "@/types/paged-request"
import PagedResponse from "@/types/paged-response"
import { useInfiniteQuery } from "@tanstack/react-query"

export default function useClassroomList({
  initialData,
  options,
  isOwner,
}: {
  initialData: PagedResponse<Classroom>
  options?: Partial<PagedRequest>
  isOwner?: boolean
}) {
  const { user } = useUser()
  return useInfiniteQuery({
    queryKey: ["classrooms", options, isOwner],
    queryFn: async ({ pageParam }) => {
      const res = await fetchMyClassrooms({
        ...options,
        skip: pageParam,
        take: 20,
      })
      if (!res.ok) {
        throw new Error(res.message)
      }

      return res.data as PagedResponse<Classroom>
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const params =
        (lastPage?.metadata.skip || 0) + (lastPage?.metadata.take || 10)
      const hasMore = lastPage?.metadata.hasMore
      return hasMore ? params : undefined
    },
    select: (data) => {
      if (!user || !isOwner) {
        return data
      }

      // only show classrooms that the user is the owner
      return {
        ...data,
        pages: data.pages.map((page) => ({
          ...page,
          data: page.data.filter(
            (classroom) => classroom.author.id === user.id
          ),
        })),
      }
    },
    initialData: { pages: [initialData], pageParams: [0] },
  })
}
