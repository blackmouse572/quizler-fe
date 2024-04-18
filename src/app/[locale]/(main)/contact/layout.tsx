import BackgroundSquare from "@/components/background-square"
import { pick } from "lodash"
import { NextIntlClientProvider, useMessages } from "next-intl"

type Props = {
  children?: React.ReactNode
  params: {
    locale: string
  }
}

function ContactLayout({ children, params: { locale } }: Props) {
  const messages = useMessages()

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={pick(messages, "Contact", "Validations")}
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

export default ContactLayout
