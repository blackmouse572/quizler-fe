import { Icons } from "@/components/ui/icons"
import { cn } from "@/lib/utils"
import { AdminNotification } from "@/types"
import PagedResponse from "@/types/paged-response"
import { getFormatter, getTranslations } from "next-intl/server"
import React from "react"

type Props = {
  notificationData: PagedResponse<AdminNotification>
}

export default async function AdminActivityLogs({ notificationData }: Props) {
  const i18n = await getTranslations("DashboardAdmin")

  const renderNotificationIcon = (type: string) => {
    switch (type) {
      case "Information":
        return <Icons.Info className="text-info-500" />
      case "Alert":
        return <Icons.Alert className="text-warning-500" />
      case "Warning":
        return <Icons.Warning className="text-warning-500" />
      case "Error":
        return <Icons.Error className="text-danger-500" />
      case "Payment":
        return <Icons.Payment className="text-emerald-500" />
      case "Classroom":
        return <Icons.School className="text-fuchsia-500" />
      default:
        return <Icons.Help className="text-indigo-500" />
    }
  }

  const renderNotification = (item: AdminNotification) => {
    const icon = renderNotificationIcon(item.type)
    return <NotificationItem item={item} icon={icon} key={item.id} />
  }

  return (
    <div className="space-y-4 rounded-lg border border-solid border-neutral-200 bg-white px-8 py-5">
      <div className="my-auto text-base font-semibold leading-6 text-black">
        {i18n("activity_logs.title")}
      </div>
      <div className="max-h-[65vh] flex-1 space-y-2 overflow-y-auto">
        {notificationData.data.map((result) => (
          <div key={result.id} className="">
            {renderNotification(result)}
          </div>
        ))}
      </div>
    </div>
  )
}

async function NotificationItem({
  item,
  icon,
}: {
  item: AdminNotification
  icon: React.ReactNode
}) {
  const i18nNoti = await getTranslations("Notification")
  const format = await getFormatter()

  return (
    <div
      className={cn(
        "flex w-full cursor-default gap-2 rounded-md px-3 py-2 transition-all hover:bg-accent"
      )}
      key={item.id}
    >
      {icon}

      <div className="flex flex-col">
        <div className="text-base leading-6">
          {i18nNoti.rich(`admin.${item.title}` as any, {
            objectName: item.objectName,
            user: item.account.fullName,
          })}
        </div>
        <div className="text-xs leading-4">
          {format.dateTime(new Date(item.created), {
            dateStyle: "long",
            timeStyle: "short",
          })}
        </div>
      </div>
    </div>
  )
}
