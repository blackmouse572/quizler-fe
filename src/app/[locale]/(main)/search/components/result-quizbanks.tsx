import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import QuizBank from "@/types/QuizBank"
import { useTranslations } from "next-intl"
import Link from "next/link"
import ResultLoading from "../loading/result-loading"

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

      <div className="mt-2.5 grid grid-cols-2 gap-5 px-0.5 max-md:max-w-full max-md:flex-wrap lg:grid-cols-4">
        <ResultLoading isLoading={isLoading} fieldData={quizBanksData} />

        {quizBanksData &&
          quizBanksData.map((data) => {
            return (
              <Link href={`/quizbank/${data.id}`}>
                <Card key={data.id} className="">
                  <CardHeader className="flex flex-col items-start py-6 pl-6 pr-20 max-md:px-5">
                    <CardTitle className="line-clamp-1">
                      {data.bankName}
                    </CardTitle>
                    <div className="mt-1.5 text-sm leading-5 text-zinc-500">
                      {data.quizCount}
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            )
          })}
      </div>
    </section>
  )
}
