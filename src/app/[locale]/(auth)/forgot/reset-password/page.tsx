import GoBackButton from "@/components/go-back-btn"
import _ from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import VerifyForgotPasswordForm from "../component/verify-forgot-password-form"
import { z } from "zod"
import { notFound } from "next/navigation"

type VerifyForgotPasswordPageProps = {
  searchParams: { [key: string]: string | string[] | undefined }
}
async function ForgotPasswordPage({
  searchParams,
}: VerifyForgotPasswordPageProps) {
  const m = await getMessages()
  const { email } = searchParams
  const validate = z.string().email()
  await validate.parseAsync(email).catch((e) => notFound())

  return (
    <div className="h-full w-full">
      <GoBackButton />
      <NextIntlClientProvider
        messages={_.pick(m, "VerifyForgotPassword", "Errors")}
      >
        <VerifyForgotPasswordForm email={email as string} />
      </NextIntlClientProvider>
    </div>
  )
}

export default ForgotPasswordPage
