import NavigationMenu from "@/app/[locale]/(main)/profile/components/navigation-menu"
import SettingsProfile from "@/app/[locale]/(main)/profile/components/settings-profile"
import BackgroundSquare from "@/components/background-square"
import _ from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"

type QuizbankLayoutProps = {
  children?: React.ReactNode
}
async function QuizbankLayout({ children }: QuizbankLayoutProps) {
  const msg = await getMessages()
  return (
    <BackgroundSquare variant={"default"} className="items-start py-16">
      <NextIntlClientProvider messages={_.pick(msg, "Settings")}>
        <div className="container relative mx-auto space-y-4">
          <SettingsProfile />
          {children}
          <NavigationMenu />
        </div>
      </NextIntlClientProvider>
    </BackgroundSquare>
  )
}

export default QuizbankLayout
