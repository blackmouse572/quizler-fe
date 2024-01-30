type PagedResponse<T> = {
  data: T[]
  metadata: {
    total: number
    skip: number
    take: number
    hasMore: boolean
  }
}

export default PagedResponse
