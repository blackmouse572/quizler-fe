import { EFormAction } from "@/types"
import _ from "lodash"
import { NextIntlClientProvider, useMessages } from "next-intl"
import { getToken } from "@/lib/auth"
import { notFound } from "next/navigation"
import AddQuizbankForm, { AddQuizbank } from "@/app/[locale]/(main)/quizbank/add/components/add-quizbank-form"

type Props = {
  params: {
    id: string
  }
}

export default function AddQuizbankClassroom({ params }: Props) {
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
      <AddQuizbankForm
        initialValues={initialValues}
        action={EFormAction.Add}
        classroomId={params.id}
      />
    </NextIntlClientProvider>
  )
}
