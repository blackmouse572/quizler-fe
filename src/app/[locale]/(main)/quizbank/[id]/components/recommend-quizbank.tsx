import { useTranslations } from "next-intl"
import QuizBank from "@/types/QuizBank"

type Props = {
  quizBankData: QuizBank
}

export default function RecommendQuizBank({ quizBankData }: Props) {
  const i18n = useTranslations("ViewQuizBank")

  return (
    <>
      {/* recommend */}
      <div className="mt-16 w-[849px] border-b-2 border-gray-300 text-xl font-bold leading-8 text-black max-md:mt-10 max-md:max-w-full" />
      <div className="mt-16 items-stretch text-xl font-bold leading-8 text-black max-md:mt-10 max-md:max-w-full">
        {i18n("ViewQuizzes.recommend_quiz_bank")}
      </div>

      <div className="mt-7 flex w-[849px] max-w-full justify-between gap-5 overflow-x-auto px-5 max-md:flex-wrap">
        {Array(5)
          .fill(null)
          .map((_, index) => (
            <div key={index} className="flex flex-1 flex-col justify-center rounded-3xl border border-solid border-[color:var(--color-border,#E4E4E7)] bg-white shadow">
              <div className="flex flex-col items-start py-6 pl-6 pr-20 max-md:px-5">
                <div className="whitespace-nowrap text-base font-semibold leading-6 text-zinc-950">
                  Lorem isplum
                </div>
                <div className="mt-1.5 text-sm leading-5 text-zinc-500">
                  320 cards
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  )
}
