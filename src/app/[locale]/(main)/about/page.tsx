import { getTranslations } from "next-intl/server"
import Image from "next/image"
import AboutUs from "./components/AboutUs"

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({
    locale,
    namespace: "AboutUs.metadata",
  })

  return {
    title: t("title"),
    description: t("description"),
  }
}

export default function AboutUsPage() {
  return (
    <AboutUs />
  )
}
