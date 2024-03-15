import { EFormAction } from "@/types"
import _ from "lodash"
import { NextIntlClientProvider, useMessages } from "next-intl"
import AddQuizbankForm, { AddQuizbank } from "./components/add-quizbank-form"
import { getToken } from "@/lib/auth"
import { notFound } from "next/navigation"

function AddQuizbank() {
  const message = useMessages()
  const initialValues: AddQuizbank = {
    bankName: "",
    description: "",
    quizes: [
      {
        question: "",
        answer: "",
      },
    ],
    tags: [],
    visibility: "Public",
  }

  const { token } = getToken()

  {
    !token && notFound()
  }

  return (
    <NextIntlClientProvider
      messages={_.pick(message, "Validations", "AddQuiz", "QuizForm", "Errors")}
    >
      <AddQuizbankForm initialValues={initialValues} action={EFormAction.Add} />
    </NextIntlClientProvider>
  )
}

export default AddQuizbank
