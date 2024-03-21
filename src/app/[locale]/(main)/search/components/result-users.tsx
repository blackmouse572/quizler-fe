import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getShortName } from "@/lib/string-helper"
import { User } from "@/types"
import { useTranslations } from "next-intl"
import ResultLoading from "../loading/result-loading"
import Link from "next/link"

type Props = {
  usersData: User[]
  isLoading: boolean
}

export default function ResultUsers({ usersData, isLoading }: Props) {
  const tSearch = useTranslations("SearchPage")

  return (
    <section>
      <div className="mt-6 w-full text-base font-semibold leading-6 text-zinc-900 max-md:max-w-full">
        {tSearch("users")}
      </div>

      <div className="mt-1 flex w-full flex-wrap justify-between gap-3 whitespace-nowrap  leading-8 text-black max-md:max-w-full max-md:flex-wrap">
        <ResultLoading isLoading={isLoading} fieldData={usersData} />

        {usersData &&
          usersData.map((data) => {
            return (
              <Link
                key={data.id}
                href={`/profile/${data?.id}`}
                className="flex max-w-[25%] flex-1 flex-col items-start justify-center rounded-3xl border border-solid border-zinc-200 bg-white py-6 pl-6 pr-16 shadow max-md:px-5"
              >
                <div className="flex gap-2.5">
                  <Avatar>
                    <AvatarFallback>
                      {getShortName(data.fullName)}
                    </AvatarFallback>
                    <AvatarImage src={data.avatar || ""} alt={data.fullName} />
                  </Avatar>
                  <div className="my-auto grow text-lg font-bold">
                    {data.fullName}
                  </div>
                </div>
              </Link>
            )
          })}
      </div>
    </section>
  )
}
