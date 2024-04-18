import BackgroundSquare from "@/components/background-square"

type Props = { children?: React.ReactNode }

function ClassroomLayout({ children }: Props) {
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
