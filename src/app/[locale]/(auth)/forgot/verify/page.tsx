import GoBackButton from "@/components/go-back-btn"
import _ from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import VerifyForgotPasswordForm from "../component/verify-forgot-password-form"

export default async function VerifyForgotPasswordPage() {
  const t = await getTranslations("VerifyForgotPassword")
  const m = await getMessages()

  return (
    <div className="h-full w-full">
      <GoBackButton />
      <NextIntlClientProvider messages={_.pick(m, "VerifyForgotPassword")}>
        <VerifyForgotPasswordForm />
      </NextIntlClientProvider>
    </div>
  )
}
