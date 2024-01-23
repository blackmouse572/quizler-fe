import BackgroundSquare from "@/components/background-square"

function AuthLayout({ children }: React.PropsWithChildren<{}>) {
    return (
        <BackgroundSquare>
            {children}
        </BackgroundSquare>
    )
}

export default AuthLayout