import { PostsData } from "@/types/postsData"
import Link from "next/link"
import ResultLoading from "../loading/result-loading"

type Props = {
  postsData: PostsData
  isLoading: boolean
}

export default function ResultPosts({ postsData, isLoading }: Props) {
  return (
    <>
      <div className="mt-6 w-full text-base font-semibold leading-6 text-zinc-900 max-md:max-w-full">
        Posts
      </div>

      <div className="mt-1 w-full justify-between px-0.5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <ResultLoading isLoading={isLoading} fieldData={postsData} />

          {postsData &&
            postsData.slice(0, 12).map((data) => {
              return (
                <div key={data.id} className="flex w-3/12 flex-col max-md:ml-0 max-md:w-full">
                  <div className="flex w-full grow flex-col justify-center rounded-3xl border border-solid border-zinc-200 bg-white shadow max-md:mt-6">
                    <div className="flex flex-col p-6 max-md:px-5">
                      <div className="truncate text-base font-semibold leading-6 text-zinc-950">
                        <Link href={`quizbank/${data.bankLink}`}>
                          {data.title}
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
