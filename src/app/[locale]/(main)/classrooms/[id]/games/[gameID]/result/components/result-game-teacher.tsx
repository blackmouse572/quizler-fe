import { ClassroomGameResults } from "@/types"
import { TabsResultGameTeacher } from "./tabs-result-game-teacher"
import { StudentResultsTable } from "./teacher-table/data-table"
import PagedResponse from "@/types/paged-response"

type Props = {
  params: {
    gameID: string
  }
  data: PagedResponse<ClassroomGameResults>
}

export default function ResultGameTeacher({ params, data }: Props) {
  return (
    <>
      <StudentResultsTable data={data!} params={params} />

      <TabsResultGameTeacher data={data} />
    </>
  )
}
