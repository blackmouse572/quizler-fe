import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { queryClient } from "@/app/[locale]/provider"
import NotificationList from "@/components/notification-dropdown/notification-list"
import { useNotification } from "@/components/notification-dropdown/useNotifications"
import { useReadNotification } from "@/components/notification-dropdown/useReadNotification"
import { Icons } from "@/components/ui/icons"
import { cn } from "@/lib/utils"
import { INotification } from "@/types"
import PagedResponse from "@/types/paged-response"
import { BellIcon } from "@radix-ui/react-icons"
import { useInView } from "framer-motion"
import { useFormatter, useTranslations } from "next-intl"
import React, { ReactNode, useCallback, useEffect, useRef } from "react"
import { Button } from "../ui/button"

type Props = {
  unreadCount: number
  initialData?: PagedResponse<INotification>
}

export default function NotificationDropdown({
  unreadCount,
  initialData,
}: Props) {
  const [isOpen, setIsOpen] = React.useState(false)
  const t = useTranslations("Navbar")
  const { data, isLoading, hasNextPage, fetchNextPage } = useNotification({
    initialData,
    options: {
      enabled: isOpen,
    },
  })

  const renderNotificationIcon = useCallback((type: string) => {
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
  }, [])

  const renderNotification = useCallback(
    (item: INotification) => {
      const icon = renderNotificationIcon(item.type)
      return <NotificationItem item={item} icon={icon} key={item.id} />
    },
    [renderNotificationIcon]
  )

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="light"
          color="accent"
          isIconOnly
          className="relative text-accent-foreground"
        >
          <BellIcon />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-xs text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full min-w-80 max-w-md">
        <DropdownMenuLabel>{t("notification")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <NotificationList
          data={data?.pages.flatMap((page) => page.data) || []}
          isLoading={isLoading}
          isLoadMore={hasNextPage}
          renderDivider={() => <DropdownMenuSeparator />}
          loadMore={fetchNextPage}
          renderNotification={renderNotification}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function NotificationItem({
  item,
  icon,
}: {
  item: INotification
  icon: ReactNode
}) {
  const formatDate = useFormatter().relativeTime
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {})
  const { mutateAsync } = useReadNotification()
  const i18nNoti = useTranslations("Notification")
  const tPlan = useTranslations("Settings.plans")

  useEffect(() => {
    if (inView && !item.read) {
      mutateAsync(item.id).then(() => {
        queryClient.invalidateQueries({ queryKey: ["notification"] })
      })
    }
  }, [inView, item, mutateAsync])
  return (
    <div
      ref={ref}
      className={cn(
        "flex gap-2 rounded-md px-3 py-2 transition-all hover:bg-accent",
        item.read ? "bg-transparent" : "bg-emerald-50"
      )}
      key={item.id}
    >
      {icon}
      <div className="flex flex-1 cursor-default items-start justify-between gap-2">
        <h3 className="text-sm font-medium">
          {item.type.toLowerCase() === "payment" ? (
            <div>
              {i18nNoti.rich(`user.${item.title}` as any, {
                objectName: tPlan(`plans.${item.objectName}.title` as any),
              })}
            </div>
          ) : (
            <div>
              {i18nNoti.rich(`user.${item.title}` as any, {
                objectName: item.objectName,
              })}
            </div>
          )}
        </h3>
        <span className="text-nowrap text-xs text-accent-foreground">
          {formatDate(item.created)}
        </span>
      </div>
    </div>
  )
}
