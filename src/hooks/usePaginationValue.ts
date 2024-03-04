import { Metadata } from "@/types/paged-response"

function usePaginationValue(value: Metadata) {
  const { totals, skip, take, hasMore } = value
  // console.log({ metadata: value })

  const totalPages = Math.ceil(totals / take)
  const currentPage = Math.floor(skip / take) + 1
  const nextPage = currentPage + 1
  const prevPage = currentPage - 1

  return {
    totals,
    skip,
    take,
    hasMore,
    totalPages,
    currentPage,
    nextPage,
    prevPage,
  }
}

export default usePaginationValue
