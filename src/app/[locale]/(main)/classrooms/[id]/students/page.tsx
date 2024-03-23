import getClassroomDetails from "@/app/[locale]/(main)/classrooms/actions/get-classroom-details-action"
import { polyfill } from "interweave-ssr"
import _ from "lodash"
import { Metadata } from "next"
import StudentTable from "./components/student-table"
import { getAllMembers } from "./actions/fetch-classroom-members"

type Props = {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params

  const { data } = await getClassroomDetails(id)
  return {
    title: data?.classname,
    description: data?.description,
  }
}
polyfill()

async function ClassroomStudentPage({ params }: Props) {
  const { id } = params
  const students = await getAllMembers(id)

  return (
      <div className="mt-6 space-y-12">
        <StudentTable data={students} />
      </div>
  )
}

export default ClassroomStudentPage
