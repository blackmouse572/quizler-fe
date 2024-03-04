import AddClassroomForm from "@/app/[locale]/(main)/classrooms/add/components/add-classroom-form"
import { EFormAction } from "@/types"
import _ from "lodash"
import { NextIntlClientProvider, useMessages } from "next-intl"

type Props = {}

function CreateNewClassroomPage({}: Props) {
  const message = useMessages()
  return (
    <NextIntlClientProvider
      messages={_.pick(message, "Validations", "AddClassroom", "Errors")}
    >
      <AddClassroomForm action={EFormAction.Add} />
    </NextIntlClientProvider>
  )
}

export default CreateNewClassroomPage
