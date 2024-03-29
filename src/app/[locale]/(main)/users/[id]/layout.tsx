import BackgroundSquare from "@/components/background-square"
import _ from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import React from "react"

type Props = React.PropsWithChildren<{}>

async function UserLayout({ children }: Props) {
  const msg = await getMessages()
  return (
    <BackgroundSquare variant={"default"} className="items-start py-16">
      <NextIntlClientProvider messages={_.pick(msg, "Settings")}>
        <div className="container mx-auto space-y-4">{children}</div>
      </NextIntlClientProvider>
    </BackgroundSquare>
  )
}

export default UserLayout
