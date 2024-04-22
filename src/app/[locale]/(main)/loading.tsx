import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { getTranslations } from "next-intl/server"

async function MainLoadingPage() {
  const t = await getTranslations("SearchPage")
  return (
    <div className="container mx-auto flex h-screen flex-col items-center justify-center gap-3">
      <Button
        size="lg"
        variant="flat"
        color="accent"
        className="cursor-default active:scale-[100%]"
      >
        <Icons.Loader className="mr-2 animate-spin" />
        {t("loading")}
      </Button>
    </div>
  )
}

export default MainLoadingPage
