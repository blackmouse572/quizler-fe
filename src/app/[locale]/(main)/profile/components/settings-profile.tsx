import { getTranslations } from "next-intl/server"
export default async function SettingsProfile() {
  const i18n = await getTranslations("Settings")

  return (
    <>
      <div className="relative w-full max-md:max-w-full">
        <div className="text-2xl font-bold leading-9 text-black ">
          {i18n("title")}
        </div>
        <div className="text-lg font-medium leading-8 text-neutral-400 ">
          {i18n("description")}
        </div>
      </div>
    </>
  )
}
