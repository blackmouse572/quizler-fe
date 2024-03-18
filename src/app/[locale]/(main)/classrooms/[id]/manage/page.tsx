import _ from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { DataTable } from "./components/data-table"
import { columns } from "./components/columns"
import { getData } from "./components/data"

export default async function ManageClassroomPage() {
  const msg = await getMessages()
  //   const classrooms = await getAllClassroom()
  const data = await getData()

  return (
    <NextIntlClientProvider
      messages={_.pick(msg, "Validations", "Join_classroom", "Errors")}
    >
      <div className="container">
        <div className="relative mt-5 flex w-[658px] max-w-full justify-between gap-5 self-center pr-2.5 max-md:flex-wrap">
          <div className="flex flex-col">
            <div className="text-2xl font-bold leading-9 text-black">
              VND: Viettnam Dong
            </div>
            <div className="text-lg font-medium leading-8 text-neutral-400">
              123 students
            </div>
          </div>
        </div>
        <div className="border-t-2 border-zinc-400"></div>
        <DataTable columns={columns} data={data} />
      </div>
    </NextIntlClientProvider>
  )
}
