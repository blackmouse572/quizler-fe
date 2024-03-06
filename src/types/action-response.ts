type ActionResponse<T> = {
  ok: boolean
  message: string
  data?: T
}

export type { ActionResponse }
