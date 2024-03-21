import { getUserProfileAction } from "@/app/[locale]/(main)/profile/actions/fetch-user-profile"
import EditProfile from "@/app/[locale]/(main)/profile/components/edit-profile"
import logoutAction from "@/components/logout-btn/logout-action"
import { getUser } from "@/lib/auth"
import _ from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"

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

export default async function UserProfile(props: Props) {
  const user = getUser()
  if (!user) return notFound()
  const userData = await getUserProfile(user.id.toString())
  if (!userData) {
    await logoutAction()
    return notFound()
  }
  const msg = await getMessages()

  return (
    <>
      <NextIntlClientProvider
        messages={_.pick(
          msg,
          "LocaleSwitcher",
          "Settings",
          "Validations",
          "Errors"
        )}
      >
        <EditProfile userData={userData} />
      </NextIntlClientProvider>
    </>
  )
}
