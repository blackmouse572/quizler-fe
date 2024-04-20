import { Metadata } from "next"
import { useTranslations } from "next-intl"
import { getTranslations } from "next-intl/server"

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({
    locale,
    namespace: "Documentation.docs_page.metadata",
  })

  return {
    title: t("title"),
    description: t("description"),
  }
}

const DocsPage = () => {
  const i18n = useTranslations("Documentation.docs_page")
  return (
    <div className="p-4">
      <header className="flex flex-col space-y-4">
        <h1 className="flex self-center text-3xl font-bold">
          {i18n("header.title")}
        </h1>
        <h2 className="flex self-center text-2xl font-semibold">
          {i18n("header.subtitle")}
        </h2>
      </header>
      <main className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">
            {i18n("main.introduction.title")}
          </h3>
          <p>{i18n("main.introduction.paragraph")}</p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">
            {i18n("main.key_features.title")}
          </h3>
          <h4 className="text-lg font-semibold">
            {i18n("main.key_features.interactive_quizzing.title")}
          </h4>
          <p>{i18n("main.key_features.interactive_quizzing.paragraph")}</p>
          <h4 className="text-lg font-semibold">
            {i18n("main.key_features.flashcard_functionality.title")}
          </h4>
          <p>{i18n("main.key_features.flashcard_functionality.paragraph")}</p>
          <h4 className="text-lg font-semibold">
            {i18n("main.key_features.gamified_learning.title")}
          </h4>
          <p>{i18n("main.key_features.gamified_learning.paragraph")}</p>
          <h4 className="text-lg font-semibold">
            {i18n("main.key_features.comprehensive_analytics.title")}
          </h4>
          <p>{i18n("main.key_features.comprehensive_analytics.paragraph")}</p>
          <h4 className="text-lg font-semibold">
            {i18n("main.key_features.social_learning.title")}
          </h4>
          <p>{i18n("main.key_features.social_learning.paragraph")}</p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">
            {i18n("main.how_to_use.title")}
          </h3>
          <h4 className="text-lg font-semibold">
            {i18n("main.how_to_use.navigation.title")}
          </h4>
          <p>{i18n("main.how_to_use.navigation.paragraph_1")}</p>
          <p className="font-semibold">
            {i18n("main.how_to_use.navigation.paragraph_2")}
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">
            {i18n("main.why_choose.title")}
          </h3>
          <h4 className="text-lg font-semibold">
            {i18n("main.why_choose.efficiency.title")}
          </h4>
          <p>{i18n("main.why_choose.efficiency.paragraph")}</p>
          <h4 className="text-lg font-semibold">
            {i18n("main.why_choose.engagement.title")}
          </h4>
          <p>{i18n("main.why_choose.engagement.paragraph")}</p>
          <h4 className="text-lg font-semibold">
            {i18n("main.why_choose.community.title")}
          </h4>
          <p>{i18n("main.why_choose.community.paragraph")}</p>
          <h4 className="text-lg font-semibold">
            {i18n("main.why_choose.flexibility.title")}
          </h4>
          <p>{i18n("main.why_choose.flexibility.paragraph")}</p>
        </div>

        <div className="space-y-4">
          <p className="text-xl font-semibold">
            {i18n("main.last_words.paragraph_1")}
          </p>
          <p>{i18n("main.last_words.paragraph_2")}</p>
        </div>
      </main>
    </div>
  )
}

export default DocsPage
