import BackgroundSquare from "@/components/background-square"

type QuizbankLayoutProps = {
  children?: React.ReactNode
}
export default function SearchLayout({ children }: QuizbankLayoutProps) {
  return (
    <BackgroundSquare
      variant={"topDown"}
      className="container mx-auto items-start pt-20"
    >
      {children}
    </BackgroundSquare>
  )
}
