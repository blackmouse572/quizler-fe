import { getTranslations } from "next-intl/server"
import Support from "./components/support"

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({
    locale,
    namespace: "Support.metadata",
  })

  return {
    title: t("title"),
    description: t("description"),
  }
}

export default function SupportPage() {
  return (
    <Support />
  )
}
