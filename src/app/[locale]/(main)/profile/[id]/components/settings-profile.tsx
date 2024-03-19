import { User } from "@/types"
import NavigationMenu from "./navigation-menu"
import { getLocale, getTranslations } from "next-intl/server"

type Props = {
  userData: User
}

export default async function SettingsProfile({ userData }: Props) {
  const locale = await getLocale()
  const i18n = await getTranslations("Settings")

  return (
    <>
      <div className="relative mt-14 flex w-full flex-col px-5 max-md:mb-10 max-md:max-w-full">
        <div className="flex w-7/12 self-center text-2xl font-bold leading-9 text-black max-md:mt-10 max-md:max-w-full">
          {i18n("title")}
        </div>
        <div className="flex w-7/12 self-center text-lg font-medium leading-8 text-neutral-400 max-md:max-w-full">
          {i18n("description")}
        </div>
      </div>

      <div className="relative mt-5 flex w-full flex-col items-center px-5 max-md:mb-10 max-md:max-w-full">
        <NavigationMenu locale={locale} userData={userData} />
      </div>
    </>
  )
}
