import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Quiz } from "@/types"
import { useTranslations } from "next-intl"
import Link from "next/link"
import ResultLoading from "../loading/result-loading"

type Props = {
  quizzesData: Quiz[]
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
        <div className="mt-2.5 grid grid-cols-2 gap-5 px-0.5 max-md:max-w-full max-md:flex-wrap lg:grid-cols-4">
          <ResultLoading isLoading={isLoading} fieldData={quizzesData} />
          {quizzesData &&
            quizzesData.map((data) => {
              return (
                <Link href={`quizbank/${data.quizBank?.id}`}>
                  <Card key={data.id} className="">
                    <CardHeader className="">
                      <CardTitle>{data.question}</CardTitle>
                      <div className="mt-1.5 truncate text-sm leading-5 text-zinc-500">
                        {data.answer}
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              )
            })}
        </div>
      </div>
    </section>
  )
}
