import { useMutation } from "@tanstack/react-query"
import deleteQuizBankAction from "../actions/delete-quizbank-action"

type Props = {
  onSuccess?: () => void
  onError?: (error: Error) => void
}

type Cyka = {
    quizBankId: string
}

export function useDeleteQuizBank({ onSuccess, onError }: Props) {
  return useMutation({
    mutationFn: async ({ quizBankId }: Cyka) => {
      const res = await deleteQuizBankAction({
        id: quizBankId
      })
      if (!res.ok) {
        throw new Error(res.message)
      } else {
        return res.data
      }
    },
    onSettled: (data, error) => {
      if (error) {
        console.error(error)
      }
      onSuccess?.()
    },
    onError,
  })
}
