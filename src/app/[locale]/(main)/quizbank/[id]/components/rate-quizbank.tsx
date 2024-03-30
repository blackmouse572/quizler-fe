import { useRateQuizbank } from "@/app/[locale]/(main)/quizbank/[id]/components/useRateQuizbank"
import { Icons } from "@/components/ui/icons"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useToast } from "@/components/ui/use-toast"
import EmojiPicker from "emoji-picker-react"
import { useTranslations } from "next-intl"
import { useState } from "react"

type Props = {
  quizbankId: string
  averageRating: number
}
const REACTIONS = [
  {
    emoji: "1f62c",
    count: 1,
  },
  {
    emoji: "1f641",
    count: 2,
  },
  {
    emoji: "1f610",
    count: 3,
  },
  {
    emoji: "1f601",
    count: 4,
  },
  {
    emoji: "1f60d",
    count: 5,
  },
]
function RateQuizbank({ averageRating, quizbankId }: Props) {
  const { toast } = useToast()
  const i18n = useTranslations("ViewQuizBank")
  const error = useTranslations("Errors")
  const [isOpened, setIsOpened] = useState(false)
  const { mutateAsync } = useRateQuizbank(quizbankId)

  const onReactionClick = async (rating: number) => {
    try {
      await mutateAsync(rating)
      toast({
        title: i18n("rating.title"),
        description: i18n("rating.success", {
          rating,
        }),
        variant: "flat",
        color: "success",
      })
    } catch (e) {
      const err = e as Error
      toast({
        title: error("index"),
        description: error(err.message as any),
        variant: "flat",
        color: "danger",
      })
    }
  }
  return (
    <>
      <Popover open={isOpened} onOpenChange={setIsOpened}>
        <PopoverTrigger>
          <Icons.Star />
        </PopoverTrigger>

        <PopoverContent className="border-none bg-transparent p-0 shadow-none">
          <EmojiPicker
            className="shadow-sm"
            reactionsDefaultOpen={true}
            onReactionClick={(e) => {
              const index = REACTIONS.findIndex((r) => r.emoji === e.unified)
              onReactionClick(index + 1)
              setIsOpened(false)
            }}
            reactions={["1f62c", "1f641", "1f610", "1f601", "1f60d"]}
            allowExpandReactions={false}
          />
        </PopoverContent>
      </Popover>

      <div className="grow">{averageRating} • 5</div>
    </>
  )
}

export default RateQuizbank
