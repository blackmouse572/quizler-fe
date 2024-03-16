"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"
import { Icons } from "@/components/ui/icons"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Skeleton } from "@/components/ui/skeleton"
import useUserSelectorQuery from "@/components/user-selector/useUserSelectorQuery"
import { getShortName } from "@/lib/string-helper"
import { cn } from "@/lib/utils"
import { User } from "@/types"
import _ from "lodash"
import React, { useCallback, useEffect, useMemo } from "react"
type Props = {
  renderItem?: (user: User) => React.ReactNode
  renderTrigger?: (user: User[]) => React.ReactNode
  mode?: "single" | "multiple"
  placeholder?: string
  onUserChange?: (users: User[]) => void
} & React.HTMLAttributes<HTMLDivElement>

function UserSelector({
  renderItem,
  renderTrigger,
  className,
  mode = "single",
  placeholder,
  onUserChange,
  ...props
}: Props) {
  const [open, setOpen] = React.useState(false)
  const [cachedData, setCachedData] = React.useState<User[]>([])
  const [values, setValues] = React.useState(new Set<string>())
  const [search, setSearch] = React.useState("")

  const { data, isLoading, isError, error } = useUserSelectorQuery({
    filter: { search },
  })

  useEffect(() => {
    if (data) {
      setCachedData(_.flatten(data.pages))
    }
  }, [data])

  useEffect(() => {
    if (!onUserChange) return
    const users: User[] =
      Array.from(values).map(
        (id) => cachedData.find((user) => user?.id.toString() === id)!
      ) || []
    onUserChange?.(users)
  }, [cachedData, onUserChange, values])

  const findUser = useCallback(
    (id: string) => {
      return cachedData.find((user) => user?.id.toString() === id)
    },
    [cachedData]
  )

  const setUser = useCallback(
    (id: string) => {
      if (mode === "single") {
        setValues(new Set([id]))
      } else {
        if (values.has(id)) {
          values.delete(id)
        } else {
          values.add(id)
        }
        setValues(new Set(values))
      }
    },
    [mode, values]
  )

  const renderUserItem = useCallback(
    (user: User) => {
      if (renderItem) {
        return renderItem(user)
      }
      return (
        <CommandItem
          key={user.id}
          value={user.id.toString()}
          onSelect={() => {
            setOpen(false)
            setUser(user.id.toString())
          }}
          className={cn(
            "w-full space-x-2",
            values.has(user.id.toString()) &&
              "bg-emerald-500/20 transition-colors"
          )}
        >
          <Avatar>
            <AvatarImage src={user.avatar ?? ""} alt={user.fullName} />
            <AvatarFallback>
              <span className="text-white">{getShortName(user.fullName)}</span>
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h5 className="truncate font-semibold">{user.fullName}</h5>
            <p className="truncate text-xs text-neutral-500">{user.email}</p>
          </div>
        </CommandItem>
      )
    },
    [renderItem, setUser, values]
  )

  const renderResults = useMemo(
    () => data?.pages.map((e) => e?.map((user) => renderUserItem(user))),
    [data?.pages, renderUserItem]
  )

  const renderSelected = useMemo<React.ReactNode>(() => {
    const users = Array.from(values).map((id) => findUser(id))
    if (!users || users.length === 0) {
      return <span className="text-neutral-500">{placeholder ?? "..."}</span>
    }

    if (mode === "single") {
      const user = users[0]
      return (
        <div className="flex w-fit gap-2">
          <Avatar>
            <AvatarImage src={user?.avatar ?? ""} alt={user?.fullName} />
            <AvatarFallback>
              <span className="text-white">
                {getShortName(user?.fullName || "N A")}
              </span>
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 text-start">
            <h5 className="truncate font-semibold">{user?.fullName}</h5>
            <p className="truncate text-xs text-neutral-500">{user?.email}</p>
          </div>
        </div>
      )
    } else {
      return (
        <div className="flex flex-wrap gap-2 px-3.5 py-2">
          <span className="absolute bottom-0 right-2 text-xs text-neutral-300">
            {users.length}
          </span>
          {users.map((user) => {
            return (
              <div
                className="flex w-fit gap-2 rounded-md bg-neutral-100 px-2 py-1.5"
                key={user?.id}
              >
                <Avatar className="h-8 w-8 text-xs">
                  <AvatarImage
                    sizes="12"
                    src={user?.avatar ?? ""}
                    alt={user?.fullName}
                  />
                  <AvatarFallback>
                    <span className="text-white">
                      {getShortName(user?.fullName || "N A")}
                    </span>
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-start">
                  <div className="truncate text-sm font-semibold">
                    {user?.fullName}
                  </div>
                  <div className="truncate text-xs text-neutral-500">
                    {user?.email}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )
    }
  }, [findUser, mode, placeholder, values])

  const renderLoading = useMemo(
    () =>
      Array.from({ length: 5 }).map((_, i) => (
        <CommandItem className="flex gap-2" disabled>
          <Skeleton className="aspect-square rounded-full" />
          <div className="flex-1 space-y-1">
            <Skeleton className="h-5 w-full rounded-sm" />
            <Skeleton className="h-3 w-full rounded-sm" />
          </div>
        </CommandItem>
      )),
    []
  )

  return (
    <Popover
      open={open}
      onOpenChange={(e) => {
        setOpen(e)
        if (!e) {
          setSearch("")
        }
      }}
    >
      <PopoverTrigger asChild>
        {renderTrigger ? (
          renderTrigger(cachedData)
        ) : (
          <div
            // role="combobox"
            aria-expanded={open}
            className={cn(
              "relative flex h-14 w-fit min-w-16 cursor-pointer items-center justify-start rounded-md border border-border px-3.5 text-sm transition-colors hover:bg-accent focus:bg-accent focus:text-primary",
              className
            )}
          >
            {renderSelected}
          </div>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-fit min-w-[320px] p-0">
        <Command className="">
          <Input
            onFocus={() => setOpen(true)}
            className="w-full rounded-none px-2 outline-transparent ring-transparent ring-offset-transparent"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <CommandEmpty>
            <Icons.Empty className="mx-auto h-12 w-12 text-neutral-400" />
            <p className="mt-2 text-muted-foreground">
              {isError
                ? error?.message
                : isLoading
                  ? "Loading..."
                  : "No results found"}
            </p>
          </CommandEmpty>
          <CommandGroup className="max-h-[15rem] overflow-auto">
            {isLoading ? renderLoading : renderResults}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default UserSelector
