interface PagedRequest {
  take: number
  skip: number
  sortBy: string
  sortDirection: "Asc" | "Desc"
  search: string
}

export default PagedRequest