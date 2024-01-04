import { INextLayout } from "@/types/site"

function AuthLayout({ children }: INextLayout) {
    return (
        <div className="bg-grid-xl-slate-300/20 h-screen flex justify-center items-center ">
            <div className="z-10">
                {children}
            </div>
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-neutral-200 dark:bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_0%,var(--neutral-200)_70%)] p-28 backdrop-blur-lg" />
        </div>
    )
}

export default AuthLayout