import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useTranslations } from "next-intl"
import Link from "next/link"

function SentEmailCard() {
  const t = useTranslations("ForgotPassword.card")
  return (
    <Card className="w-full min-w-96 xl:w-[30vw]">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("desciption")}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center text-base text-neutral-500">{t("missing")}</p>
      </CardContent>
      <CardFooter>
        <Link className="w-full" href="/forgot">
          <Button className="w-full">{t("try-again")}</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default SentEmailCard
