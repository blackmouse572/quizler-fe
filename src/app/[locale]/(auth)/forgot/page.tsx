import GoBackButton from "@/components/go-back-btn"
import _ from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import ForgotPasswordForm from "./component/forgot-password-form"
import SentEmailCard from "./component/sent-email-card"

type ForgotPasswordProps = {
  searchParams: { [key: string]: string | string[] | undefined }
}

async function ForgotPasswordPage({ searchParams }: ForgotPasswordProps) {
  const t = await getTranslations("ForgotPassword")
  const { state } = searchParams
  const m = await getMessages()

  return (
    <div className="h-full w-full">
      <GoBackButton />
      {state === "sent" ? (
        <SentEmailCard />
      ) : (
        <NextIntlClientProvider messages={_.pick(m, "ForgotPassword")}>
          <ForgotPasswordForm />
        </NextIntlClientProvider>
      )}
    </div>
  )
}

export default ForgotPasswordPage
