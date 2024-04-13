import { useGameList } from "@/app/[locale]/(main)/classrooms/[id]/games/components/useGameList"
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Icons } from "@/components/ui/icons"
import { Skeleton } from "@/components/ui/skeleton"
import { Game } from "@/types"
import { CommandLoading } from "cmdk"
import { useEffect, useMemo, useState } from "react"
import { useDebounce } from "use-debounce"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelected: (quiz: Game) => void
  selected?: Game
  classId: string
  terms: {
    placeholder: string
    noResults: string
  }
}

function AttachGame({ onSelected, classId, selected, terms, ...props }: Props) {
  const [query, setQuery] = useState("")
  const [debouncedQuery] = useDebounce(query, 300)
  const { isLoading, data, error, isError } = useGameList({
    classroomId: classId,
    filter: {
      take: 4,
      search: debouncedQuery,
    },
    options: {
      enabled: props.open,
    },
  })
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "l" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        props.onOpenChange(true)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [props])

  const renderBody = useMemo(() => {
    if (isLoading) {
      return (
        <CommandLoading className="">
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CommandLoading>
      )
    }
    if (isError) {
      return <CommandEmpty>{error?.message}</CommandEmpty>
    }
    if (!data || data.pages.length === 0 || data.pages[0]?.data.length === 0) {
      return (
        <CommandEmpty>
          <Icons.Empty className="h-20 w-20 text-accent" />
          <p>{terms.noResults}</p>
        </CommandEmpty>
      )
    }
    return (
      <CommandList>
        {data.pages[0]?.data.map((quiz) => (
          <CommandItem
            key={quiz.id}
            onClick={() => onSelected(quiz)}
            onSelect={() => onSelected(quiz)}
            className="cursor-pointer focus:bg-accent"
            value={quiz.gameName}
          >
            <p className="w-full">
              {quiz.gameName} ({quiz.status})
            </p>
            {selected?.id === quiz.id && (
              <Icons.Checked className="mr-2 h-4 w-4 text-emerald-500" />
            )}
          </CommandItem>
        ))}
      </CommandList>
    )
  }, [
    data,
    error?.message,
    isError,
    isLoading,
    onSelected,
    selected?.id,
    terms.noResults,
  ])

  return (
    <CommandDialog {...props}>
      <CommandInput
        placeholder={terms.placeholder}
        value={query}
        onValueChange={(e) => setQuery(e)}
      />
      {renderBody}
    </CommandDialog>
  )
}

export default AttachGame
