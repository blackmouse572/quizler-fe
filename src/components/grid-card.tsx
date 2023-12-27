
type Props = React.ComponentPropsWithoutRef<"div">

function GridCard({ className, ...props }: Props) {
    return (
        <div {...props} className="h-[20rem] w-full bg-slate-800 dark:bg-white  bg-grid-lg-white/[0.2] dark:bg-grid-lg-black/[0.2] relative flex flex-col items-center justify-center gap-4 overflow-clip">
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-slate-800 dark:bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,white)] p-28" />
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-grain-slate-50 bg-opacity-30" />
            <p className="font-black font-heading text-4xl sm:text-7xl relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-slate-200 to-slate-500">
                Quizler
            </p>
            <p className="font-black text-sm sm:text-base relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-slate-200 to-slate-400 tracking-wider">
                Bring joy and fun to your classroom
            </p>
        </div>
    )
}

export default GridCard