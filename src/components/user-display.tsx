import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getShortName } from "@/lib/string-helper"
import { cn } from "@/lib/utils"
import { User } from "@/types"
import Link from "next/link"
import { useMemo } from "react"

type Props = {
  user: User
  withLink?: boolean
  options?: [
    {
      label: string
      href?: string // if href is not provided, it will be a button
      onClick: () => void // if href is provided, onClick will be ignored
    },
  ]
  avatarSize?: "sm" | "md" | "lg"
} & React.HTMLAttributes<HTMLDivElement>

function UserDisplay({ user, options, withLink, className, ...props }: Props) {
  const renderAcitons = useMemo(() => {
    return <></>
  }, [])
  const renderTitle = useMemo(() => {
    const userItem = (
      <>
        <h3 className="">{user.fullName}</h3>
        <p className="text-xs text-neutral-500">{user.email}</p>
      </>
    )
    return withLink ? (
      <Link href={`/users/${user.id}`}>{userItem}</Link>
    ) : (
      userItem
    )
  }, [user.email, user.fullName, user.id, withLink])
  return (
    <div
      className={cn("flex items-center justify-between gap-2", className)}
      {...props}
    >
      <Avatar>
        <AvatarImage src={user.avatar || " "} alt={user.fullName} />
        <AvatarFallback>{getShortName(user.fullName)}</AvatarFallback>
      </Avatar>
      <div className="w-full">{renderTitle}</div>
      {renderAcitons}
    </div>
  )
}

export default UserDisplay
