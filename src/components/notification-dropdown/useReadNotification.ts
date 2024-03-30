import { readNotificationAction } from "@/components/notification-dropdown/actions/read-notification-action"
import { useMutation } from "@tanstack/react-query"

export const useReadNotification = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await readNotificationAction(id)

      if (!res.ok) {
        throw new Error(res.message)
      }

      return res.data
    },
  })
}
