import GameNavbar from "@/app/[locale]/(fullscreen)/classrooms/[id]/game/[gameId]/components/navbar"
import PlayGame from "@/app/[locale]/(fullscreen)/classrooms/[id]/game/[gameId]/components/play-game"
import getGameDetailsAction from "@/app/[locale]/(main)/classrooms/[id]/games/actions/get-game-detail-action"
import BackgroundSquare from "@/components/background-square"
import _ from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { z } from "zod"

type Props = {
  params: {
    id: string
    gameId: string
  }
}

export async function generateMetadata({ params }: Props) {
  const { gameId } = params
  const id = z.number().parse(+gameId)
  const { data, message, ok } = await getGameDetailsAction({ gameId: id })
  return {
    title: data?.gameName,
    description: data?.gameName,
  }
}

async function GamePage({ params }: Props) {
  const { gameId } = params
  const id = z.number().parse(+gameId)
  const { data, message, ok } = await getGameDetailsAction({ gameId: id })
  const msg = await getMessages()
  if (!ok || data?.status.toLowerCase() === "ended") {
    throw new Error(message)
  }
  return (
    <BackgroundSquare variant={"topDown"} className="bg-grid-xl-slate-500/20">
      <GameNavbar game={data!} />
      <div className="container mx-auto">
        <NextIntlClientProvider messages={_.pick(msg, "ClassroomGame")}>
          <PlayGame initData={data!} />
        </NextIntlClientProvider>
      </div>
    </BackgroundSquare>
  )
}

export default GamePage
