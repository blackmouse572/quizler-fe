import BackgroundSquare from "@/components/background-square"

type QuizbankLayoutProps = {
  children?: React.ReactNode
}
function QuizbankLayout({ children }: QuizbankLayoutProps) {
  return (
    <BackgroundSquare variant={"topDown"} className="container mx-auto pt-20">
      {children}
    </BackgroundSquare>
  )
}

export default QuizbankLayout
