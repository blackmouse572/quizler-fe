import AddClassroomForm from "@/app/[locale]/(main)/classrooms/components/add-classroom-form"
import { Classroom, EFormAction } from "@/types"
import _ from "lodash"
import { NextIntlClientProvider, useMessages } from "next-intl"
import { getTranslations } from "next-intl/server"

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

function EditClassroomPage({ params: { classroom } }: Props) {
  const message = useMessages()

  return (
    <NextIntlClientProvider
      messages={_.pick(message, "Validations", "EditClassroom", "Errors")}
    >
      <AddClassroomForm action={EFormAction.Edit} classroom={classroom} />
    </NextIntlClientProvider>
  )
}

export default EditClassroomPage
