import GoBackButton from "@/components/go-back-btn"
import _ from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import VerifyForgotPasswordForm from "../component/verify-forgot-password-form"
import { notFound } from "next/navigation"
import { validateJWT } from "@/lib/auth"
import ChangePasswordForm from "../component/change-password-form"

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

  const isValidToken = validateJWT(
    t.toString(),
    process.env.FORGOT_PASSWORD_SECRET!
  ) as Record<string, any>

  return (
    <div className="h-full w-full">
      <GoBackButton />
      <NextIntlClientProvider messages={_.pick(m, "ChangePassword")}>
        <ChangePasswordForm token={t as string} email={isValidToken.email} />
      </NextIntlClientProvider>
    </div>
  )
}
