import _ from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"

type ProfileLayoutProps = {
  children?: React.ReactNode
  params: {
    locale: string
  }
}

export default async function ProfilePage({
  children,
  params: { locale },
}: ProfileLayoutProps) {
  const msg = await getMessages()

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={_.pick(msg)}
    >
      {children}
    </NextIntlClientProvider>
  )
}
