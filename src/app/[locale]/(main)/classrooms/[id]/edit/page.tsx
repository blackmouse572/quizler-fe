import AddClassroomForm from "@/app/[locale]/(main)/classrooms/components/add-classroom-form"
import { Classroom, EFormAction } from "@/types"
import _ from "lodash"
import { NextIntlClientProvider, useMessages } from "next-intl"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import { use } from "react"
import getClassroomDetails from "../../actions/get-classroom-details-action"

type Props = {
  params: { id: string; locale?: string; classroom?: Classroom }
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({
    locale,
    namespace: "EditClassroom.metadata",
  })

  return {
    title: t("title"),
    description: t("description"),
  }
}

function EditClassroomPage({ params: { id } }: Props) {
  const message = useMessages()
  const data = use(getClassroomDetails(id))
  if (!data.ok) {
    throw Error(data.message)
  }

  if (!data.data) {
    return notFound()
  }

  const classroom = data.data

  const initialvalues = {
    className: classroom?.classname ?? "",
    description: classroom?.description ?? "",
    isStudentAllowInvite: classroom?.isStudentAllowInvite ?? false,
  }

  return (
    <NextIntlClientProvider
      messages={_.pick(message, "Validations", "EditClassroom", "Errors")}
    >
      <AddClassroomForm
        classroomId={classroom?.id}
        action={EFormAction.Edit}
        initialValues={initialvalues}
      />
    </NextIntlClientProvider>
  )
}

export default EditClassroomPage
