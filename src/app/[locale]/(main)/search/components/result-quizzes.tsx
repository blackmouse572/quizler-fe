import { QuizzesData } from "@/types/quizzesData"
import Link from "next/link"
import ResultLoading from "../loading/result-loading"
import { useTranslations } from "next-intl"

type Props = {
  quizzesData: QuizzesData
  isLoading: boolean
}

export default function ResultQuizzes({ quizzesData, isLoading }: Props) {
  const tSearch = useTranslations("SearchPage")

  return (
    <section>
      <div className="mt-6 w-full text-base font-semibold leading-6 text-zinc-900 max-md:max-w-full">
        {tSearch("quizzes")}
      </div>

      <div className="mt-1 w-full justify-between px-0.5 max-md:max-w-full">
        <div className="flex flex-wrap justify-between gap-5 max-md:flex-col max-md:gap-0">
          <ResultLoading isLoading={isLoading} fieldData={quizzesData} />

          {quizzesData &&
            quizzesData.map((data) => {
              return (
                <div key={data.id} className="flex w-3/12 flex-col max-md:ml-0 max-md:w-full">
                  <div className="flex w-full grow flex-col justify-center rounded-3xl border border-solid border-zinc-200 bg-white shadow max-md:mt-6">
                    <div className="flex flex-col p-6 max-md:px-5">
                      <div className="truncate text-base font-semibold leading-6 text-zinc-950">
                        <Link href={`quizbank/${data.quizBank.id}`}>
                          {data.question}
                        </Link>
                      </div>
                      <div className="mt-1.5 truncate text-sm leading-5 text-zinc-500">
                        {data.answer}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </section>
  )
}