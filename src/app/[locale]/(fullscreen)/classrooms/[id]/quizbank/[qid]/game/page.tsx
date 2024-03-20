import Context from "@/app/[locale]/(fullscreen)/classrooms/[id]/quizbank/[qid]/game/components/Context"
import Counter from "@/app/[locale]/(fullscreen)/classrooms/[id]/quizbank/[qid]/game/components/counter"
import BackgroundSquare from "@/components/background-square"

type Props = {}

function GamePage({}: Props) {
  return (
    <BackgroundSquare variant={"topDown"} className="bg-grid-xl-slate-500/20">
      <div className="container mx-auto">
        <Context />
      </div>
      <Counter className="absolute right-10 top-10" duration={6000} />
    </BackgroundSquare>
  )
}

export default GamePage
