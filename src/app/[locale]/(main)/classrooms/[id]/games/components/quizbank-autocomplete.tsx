import { useQuizbankList } from "@/app/[locale]/(main)/classrooms/[id]/components/useQuizbankList"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import { FormControl } from "@/components/ui/form"
import { Icons } from "@/components/ui/icons"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import QuizBank from "@/types/QuizBank"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useDebounce } from "use-debounce"

type MyQuizbankAutocompleteProps = {
  classroomId?: string //for cache
  onSelect: (value: QuizBank) => void
  initialData?: string
  terms: {
    inputPlaceholder: string
    empty: string
  }
  disabled?: boolean
}
function MyQuizbankAutocomplete({
  classroomId,
  onSelect,
  terms,
  initialData,
  disabled,
}: MyQuizbankAutocompleteProps) {
  const [selectedValue, setSelectedValue] = useState<QuizBank | undefined>()
  const [query, setQuery] = useState("")
  const [debouncedQuery] = useDebounce(query, 300)
  const { isLoading, isError, data, error } = useQuizbankList({
    classroomId: classroomId ?? "",
    filter: {
      search: debouncedQuery,
    },
  })
  useEffect(() => {
    if (data?.pages) {
      const selectedValue = data?.pages
        .map((e) => e.data.map((m) => m))
        .flat()
        .find((e) => e.id.toString() === initialData)
      setSelectedValue(selectedValue)
    }
  }, [data?.pages, data?.pages.length, initialData])
  const renderLoadingItem = useMemo(() => {
    return <Skeleton className="h-18 w-full" />
  }, [])
  const handleSelect = useCallback(
    (item: QuizBank) => {
      setSelectedValue(item)
      onSelect(item)
    },
    [onSelect]
  )
  const renderItem = useCallback(
    (item: QuizBank) => {
      return (
        <CommandItem
          value={item.id.toString()}
          key={item.id}
          onSelect={() => handleSelect(item)}
          className="flex justify-between"
        >
          <p className="truncate">{item.bankName}</p>
          {selectedValue?.id === item.id && (
            <Icons.Checked className="h-5 w-5 min-w-5 text-emerald-500" />
          )}
        </CommandItem>
      )
    },
    [handleSelect, selectedValue?.id]
  )
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            disabled={disabled}
            variant="outline"
            color="accent"
            role="combobox"
            className={cn(
              "h-10 w-full justify-between",
              !selectedValue ? "text-muted-foreground" : ""
            )}
          >
            {!selectedValue ? terms.inputPlaceholder : selectedValue?.bankName}
            <Icons.ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command shouldFilter={false}>
          <CommandInput placeholder="" onValueChange={setQuery} />
          <CommandEmpty>{terms.empty}</CommandEmpty>
          <CommandGroup>
            {isLoading &&
              Array.from({ length: 5 }, (_, i) => (
                <div key={i}>{renderLoadingItem}</div>
              ))}
            {data?.pages.map((e) => e.data.map((m) => renderItem(m)))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default MyQuizbankAutocomplete
