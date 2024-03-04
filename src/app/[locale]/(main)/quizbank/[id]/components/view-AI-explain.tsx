import { cn } from "@/lib/utils"
import { PiSparkle } from "react-icons/pi"

type Props = {
  explain: string
  hiddenOrNot: string
}

export default function ViewAIExplain({ explain, hiddenOrNot }: Props) {
  return (
    <div
      className={cn(
        hiddenOrNot,
        'mt-5 whitespace-nowrap border-t-2 border-gray-300 leading-[150%] max-md:mb-10'
      )}
    >
      <div className="mt-4 flex justify-center">
        <PiSparkle />
      </div>
      {explain === "" ? (
        <div className="flex justify-center">Loading...</div>
      ) : (
        <div className="mt-2 flex overflow-auto">
          <div className="mb-[200px] text-pretty">{explain}</div>
        </div>
      )}
    </div>
  )
}
