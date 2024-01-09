export function TailwindIndicator() {
  if (process.env.NODE_ENV === "production") return null

  return (
    <div className="fixed bottom-1 left-1 z-50 flex cursor-default items-center justify-center rounded-full bg-gray-800 px-2 py-1.5 font-mono text-xs text-white opacity-45 transition-all duration-500 ease-out hover:opacity-100">
      Screen:&nbsp;
      <div className="block sm:hidden">xs</div>
      <div className="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
        sm
      </div>
      <div className="hidden md:block lg:hidden xl:hidden 2xl:hidden">md</div>
      <div className="hidden lg:block xl:hidden 2xl:hidden">lg</div>
      <div className="hidden xl:block 2xl:hidden">xl</div>
      <div className="hidden 2xl:block">2xl</div>
    </div>
  )
}
