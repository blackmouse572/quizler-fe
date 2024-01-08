import GoBackButton from "@/components/go-back-btn"
import _ from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import { VerifyRegister } from "../component/verify-sign-up"

export default async function VerifyRegisterPage() {
  const t = await getTranslations("SignUp")
  const m = await getMessages()

  return (
    <div className="h-full w-full">
      <GoBackButton />
      <NextIntlClientProvider messages={_.pick(m, "SignUp")}>
        <VerifyRegister />
      </NextIntlClientProvider>
    </div>
  )
}
