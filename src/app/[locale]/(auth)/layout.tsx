import BackgroundSquare from "@/components/background-square"

function AuthLayout({ children }: React.PropsWithChildren<{}>) {
  return (
    <BackgroundSquare className="">
      <div className="flex h-full w-full items-center justify-center">
        {children}
      </div>
    </BackgroundSquare>
  )
}

export default AuthLayout
