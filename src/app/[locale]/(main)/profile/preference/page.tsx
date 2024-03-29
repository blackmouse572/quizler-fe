import { getUserProfileAction } from "@/app/[locale]/(main)/profile/actions/fetch-user-profile"
import EditPreference from "@/app/[locale]/(main)/profile/components/edit-preference"
import { getUser } from "@/lib/auth"
import _ from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"

const getUserProfile = async (id: string) => {
  const response = await getUserProfileAction(id)
  return response.data
}

type Props = {
  params: {
    locale: string
  }
}

export default async function UserProfile({ params }: Props) {
  const user = getUser()
  if (!user) return notFound()
  const userData = await getUserProfile(user.id.toString())
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
        <EditPreference locale={params.locale} />
      </NextIntlClientProvider>
    </>
  )
}
