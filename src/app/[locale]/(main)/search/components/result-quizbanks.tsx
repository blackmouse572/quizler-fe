import { QuizBanksData } from "@/types/quizBanksData"
import Link from "next/link"
import ResultLoading from "../loading/result-loading"
import { useTranslations } from "next-intl"
import QuizBank from "@/types/QuizBank"

type Props = {
  quizBanksData: QuizBank[]
  isLoading: boolean
}

export default function ResultQuizbanks({ quizBanksData, isLoading }: Props) {
  const tSearch = useTranslations("SearchPage")

  return (
    <section>
      <div className="mt-6 w-full text-base font-semibold leading-6 text-zinc-900 max-md:max-w-full">
        {tSearch("quizbanks")}
      </div>

      <div className="mt-2.5 flex w-full flex-wrap justify-between gap-5 px-0.5 max-md:max-w-full max-md:flex-wrap">
        <ResultLoading isLoading={isLoading} fieldData={quizBanksData} />

        {quizBanksData &&
          quizBanksData.map((data) => {
            return (
              <div
                key={data.id}
                className="flex max-w-[25%] flex-1 flex-1 flex-col justify-center rounded-3xl border border-solid border-zinc-200 bg-white shadow"
              >
                <div className="flex flex-col items-start py-6 pl-6 pr-20 max-md:px-5">
                  <div className="whitespace-nowrap text-base font-semibold leading-6 text-zinc-950">
                    <Link href={`/quizbank/${data.id}`}>{data.bankName}</Link>
                  </div>
                  <div className="mt-1.5 text-sm leading-5 text-zinc-500">
                    {data.quizCount}
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    </section>
  )
}
