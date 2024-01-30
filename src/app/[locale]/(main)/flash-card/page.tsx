import BackgroundSquare from "@/components/background-square"
import { Badge } from "@/components/ui/badge"

const FlashCard = () => {
  return (
    <BackgroundSquare className="items-start">
      <div className="mt-[69px] flex w-screen justify-center">
        <div className="mt-4 flex w-[60%] justify-between bg-red-500 px-4">
          <div className="">
            <h1 className="text-2xl font-bold">title</h1>
            <div className="text-lg">description</div>
            <div className="space-x-2">
              <Badge variant={"flat"} color={'accent'} size={"sm"}>
                Biology
              </Badge>
              <Badge color={"accent"} size={"sm"}>
                Biology
              </Badge>
            </div>
          </div>
          <div className="flex space-x-2">
            <div>star</div>
            <div>rate</div>
            <div>total rate</div>
          </div>
        </div>
      </div>
    </BackgroundSquare>
  )
}

export default FlashCard
