import {
  getQuizBankDetailPage,
  getQuizByQuizBankId,
} from "@/services/quiz.service"
import { EFormAction } from "@/types"
import _ from "lodash"
import { NextIntlClientProvider, useMessages } from "next-intl"
import { use } from "react"
import AddQuizbankForm, {
  AddQuizbank,
} from "../../add/components/add-quizbank-form"

type QuizBankDetailPageProps = {
  params: { id: string }
}

function EditQuizbank({ params }: QuizBankDetailPageProps) {
  const { id } = params
  const message = useMessages()

  const { props } = use(getQuizBankDetailPage(id))
  const data = props.data
  const { data: quizesData } = use(getQuizByQuizBankId(id))

  const initialValues: AddQuizbank = {
    bankName: data.bankName,
    description: data.description,
    quizes: quizesData?.data ?? [],
    tags: [],
    visibility: data.visibility,
  }

  return (
    <NextIntlClientProvider
      messages={_.pick(message, "Validations", "EditQuiz", "Errors")}
    >
      <AddQuizbankForm
        initialValues={initialValues}
        action={EFormAction.Edit}
        quizBankId={data?.id?.toString()}
      />
    </NextIntlClientProvider>
  )
}

export default EditQuizbank
