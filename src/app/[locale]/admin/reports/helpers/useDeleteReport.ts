import { useMutation } from "@tanstack/react-query"
import fetchDeleteReport from "../actions/fetch-delete-report"

type FnProps = {
  onSuccess?: () => void
  onError?: (error: Error) => void
}

type Props = {
  reportIds: number[]
}

export function useDeleteReport({ onSuccess, onError }: FnProps) {
  return useMutation({
    mutationFn: async ({ reportIds }: Props) => {
      const res = await fetchDeleteReport(reportIds)
      if (!res.ok) {
        throw new Error(res.message)
      } else {
        return res.ok
      }
    },
    onSettled: (data, error) => {
      if (error) {
        console.error("[POST] fetchDeleteReport ERROR:",error)
      } else {
        onSuccess?.()
      }
    },
    onError,
  })
}
