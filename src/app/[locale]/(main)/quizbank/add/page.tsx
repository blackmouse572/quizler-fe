import _ from "lodash"
import { NextIntlClientProvider, useMessages, useTranslations } from "next-intl"
import { z } from "zod"
import AddQuizbankForm, { AddQuizbank } from "./components/add-quizbank-form"

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
    visibility: "public",
  }
  return (
    <NextIntlClientProvider
      messages={_.pick(message, "Validations", "AddQuiz", "Errors")}
    >
      <AddQuizbankForm initialValues={initialValues} />
    </NextIntlClientProvider>
  )
}

export default AddQuizbank
