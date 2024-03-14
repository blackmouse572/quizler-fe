"use client"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useRouter } from "next/navigation"
import { useCallback } from "react"

type Props = {
quizbankId:string
  content?: string
}

const EditQuizBank = ({ quizbankId,content }: Props) => {
  const router = useRouter()

  const onEditClick = useCallback(() => {
    router.push(`/quizbank/${quizbankId}/edit`)
  },[quizbankId, router])

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button color="accent" isIconOnly onClick={e => onEditClick()}>
          <Icons.Edit />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  )
}

export default EditQuizBank
