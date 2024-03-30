import { getUnreadNotificationAction } from "@/components/notification-dropdown/actions/get-unread-notification-action"
import { useQuery } from "@tanstack/react-query"

export const useUnreadNotification = () => {
  return useQuery({
    queryKey: ["unread-notification"],
    queryFn: async () => {
      const rees = await getUnreadNotificationAction()
      if (rees.ok) {
        return rees.data
      }
      return 0
    },
  })
}
