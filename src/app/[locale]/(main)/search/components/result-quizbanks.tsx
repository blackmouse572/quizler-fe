import { QuizBanksData } from "@/types/quizBanksData"
import Link from "next/link"
import ResultLoading from "../loading/result-loading"

type Props = {
  quizBanksData: QuizBanksData
  isLoading: boolean
}

export default function ResultQuizbanks({ quizBanksData, isLoading }: Props) {
  return (
    <>
      <div className="mt-6 w-full text-base font-semibold leading-6 text-zinc-900 max-md:max-w-full">
        Quizbanks
      </div>

      <div className="mt-2.5 flex w-full justify-between gap-5 px-0.5 max-md:max-w-full max-md:flex-wrap">
        <ResultLoading isLoading={isLoading} fieldData={quizBanksData} />

        {quizBanksData &&
          quizBanksData.slice(0, 12).map((data) => {
            return (
              <div key={data.id} className="flex max-w-[25%] flex-1 flex-1 flex-col justify-center rounded-3xl border border-solid border-zinc-200 bg-white shadow">
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
    </>
  )
}
