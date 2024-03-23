import BackgroundSquare from "@/components/background-square"
import { getUser } from "@/lib/auth"
import { notFound } from "next/navigation"

type Props = { children?: React.ReactNode }

function ClassroomResultLayout({ children }: Props) {
  const user = getUser()
  if (!user) return notFound()
  return (
    <BackgroundSquare
      variant={"topDown"}
      className="container mx-auto items-start"
    >
      {children}
    </BackgroundSquare>
  )
}

export default ClassroomResultLayout
