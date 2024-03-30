import { rateQuizbankAction } from "@/app/[locale]/(main)/quizbank/[id]/actions/rate-quizbank"
import { useMutation } from "@tanstack/react-query"

export const useRateQuizbank = (quizbankId: string) => {
  return useMutation({
    mutationFn: async (rating: number) => {
      const res = await rateQuizbankAction(quizbankId, rating)
      if (!res.ok) {
        throw new Error(res.message)
      }
      return res.data
    },
  })
}
