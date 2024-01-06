
function AuthLayout({ children }: React.PropsWithChildren<{}>) {
    return (
        <div className="bg-grid-xl-slate-300/20 flex h-screen items-center justify-center ">
            <div className="z-10">
                {children}
            </div>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-neutral-200 p-28 backdrop-blur-lg [mask-image:radial-gradient(ellipse_at_center,transparent_0%,var(--neutral-200)_70%)] dark:bg-white" />
        </div>
    )
}

export default AuthLayout