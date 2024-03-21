import BackgroundSquare from "@/components/background-square"
import { getUser } from "@/lib/auth"
import { notFound } from "next/navigation"

type Props = { children?: React.ReactNode }

function ClassroomLayout({ children }: Props) {
  const user = getUser()
  if (!user) return notFound()
  return (
    <BackgroundSquare
      variant={"topDown"}
      className="container mx-auto items-start pt-20"
    >
      <div className="relative">{children}</div>
    </BackgroundSquare>
  )
}

export default ClassroomLayout
