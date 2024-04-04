"use client"

import { Icons } from "@/components/ui/icons"
import { cn } from "@/lib/utils"
import { AdminNotification } from "@/types"
import PagedResponse from "@/types/paged-response"
import { useInView } from "framer-motion"
import { useFormatter, useTranslations } from "next-intl"
import { ReactNode, useCallback, useRef } from "react"

type Props = {
  notificationData: PagedResponse<AdminNotification>
}

export default function AdminActivityLogs({ notificationData }: Props) {
  const i18nNoti = useTranslations("Notification")
  const format = useFormatter()

  const renderNotificationIcon = useCallback((type: string) => {
    switch (type) {
      case "Information":
        return <Icons.Info />
      case "Alert":
        return <Icons.Alert />
      case "Warning":
        return <Icons.Warning />
      default:
        return <Icons.Info />
    }
  }, [])

  const renderNotification = useCallback(
    (item: AdminNotification) => {
      const icon = renderNotificationIcon(item.type)
      return <NotificationItem item={item} icon={icon} key={item.id} />
    },
    [renderNotificationIcon]
  )

  return (
    <div className="ml-5 flex w-6/12 flex-col max-md:ml-0 max-md:w-full">
      <div className="flex w-full grow flex-col rounded-lg border border-solid border-neutral-200 bg-white px-8 py-5 max-md:mt-5 max-md:max-w-full max-md:px-5">
        <div className="flex w-full justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
          <div className="my-auto text-base font-semibold leading-6 text-black">
            Activities Logs
          </div>
        </div>

        {notificationData.data.map((result) => (
          <div
            key={result.id}
            className="mt-2.5 flex gap-2.5 pr-7 text-black max-md:flex-wrap max-md:pr-5"
          >
            {renderNotification(result)}

            {/* <img
              loading="lazy"
              srcSet="..."
              className="aspect-square w-10 shrink-0 self-start"
            />
            <div className="flex flex-col">
              <div className="text-base leading-6">
                {i18nNoti.rich(`admin.${result.title}` as any, {
                  objectName: result.objectName,
                  user: result.account.fullName,
                })}
              </div>
              <div className="text-xs leading-4">
                {format.dateTime(new Date(result.created), {
                  dateStyle: "long",
                  timeStyle: "short",
                })}
              </div>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  )
}

function NotificationItem({
  item,
  icon,
}: {
  item: AdminNotification
  icon: ReactNode
}) {
  const i18nNoti = useTranslations("Notification")
  const format = useFormatter()
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={ref}
      className={cn(
        "flex gap-2 rounded-md px-3 py-2 transition-all hover:bg-accent"
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
