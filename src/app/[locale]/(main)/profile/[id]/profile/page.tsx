import { getUser } from "@/lib/auth"
import { notFound } from "next/navigation"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import _ from "lodash"
import { fetchUserProfile } from "./actions/fetch-user-profile"
import ViewOtherProfile from "../components/view-other-profile"
import SettingsProfile from "./components/settings-profile"
import EditProfile from "./components/edit-profile"

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
        messages={_.pick(msg, "LocaleSwitcher", "Settings", "Validations", "Errors")}
      >
        <SettingsProfile userData={userData} />
        <div className="flex w-full flex-col items-center px-5 max-md:mb-10 max-md:max-w-full">
          <EditProfile userData={userData} />
        </div>
      </NextIntlClientProvider>
    </>
  )
}
