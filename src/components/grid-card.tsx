
type Props = React.ComponentPropsWithoutRef<"div">

function GridCard({ className, ...props }: Props) {
    return (
        <div {...props} className="bg-grid-lg-white/[0.2] dark:bg-grid-lg-black/[0.2] relative flex  h-[20rem] w-full flex-col items-center justify-center gap-4 text-clip bg-slate-800 dark:bg-white">
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-slate-800 p-28 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,white)] dark:bg-white" />
            <div className="bg-grain-slate-50/30 pointer-events-none absolute inset-0 flex items-center justify-center" />
            <p className="font-heading relative z-20 bg-gradient-to-b from-slate-200 to-slate-500 bg-clip-text text-4xl font-black text-transparent sm:text-7xl">
                Quizler
            </p>
            <p className="relative z-20 bg-gradient-to-b from-slate-200 to-slate-400 bg-clip-text text-sm font-black tracking-wider text-transparent sm:text-base">
                Bring joy and fun to your classroom
            </p>
        </div>
    )
}

export default GridCard