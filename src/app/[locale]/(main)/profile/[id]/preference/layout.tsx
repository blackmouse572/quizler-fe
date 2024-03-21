import BackgroundSquare from "@/components/background-square"
import { getUser } from "@/lib/auth"
import { notFound } from "next/navigation"

type Props = { children?: React.ReactNode }

function ProfileLayout({ children }: Props) {
  const user = getUser()
  if (!user) return notFound()
  return (
    <BackgroundSquare
      variant={"topDown"}
      className="container mx-auto items-start pt-10"
    >
      {children}
    </BackgroundSquare>
  )
}

export default ProfileLayout
