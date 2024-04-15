import ClassroomCard from "@/app/[locale]/(main)/classrooms/components/classroom-card"
import { Classroom } from "@/types"
import { useTranslations } from "next-intl"
import ResultLoading from "../loading/result-loading"

type Props = {
  classroomsData: Classroom[]
  isLoading: boolean
}

export default function ResultClassrooms({ classroomsData, isLoading }: Props) {
  const tSearch = useTranslations("SearchPage")
  const maxLength = 20

  return (
    <>
      <div className="mt-6 w-full text-base font-semibold leading-6 text-zinc-900 max-md:max-w-full">
        {tSearch("classrooms")}
      </div>

      <div className="mt-1 w-full justify-between max-md:max-w-full">
        <div className="mt-2.5 grid grid-cols-2 gap-5 px-0.5 max-md:max-w-full max-md:flex-wrap lg:grid-cols-4">
          <ResultLoading isLoading={isLoading} fieldData={classroomsData} />
          {classroomsData &&
            classroomsData.map((data) => {
              return <ClassroomCard key={data.id} item={data} />
            })}
        </div>
      </div>
    </>
  )
}
