import _ from "lodash"
import { NextIntlClientProvider, useMessages, useTranslations } from "next-intl"
import AddQuizbankForm, {
  AddQuizbank,
} from "../../add/components/add-quizbank-form"
import { use } from "react"
import {
  getQuizBankDetailPage,
  getQuizByQuizBankId,
} from "@/services/quiz.service"
import { EQuizBankAction } from "@/types"

type QuizBankDetailPageProps = {
  params: { id: string }
}

function EditQuizbank({ params }: QuizBankDetailPageProps) {
  const { id } = params
  const message = useMessages()

  const { props } = use(getQuizBankDetailPage(id))
  const data = props.data
  const { data: quizes } = use(getQuizByQuizBankId(id))

  const initialValues: AddQuizbank = {
    bankName: data.bankName,
    description: data.description,
    quizes: quizes ?? [],
    tags: [],
    visibility: data.visibility,
  }

  return (
    <NextIntlClientProvider
      messages={_.pick(message, "Validations", "EditQuiz", "Errors")}
    >
      <AddQuizbankForm
        initialValues={initialValues}
        action={EQuizBankAction.Edit}
        quizBankId={data?.id?.toString()}
      />
    </NextIntlClientProvider>
  )
}

export default EditQuizbank
