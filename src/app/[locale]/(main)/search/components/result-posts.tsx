import { PostsData } from "@/types/postsData"
import Link from "next/link"
import ResultLoading from "../loading/result-loading"
import { useTranslations } from "next-intl"

type Props = {
  postsData: PostsData
  isLoading: boolean
}

export default function ResultPosts({ postsData, isLoading }: Props) {
  const tSearch = useTranslations("SearchPage")
  const maxLength = 10

  return (
    <>
      <div className="mt-6 w-full text-base font-semibold leading-6 text-zinc-900 max-md:max-w-full">
        {tSearch("posts")}
      </div>

      <div className="container mt-1 w-full justify-between px-0.5 max-md:max-w-full">
        <div className="flex flex-wrap justify-between gap-5 max-md:flex-col max-md:gap-0">
          <ResultLoading isLoading={isLoading} fieldData={postsData} />

          {postsData &&
            postsData.map((data) => {
              return (
                <div
                  key={data.id}
                  className="flex w-3/12 flex-col max-md:ml-0 max-md:w-full"
                >
                  <div className="flex w-full grow flex-col justify-center rounded-3xl border border-solid border-zinc-200 bg-white shadow max-md:mt-6">
                    <div className="flex flex-col p-6 max-md:px-5">
                      <div className="text-base font-semibold leading-6 text-zinc-950">
                        <Link
                          className="text-wrap"
                          href={`/classrooms`}
                        >
                          {data.title.slice(0, maxLength) +
                            (data.title.length > maxLength ? "..." : "")}
                        </Link>
                      </div>
                      <div className="mt-1.5 truncate text-sm leading-5 text-zinc-500">
                        {data.content}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </>
  )
}
