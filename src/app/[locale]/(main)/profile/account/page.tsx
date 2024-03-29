import { getUserProfileAction } from "@/app/[locale]/(main)/profile/actions/fetch-user-profile"
import { getUser } from "@/lib/auth"
import _ from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"
import EditAccount from "./components/edit-account"

type Props = {
  params: {
    locale: string
    id: string
  }
}

const getUserProfile = async (id: string) => {
  const response = await getUserProfileAction(id)
  return response.data
}

export default async function UserProfile({ params }: Props) {
  const user = getUser()
  if (!user) return notFound()
  const userData = await getUserProfile(user.id.toString())
  const msg = await getMessages()

  return (
    <>
      <NextIntlClientProvider
        locale={params.locale}
        messages={_.pick(
          msg,
          "LocaleSwitcher",
          "Settings",
          "Validations",
          "Errors"
        )}
      >
        <EditAccount />
      </NextIntlClientProvider>
    </>
  )
}
