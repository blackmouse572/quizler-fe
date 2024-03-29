import GameNavbar from "@/app/[locale]/(fullscreen)/classrooms/[id]/game/[gameId]/components/navbar"
import PlayGame from "@/app/[locale]/(fullscreen)/classrooms/[id]/game/[gameId]/components/play-game"
import BackgroundSquare from "@/components/background-square"
import DATA from "./DATA.json"

type Props = {}

function GamePage({}: Props) {
  return (
    <BackgroundSquare variant={"topDown"} className="bg-grid-xl-slate-500/20">
      <GameNavbar duration={60} />
      <div className="container mx-auto">
        <PlayGame initData={DATA as any} />
      </div>
    </BackgroundSquare>
  )
}

export default GamePage
