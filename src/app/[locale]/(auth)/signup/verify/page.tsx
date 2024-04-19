import GoBackButton from "@/components/go-back-btn"
import _ from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"
import { VerifyRegister } from "../component/verify-sign-up"

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
    <div className="">
      <GoBackButton />
      <NextIntlClientProvider
        messages={_.pick(m, "VerifySignUp", "Errors", "Validations")}
      >
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
