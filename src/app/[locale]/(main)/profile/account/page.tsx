import { getUserProfileAction } from "@/app/[locale]/(main)/profile/actions/fetch-user-profile"
import { getUser } from "@/lib/auth"
import _ from "lodash"
import type { Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import EditAccount from "./components/edit-account"
import UpgradePlan from "./components/upgrade-plan"

type Props = {
  params: {
    locale: string
    id: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const msg = await getTranslations("Settings")
  return {
    title: msg("account.title"),
  }
}

const getUserProfile = async (id: string) => {
  const response = await getUserProfileAction(id)
  return response.data
}

export default async function UserProfile({ params }: Props) {
  const user = getUser()
  if (!user) return notFound()
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
        <UpgradePlan />
      </NextIntlClientProvider>
    </>
  )
}
