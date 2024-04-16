import { useMutation } from "@tanstack/react-query"
import fetchVerifyReport from "../actions/fetch-verify-report"

type FnProps = {
  onSuccess?: () => void
  onError?: (error: Error) => void
}

type Props = {
  reportId: string
}

export function useVerifyReport({ onSuccess, onError }: FnProps) {
  return useMutation({
    mutationFn: async ({ reportId }: Props) => {
      debugger
      const res = await fetchVerifyReport(reportId)
      if (!res.ok) {
        throw new Error(res.message)
      } else {
        return res.ok
      }
    },
    onSettled: (data, error) => {
      if (error) {
        console.error("[POST] fetchVerifyReport ERROR:",error)
      } else {
        onSuccess?.()
      }
    },
    onError,
  })
}
