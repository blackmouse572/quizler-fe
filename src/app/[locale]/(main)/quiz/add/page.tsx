import _ from "lodash"
import { NextIntlClientProvider, useMessages, useTranslations } from "next-intl"
import { z } from "zod"
import AddQuizbankForm from "./components/add-quizbank-form"

function AddQuizbank() {
  const message = useMessages()
  return (
    <NextIntlClientProvider
      messages={_.pick(message, "Validations", "AddQuiz")}
    >
      <AddQuizbankForm />
    </NextIntlClientProvider>
  )
}

export default AddQuizbank
