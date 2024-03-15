import getUsersAction from "@/components/user-selector/get-user-action"
import { User } from "@/types"
import PagedRequest from "@/types/paged-request"
import { useInfiniteQuery } from "@tanstack/react-query"

type UseUserSelectorQueryProps = {
  initialPageParam?: number
  initialData?: User[]
  filter?: Partial<PagedRequest>
}
export default function useUserSelectorQuery({
  filter = {
    search: "",
    skip: 0,
    take: 10,
  },
  ...props
}: UseUserSelectorQueryProps) {
  return useInfiniteQuery({
    queryKey: ["users", filter],
    queryFn: async ({ pageParam }) => {
      const res = await getUsersAction({
        take: filter.take,
        skip: pageParam,
        search: filter.search,
      })
      if (!res.ok) {
        throw new Error(res.message)
      }
      const users = res.data!
      if (
        filter?.search !== "" &&
        filter &&
        users.length > 0 &&
        filter.search
      ) {
        return users.filter(
          (user) =>
            user.fullName
              .toLowerCase()
              .includes(filter.search!.toLowerCase()) ||
            user.email.toLowerCase().includes(filter.search!.toLowerCase())
        )
      }
      return users
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage) return undefined
      return lastPage.length === 10 ? allPages.length + 1 : undefined
    },
  })
}
