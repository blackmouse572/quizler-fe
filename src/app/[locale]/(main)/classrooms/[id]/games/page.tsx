import { Button } from "@/components/ui/button"
import Link from "next/link"

type Props = {
  params: {
    id: string
  }
}

function GamePage({ params }: Props) {
  return (
    <div>
      <Link href={`/classrooms/${params.id}/game/1`}>
        <Button>GAME GO HERE</Button>
      </Link>
    </div>
  )
}

export default GamePage
