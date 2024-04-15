import QuizbankCard from "@/components/quizbank-card"
import QuizBank from "@/types/QuizBank"
import { useTranslations } from "next-intl"

type Props = {
  relativeQuizBankData: QuizBank[]
}

export default function ViewRelativeQuizBank({ relativeQuizBankData }: Props) {
  const i18n = useTranslations("ViewQuizBank")

  return (
    <div className="space-y-2">
      <div className="border-b-2 border-gray-300 text-xl font-bold leading-8 text-black max-md:mt-10 max-md:max-w-full" />
      <div className="mt-16 items-stretch text-xl font-bold leading-8 text-black max-md:mt-10 max-md:max-w-full">
        {i18n("ViewQuizzes.relative_quiz_bank")}
      </div>

      <div className="grid grid-cols-2 gap-4 max-md:flex-wrap lg:grid-cols-4">
        {relativeQuizBankData.map((quizKey) => {
          return <QuizbankCard allowActions={false} item={quizKey} />
        })}
      </div>
    </div>
  )
}
