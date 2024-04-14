import { getToken, getUser } from "@/lib/auth"
import {
  getQuizBankDetailPage,
  getQuizByQuizBankId,
} from "@/services/quiz.service"
import { EFormAction } from "@/types"
import _ from "lodash"
import { NextIntlClientProvider, useMessages } from "next-intl"
import { notFound } from "next/navigation"
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
  const { data: quizesData } = use(getQuizByQuizBankId(id, { take: 999 }))

  const initialValues: AddQuizbank = {
    bankName: data.bankName,
    tags: data.tags,
    quizes: quizesData?.data || [],
    description: data.description,
    visibility: data.visibility,
  }

  const { token } = getToken()
  const user = getUser()

  const isAuthor = user?.email === data.author.email

  {
    ;(!token || !isAuthor) && notFound()
  }

  return (
    <NextIntlClientProvider
      messages={_.pick(
        message,
        "Validations",
        "EditQuiz",
        "Navbar",
        "AddQuiz",
        "Errors"
      )}
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
