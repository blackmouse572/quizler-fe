"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
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
import React, { useCallback, useMemo } from "react"
type Props = {}

function UserSelector({}: Props) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [search, setSearch] = React.useState("")

  const { data, isLoading, isError, error } = useUserSelectorQuery({
    filter: { search },
  })

  const findUser = useCallback(
    (id: string) => {
      const flattenData = _.flatten(data?.pages)
      return flattenData.find((user) => user?.id.toString() === id)
    },
    [data?.pages]
  )

  const renderItem = useCallback(
    (user: User) => (
      <CommandItem
        key={user.id}
        value={user.id.toString()}
        onSelect={() => {
          setOpen(false)
          setValue(user.id.toString())
        }}
        className={cn(
          "w-full space-x-2",
          value === user.id.toString() && "bg-emerald-500/20 transition-colors"
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
    ),
    [value]
  )

  const renderResults = useMemo(
    () => data?.pages.map((e) => e?.map((user) => renderItem(user))),
    [data?.pages, renderItem]
  )

  const renderSelected = useMemo(() => {
    const user = findUser(value)
    console.log({ user })
    if (!user) {
      return null
    }
    return (
      <div className="flex gap-2">
        <Avatar>
          <AvatarImage src={user.avatar ?? ""} alt={user.fullName} />
          <AvatarFallback>
            <span className="text-white">{getShortName(user.fullName)}</span>
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 text-start">
          <h5 className="truncate font-semibold">{user.fullName}</h5>
          <p className="truncate text-xs text-neutral-500">{user.email}</p>
        </div>
      </div>
    )
  }, [findUser, value])

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
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-14 w-fit min-w-16 hover:bg-accent focus:bg-accent focus:text-primary"
        >
          {value ? renderSelected : "Select User"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit min-w-[320px] p-0">
        <Command>
          {/* <CommandInput placeholder="Search framework..." /> */}
          <Input
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
          <CommandGroup>
            {isLoading ? renderLoading : renderResults}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default UserSelector
