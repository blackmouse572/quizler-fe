import { ClassroomGameResults } from "@/types"
import { ChartStudents } from "./chart/stacked-chart-student"
import PagedResponse from "@/types/paged-response"

type Props = {
  data: PagedResponse<ClassroomGameResults>
  studentGameResult: ClassroomGameResults
  studentRank: number
}

export default function ResultGameStudent({ data, studentGameResult, studentRank }: Props) {
  return (
    <>
      <ChartStudents data={data} studentGameResult={studentGameResult} studentRank={studentRank} />
    </>
  )
}
