import { getUser } from "@/lib/auth"
import { notFound } from "next/navigation"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import _ from "lodash"
import { fetchUserProfile } from "../profile/actions/fetch-user-profile"
import SettingsProfile from "../profile/components/settings-profile"
import EditPreference from "./components/edit-preference"

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

  if (!isAuthor || userData === null) {
    notFound()
  }

  return (
    <>
      <NextIntlClientProvider
        locale={params.locale}
        messages={_.pick(msg, "LocaleSwitcher", "Settings", "Validations")}
      >
        <SettingsProfile userData={userData} />
        <div className="flex w-full flex-col items-center px-5 max-md:mb-10 max-md:max-w-full">
          <EditPreference locale={params.locale} />
        </div>
      </NextIntlClientProvider>
    </>
  )
}
