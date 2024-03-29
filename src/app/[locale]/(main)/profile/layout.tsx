import SideMenu from "@/app/[locale]/(main)/profile/components/side-menu"
import SettingsProfile from "@/app/[locale]/(main)/profile/components/settings-profile"
import BackgroundSquare from "@/components/background-square"
import { PROFILE_SIDEBAR_ITEMS } from "@/lib/config/navbar-config"
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
          <SideMenu items={PROFILE_SIDEBAR_ITEMS} />
        </div>
      </NextIntlClientProvider>
    </BackgroundSquare>
  )
}

export default QuizbankLayout
