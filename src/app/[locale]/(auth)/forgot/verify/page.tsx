import GoBackButton from "@/components/go-back-btn"
import _ from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import VerifyForgotPasswordForm from "../component/verify-forgot-password-form"
import { notFound } from "next/navigation"
import { validateJWT } from "@/lib/auth"

type VerifyForgotPasswordPageProps = {
  searchParams: { [key: string]: string | string[] | undefined }
}
export default async function VerifyForgotPasswordPage({
  searchParams,
}: VerifyForgotPasswordPageProps) {
  // const t = await getTranslations("VerifyForgotPassword")
  const m = await getMessages()
  const { t } = searchParams

  if (!t) return notFound()

  const isValidToken = validateJWT(t.toString(), "forgot") as Record<
    string,
    any
  >

  return (
    <div className="h-full w-full">
      <GoBackButton />
      <NextIntlClientProvider messages={_.pick(m, "VerifyForgotPassword")}>
        <VerifyForgotPasswordForm />
      </NextIntlClientProvider>
    </div>
  )
}
