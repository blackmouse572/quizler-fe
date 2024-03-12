import BackgroundSquare from "@/components/background-square"
import { pick } from "lodash"
import { NextIntlClientProvider, useMessages } from "next-intl"

type QuizbankLayoutProps = {
  children?: React.ReactNode
  params: {
    locale: string
  }
}
export default function SearchLayout({
  children,
  params: { locale },
}: QuizbankLayoutProps) {
  const messages = useMessages()

  return (
    <NextIntlClientProvider locale={locale} messages={pick(messages, "Navbar")}>
      <BackgroundSquare
        variant={"topDown"}
        className="container mx-auto items-start pt-20"
      >
        {children}
      </BackgroundSquare>
    </NextIntlClientProvider>
  )
}
