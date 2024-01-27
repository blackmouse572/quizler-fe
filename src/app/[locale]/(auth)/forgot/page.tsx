import GoBackButton from "@/components/go-back-btn"
import _ from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import ForgotPasswordForm from "./component/forgot-password-form"

type ForgotPasswordProps = {
  searchParams: { [key: string]: string | string[] | undefined }
}

async function ForgotPasswordPage({ searchParams }: ForgotPasswordProps) {
  const m = await getMessages()

  return (
    <div className="h-full w-full">
      <GoBackButton />
      <NextIntlClientProvider messages={_.pick(m, "ForgotPassword", "Erros")}>
        <ForgotPasswordForm />
      </NextIntlClientProvider>
    </div>
  )
}

export default ForgotPasswordPage
