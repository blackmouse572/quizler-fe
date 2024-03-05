import { EFormAction } from "@/types"
import _ from "lodash"
import { NextIntlClientProvider, useMessages } from "next-intl"
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
    visibility: "Public",
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
