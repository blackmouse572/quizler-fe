import _ from "lodash"
import { NextIntlClientProvider, useMessages, useTranslations } from "next-intl"
import AddQuizbankForm, {
  AddQuizbank
} from "./components/add-quizbank-form"
import { EQuizBankAction } from "@/types"

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
      <AddQuizbankForm
        initialValues={initialValues}
        action={EQuizBankAction.Add}
      />
    </NextIntlClientProvider>
  )
}

export default AddQuizbank
