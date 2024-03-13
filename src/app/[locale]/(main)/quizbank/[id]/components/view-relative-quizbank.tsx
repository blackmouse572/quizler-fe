import { useTranslations } from "next-intl"
import Link from "next/link"

type Props = {
  relativeQuizBankData: any
}

export default function ViewRelativeQuizBank({ relativeQuizBankData }: Props) {
  const i18n = useTranslations("ViewQuizBank")

  return (
    <div className="space-y-2">
      <div className="border-b-2 border-gray-300 text-xl font-bold leading-8 text-black max-md:mt-10 max-md:max-w-full" />
      <div className="mt-16 items-stretch text-xl font-bold leading-8 text-black max-md:mt-10 max-md:max-w-full">
        {i18n("ViewQuizzes.relative_quiz_bank")}
      </div>

      <div className="grid grid-cols-2 max-md:flex-wrap md:grid-cols-4">
        {Object.keys(relativeQuizBankData).map((quizKey) => {
          const quiz = relativeQuizBankData[quizKey]
          return (
            <div
              key={quizKey}
              className="flex flex-1 flex-col justify-center rounded-3xl border border-solid border-border bg-white shadow"
            >
              <div className="flex flex-col items-start py-6 pl-6 pr-20 max-md:px-5">
                <div className="whitespace-nowrap text-base font-semibold leading-6 text-zinc-950">
                  <Link href={`/quizbank/${quiz.id}`}>{quiz.bankName}</Link>
                </div>
                <div className="mt-1.5 text-sm leading-5 text-zinc-500">
                  {quiz.quizCount}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
