import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useTranslations } from "next-intl"
import Link from "next/link"
import Otp from "@/components/ui/otp"

export function VerifyRegister() {
  const t = useTranslations("VerifySignUp")

  return (
    <Card className="min-w-96">
      <CardHeader>
        <CardTitle className="font-heading text-lg">{t("title")}</CardTitle>
        <CardDescription className="text-sm text-neutral-500">
          {t.rich("description", {
            resent: (children) => (
              <Link
                className="font-medium underline opacity-75 hover:opacity-100"
                href="/"
              >
                <b>{children}</b>
              </Link>
            ),
            br: () => <br />
          })}
        </CardDescription>

        <CardContent>
            
        </CardContent>
      </CardHeader>
    </Card>
  )
}
