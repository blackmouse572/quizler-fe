import Context from "@/app/[locale]/(fullscreen)/classrooms/[id]/quizbank/[qid]/game/components/Context"
import GameNavbar from "@/app/[locale]/(fullscreen)/classrooms/[id]/quizbank/[qid]/game/components/navbar"
import BackgroundSquare from "@/components/background-square"

type Props = {}

function GamePage({}: Props) {
  return (
    <BackgroundSquare variant={"topDown"} className="bg-grid-xl-slate-500/20">
      <GameNavbar />
      <div className="container mx-auto">
        <Context />
      </div>
    </BackgroundSquare>
  )
}

export default GamePage
