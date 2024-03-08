import { StarFilledIcon } from "@radix-ui/react-icons"
import { useTranslations } from "next-intl"
import Link from "next/link"

type Props = {
  relativeQuizBankData: any
}

export default function ViewRelativeQuizBank({ relativeQuizBankData }: Props) {
  const i18n = useTranslations("ViewQuizBank")

  return (
    <>
      <div className="mt-16 w-[849px] border-b-2 border-gray-300 text-xl font-bold leading-8 text-black max-md:mt-10 max-md:max-w-full" />
      <div className="mt-16 items-stretch text-xl font-bold leading-8 text-black max-md:mt-10 max-md:max-w-full">
        {i18n("ViewQuizzes.relative_quiz_bank")}
      </div>

      {/* Render relative quizbank */}
      <div className="mt-7 flex w-[849px] max-w-full justify-between gap-5 overflow-x-auto px-5 max-md:flex-wrap">
        {Object.keys(relativeQuizBankData).map((quizKey) => {
          const quiz = relativeQuizBankData[quizKey]

          return (
            <div
              key={quizKey}
              className="flex flex-1 flex-col justify-center rounded-3xl border border-solid border-[color:var(--color-border,#E4E4E7)] bg-white shadow"
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
    </>
  )
}
