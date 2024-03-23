import ChartTeacher from "./chart-teacher"
import { StudentResultsTable } from "./teacher-table/data-table"

type Props = {
  params: {
    gameID: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function ResultGameTeacher({ params, searchParams }: Props) {
  return (
    <>
      {/* <StudentResultsTable data={data!} params={params} /> */}
      <ChartTeacher />
    </>
  )
}
