import GoBackButton from "@/components/go-back-btn"
import _ from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import VerifyForgotPasswordForm from "../component/verify-forgot-password-form"
import ChangePasswordForm from "../component/change-password-form"

export default async function ChangePasswordPage() {
  const t = await getTranslations("ChangePassword")
  const m = await getMessages()

  return (
    <div className="h-full w-full">
      <GoBackButton />
      <NextIntlClientProvider messages={_.pick(m, "ChangePassword")}>
        <ChangePasswordForm />
      </NextIntlClientProvider>
    </div>
  )
}
