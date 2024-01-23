import GoBackButton from "@/components/go-back-btn"
import _ from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"

type Props = {}

async function ForgotPasswordPage({}: Props) {
  const t = await getTranslations("ForgotPassword")
  const m = await getMessages()

  return (
    <div className="h-full w-full">
      <GoBackButton />
      <NextIntlClientProvider messages={_.pick(m, "ForgotPassword")}>
        {/* <ForgotPasswordForm /> */}
        <div></div>
      </NextIntlClientProvider>
    </div>
  )
}

export default ForgotPasswordPage
