"use client"
import QuizbankCard, { QuizbankCardProps } from "@/components/quizbank-card"
import { deleteQuizBank } from "../actions/detete-quiz-bank"
import { toast } from "@/components/ui/use-toast"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"

type Props = Omit<QuizbankCardProps, "onDeleteQuizBank">

const QuizBankCardComp = ({ item, translations, token,}: Props) => {
  const i18n = useTranslations("Delete_quizbank")
  const errorI18n = useTranslations("Errors")
  const router = useRouter()

  const onDeleteSucceed = () => {
    router.refresh()
  }

  const onDeleteQuizBank = async (itemId: number) => {
    const result = await deleteQuizBank(token, itemId.toString())
    if (!result.isSuccess) {
      return toast({
        title: i18n("message.failed.title"),
        description: errorI18n(result.message as any),
        variant: "flat",
        color: "danger",
      })
    } else {
      onDeleteSucceed()
      return toast({
        title: i18n("message.success.title"),
        description: i18n("message.success.description"),
        variant: "flat",
        color: "success",
      })
    }
  }
  return (
    <QuizbankCard
      item={item}
      translations={translations}
      token={token}
      onDeleteQuizBank={onDeleteQuizBank}
    >
      {item.bankName}
    </QuizbankCard>
  )
}

export default QuizBankCardComp
