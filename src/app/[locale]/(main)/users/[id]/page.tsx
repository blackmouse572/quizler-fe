import { getUserProfileAction } from "@/app/[locale]/(main)/profile/actions/fetch-user-profile"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"
import { Separator } from "@/components/ui/separator"
import { getUser } from "@/lib/auth"
import { getShortName } from "@/lib/string-helper"
import _ from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getFormatter, getMessages, getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import ReportUserDialog from "./components/report-user-dialog/report-user-dialog"

type Props = {
  params: {
    id: string
  }
}

export default async function UserProfile({ params }: Props) {
  const data = await getUserProfileAction(params.id)
  const msg = await getMessages()

  const currentUser = getUser()
  const t = await getTranslations("Settings")
  const format = await getFormatter()

  if (!data.ok || !data.data) {
    return notFound()
  }
  const { data: user } = data

  return (
    <div className="w-full space-y-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.avatar || ""} alt={user.fullName} />
              <AvatarFallback>{getShortName(user.fullName)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl">{user.fullName}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="py-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <CardTitle>{t("profile.label.dob")}</CardTitle>
              <CardDescription>
                {format.dateTime(new Date(user.dob))}
              </CardDescription>
            </div>
            <div>
              <CardTitle>{t("profile.verify.title")}</CardTitle>
              <CardDescription>
                {user.isVerified ? (
                  <div className="flex items-center gap-2">
                    <Icons.Checked className="h-4 w-4 text-success-500" />
                    {t("profile.verify.title")}
                  </div>
                ) : (
                  t("profile.verify.not_verified")
                )}
              </CardDescription>
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <NextIntlClientProvider
            messages={_.pick(msg, "Validations", "Errors")}
          >
            {currentUser && currentUser.id !== user.id && (
              <ReportUserDialog
                accountId={user.id.toString()}
                accountName={user.fullName ?? user.username}
              />
            )}
          </NextIntlClientProvider>
        </CardFooter>
      </Card>
    </div>
  )
}
