import BackgoundSquare from "@/components/ui/background-square"

function AuthLayout({ children }: React.PropsWithChildren<{}>) {
    return (
        <BackgoundSquare>
            {children}
        </BackgoundSquare>
    )
}

export default AuthLayout