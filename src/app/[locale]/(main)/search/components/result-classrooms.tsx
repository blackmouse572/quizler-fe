import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getShortName } from "@/lib/string-helper"
import { ClassroomsData } from "@/types/classroomsData"
import Link from "next/link"
import ResultLoading from "../loading/result-loading"

type Props = {
  classroomsData: ClassroomsData
  isLoading: boolean
}

export default function ResultClassrooms({ classroomsData, isLoading }: Props) {
  return (
    <>
      <div className="mt-6 w-full text-base font-semibold leading-6 text-zinc-900 max-md:max-w-full">
        Classrooms
      </div>

      <div className="mt-1 w-full justify-between max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <ResultLoading isLoading={isLoading} fieldData={classroomsData} />

          {classroomsData &&
            classroomsData.slice(0, 6).map((data) => {
              return (
                <div key={data.id} className="flex w-3/12 flex-col max-md:ml-0 max-md:w-full">
                  <div className="mx-auto flex w-full grow flex-col rounded-3xl border border-solid border-zinc-200 bg-white pb-6 shadow max-md:mt-3">
                    <div className="flex flex-col items-start py-6 pl-6 pr-20 max-md:px-5">
                      <div className="whitespace-nowrap text-base font-semibold leading-6 text-zinc-950">
                        <Link href={`classrooms/${data.id}`}>
                          {data.classname}
                        </Link>
                      </div>
                      <div className="mt-1.5 text-sm leading-5 text-zinc-500">
                        {data.studentNumber} students
                      </div>
                    </div>
                    <div className="ml-6 flex gap-2.5 self-start whitespace-nowrap leading-8 text-black max-md:ml-2.5">
                      <Avatar>
                        <AvatarFallback>
                          {getShortName(data.author.fullName)}
                        </AvatarFallback>
                        <AvatarImage
                          src={data.author.avatar || ""}
                          alt={data.author.fullName}
                        />
                      </Avatar>
                      <div className="my-auto grow text-lg font-bold">
                        {data.author.fullName}
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
