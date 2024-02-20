import { UserAuthForm } from "@/app/[locale]/(auth)/signup/component/sign-up-form"
import GoBackButton from "@/components/go-back-btn"
import { getMessages, getTranslations } from "next-intl/server"
import { NextIntlClientProvider } from "next-intl"
import _ from "lodash"

export const metadata = {
  title: "Create an account",
  description: "Create an account to get started.",
}

export default async function RegisterPage() {
  const m = await getMessages()

  return (
    <div className="h-full w-full">
      <GoBackButton />
      <NextIntlClientProvider messages={_.pick(m, "SignUp", "Errors")}>
        <UserAuthForm />
      </NextIntlClientProvider>
    </div>
  )
}
