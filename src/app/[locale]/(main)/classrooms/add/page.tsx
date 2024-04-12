import AddClassroomForm from "@/app/[locale]/(main)/classrooms/components/add-classroom-form"
import { EFormAction } from "@/types"
import _ from "lodash"
import { NextIntlClientProvider, useMessages } from "next-intl"
import { getTranslations } from "next-intl/server"

type Props = {
  params: { id: string; locale?: string }
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({
    locale,
    namespace: "AddClassroom.metadata",
  })

  return {
    title: t("title"),
    description: t("description"),
  }
}

function CreateNewClassroomPage({}: Props) {
  const message = useMessages()
  return (
    <NextIntlClientProvider
      messages={_.pick(message, "Validations", "AddClassroom", "Errors", "UpgradeAccount")}
    >
      <AddClassroomForm action={EFormAction.Add} />
    </NextIntlClientProvider>
  )
}

export default CreateNewClassroomPage
