import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { getTokens } from "@/lib/auth"
import { getUserProfile } from "@/services/account.service"
import { getMessages, getTranslations } from "next-intl/server"
import { redirect } from "next/navigation"

type Props = {}

async function ProfilePage({}: Props) {
  const { accessToken } = getTokens()
  const [m, t, profile] = await Promise.all([
    getMessages(),
    getTranslations("UserDropdown"),
    accessToken && getUserProfile(accessToken),
  ])

  if (!profile) {
    redirect("/login")
  }
  return (
    <div className="container mx-auto min-h-screen">
      <div className="h-full w-full space-y-8">
        <h3 className="font-heading text-xl font-bold">{t("profile")}</h3>
        <ul className="space-y-2">
          <li>
            <Avatar>
              <AvatarImage src={profile?.avatar} />
              <AvatarFallback>{profile?.name}</AvatarFallback>
            </Avatar>
          </li>
          <li>
            <span className="font-medium opacity-60">Name: </span>&nbsp;
            {profile?.name}
          </li>
          <li>
            <span className="font-medium opacity-60">Email:</span>&nbsp;
            {profile?.email}
          </li>
          <li>
            <Button variant="default" color="primary">
              Get user profile on client side
            </Button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ProfilePage
