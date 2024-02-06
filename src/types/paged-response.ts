type PagedResponse<T> = {
  data: T[]
  metadata: Metadata
}
type Metadata = {
  totals: number
  skip: number
  take: number
  hasMore: boolean
}
export type { Metadata }

export default PagedResponse
