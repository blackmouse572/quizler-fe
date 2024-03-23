import getClassroomDetails from "@/app/[locale]/(main)/classrooms/actions/get-classroom-details-action"
import { polyfill } from "interweave-ssr"
import _ from "lodash"
import { Metadata } from "next"
import StudentTable from "./components/student-table"
import { notFound } from "next/navigation"
import getAllMembers from "./actions/fetch-classroom-members"

type Props = {
  params: {
    id: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
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

async function ClassroomStudentPage({ params, searchParams }: Props) {
  const { id } = params

  const take = searchParams.take ? parseInt(searchParams.take as string) : 20
  const skip = searchParams.skip ? parseInt(searchParams.skip as string) : 0
  const search = searchParams.search
    ? encodeURIComponent(searchParams.search as string)
    : undefined
  const options = { take, skip, search }
  const {ok: ok, data: data} = await getAllMembers(id, options)

  if (!ok || !data) {
    return notFound()
  }

  return (
      <div className="mt-6 space-y-12">
        <StudentTable data={data} />
      </div>
  )
}

export default ClassroomStudentPage
