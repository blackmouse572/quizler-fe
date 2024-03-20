import { getUser } from "@/lib/auth"
import { fetchUserProfile } from "./actions/fetch-user-profile"
import SettingsProfile from "./components/settings-profile"
import { notFound } from "next/navigation"
import ViewOtherProfile from "./components/view-other-profile"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import _ from "lodash"

type Props = {
  params: {
    locale: string
    id: string
  }
}

const getUserProfile = async (id: string) => {
  const response = await fetchUserProfile(id)
  return response.data
}

export default async function UserProfile({ params }: Props) {
  const userData = await getUserProfile(params.id)
  const user = getUser()
  const msg = await getMessages()

  const isAuthor = user?.id.toString() === params.id

  if (userData === null) {
    notFound()
  }
  if (!isAuthor) {
    return (
      <NextIntlClientProvider
        locale={params.locale}
        messages={_.pick(msg, "LocaleSwitcher", "ViewOtherProfile", "Validations")}
      >
        <ViewOtherProfile userData={userData} />
      </NextIntlClientProvider>
    )
  }

  return (
    <>
      <NextIntlClientProvider
        locale={params.locale}
        messages={_.pick(msg, "LocaleSwitcher", "Settings", "Validations")}
      >
        <SettingsProfile userData={userData} />
      </NextIntlClientProvider>
    </>
  )
}
