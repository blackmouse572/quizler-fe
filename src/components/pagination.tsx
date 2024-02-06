"use client"
import { cn } from "@/lib/utils"
import { useMemo } from "react"
import {
  Pagination as Page,
  PaginationContent,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination"

type PaginationProps = {
  totalPages: number
  perPage: number
  currentPage: number
  hasNext: boolean
} & React.ComponentProps<"div">
function Pagination({
  currentPage,
  perPage,
  totalPages: total,
  hasNext,
  className,
}: PaginationProps) {
  const renderItem = useMemo(() => {
    console.log({ currentPage, perPage, total })
    if (currentPage <= 3) {
      return [...Array(total)].map((_, i) => (
        <PaginationLink
          key={i}
          isActive={i + 1 === currentPage}
          href={{
            search: `take=${perPage}&skip=${i * perPage}&`,
          }}
        >
          {i + 1}
        </PaginationLink>
      ))
    }

    if (currentPage >= total - 2) {
      return [...Array(5)].map((_, i) => (
        <PaginationLink
          key={i}
          isActive={i + 1 === currentPage}
          href={{
            search: `take=${perPage}&skip=${i * perPage}&`,
          }}
        >
          {total - 4 + i}
        </PaginationLink>
      ))
    }

    return [...Array(5)].map((_, i) => (
      <PaginationLink
        key={i}
        isActive={i + 1 === currentPage}
        href={{
          search: `take=${perPage}&skip=${i * perPage}&`,
        }}
      >
        {currentPage - 2 + i}
      </PaginationLink>
    ))
  }, [currentPage, perPage, total])

  const renderNext = useMemo(() => {
    if (!hasNext) return null
    const index = currentPage
    return (
      <PaginationNext
        href={{
          search: `take=${perPage}&skip=${index * perPage}&`,
        }}
      />
    )
  }, [currentPage, hasNext, perPage])

  const renderPrevious = useMemo(() => {
    if (currentPage <= 1) return null
    const index = currentPage - 2
    return (
      <PaginationPrevious
        href={{
          search: `take=${perPage}&skip=${index * perPage}&`,
        }}
      />
    )
  }, [currentPage, perPage])

  return (
    <Page className={cn(className, "")}>
      <PaginationContent className="gap-4">
        {renderPrevious}
        {renderItem}
        {renderNext}
      </PaginationContent>
    </Page>
  )
}

export default Pagination
