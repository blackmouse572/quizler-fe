import { getTranslations } from "next-intl/server"
import Contact from "./components/contact"

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({
    locale,
    namespace: "Contact.metadata",
  })

  return {
    title: t("title"),
    description: t("description"),
  }
}

export default function ContactUsPage() {
  return (
    <Contact />
  )
}
