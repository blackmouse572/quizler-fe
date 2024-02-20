import GoBackButton from "@/components/go-back-btn"
import _ from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import { VerifyRegister } from "../component/verify-sign-up"
import { notFound } from "next/navigation"

type VerifyRegisterProps = {
  searchParams: { [key: string]: string | string[] | undefined }
}
export default async function VerifyRegisterPage({
  searchParams,
}: VerifyRegisterProps) {
  const m = await getMessages()
  const { email, pin } = searchParams

  if (!email) return notFound()

  return (
    <div className="h-full w-full">
      <GoBackButton />
      <NextIntlClientProvider messages={_.pick(m, "VerifySignUp", "Errors")}>
        <VerifyRegister
          initialValues={{
            email: email.toString(),
            token: pin ? pin.toString() : "",
          }}
        />
      </NextIntlClientProvider>
    </div>
  )
}
