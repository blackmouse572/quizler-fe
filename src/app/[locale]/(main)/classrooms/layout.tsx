import BackgroundSquare from "@/components/background-square"
import { getUser } from "@/lib/auth"
import { pick } from "lodash"
import { NextIntlClientProvider, useMessages, useTranslations } from "next-intl"
import { RedirectType, redirect } from "next/navigation"

type Props = { children?: React.ReactNode }

function ClassroomLayout({ children }: Props) {
  const t = useTranslations("Errors")
  const msg = useMessages()

  const user = getUser()
  if (!user) {
    redirect("/login", RedirectType.push)
  } else {
    return (
      <NextIntlClientProvider
        messages={pick(
          msg,
          "Validations",
          "Join_classroom",
          "Errors",
          "Delete_classroom",
          "Classroom"
        )}
      >
        <BackgroundSquare
          variant={"topDown"}
          className="container mx-auto items-start pt-20"
        >
          <div className="relative">{children}</div>
        </BackgroundSquare>
      </NextIntlClientProvider>
    )
  }
}

export default ClassroomLayout
