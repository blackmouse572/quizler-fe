import _ from "lodash"
import { NextIntlClientProvider, useMessages, useTranslations } from "next-intl"
import AddQuizbankForm, {
  AddQuizbank,
} from "../../add/components/add-quizbank-form"
import { use } from "react"
import { getQuizBankDetailPage } from "@/services/quiz.service"
import { EQuizBankAction } from "@/types"

type QuizBankDetailPageProps = {
  params: { id: string }
}

function EditQuizbank({ params }: QuizBankDetailPageProps) {
  const { id } = params
  const message = useMessages()
  // const [initialValues, setInitialValues] = useState<AddQuizbank>({
  //   bankName: "",
  //   description: "",
  //   quizes: [
  //     {
  //       question: "",
  //       answer: "",
  //     },
  //   ],
  //   tags: [],
  //   visibility: "public",
  // })

  const { props } = use(getQuizBankDetailPage(id))
  const data = props.data
  const initialValues: AddQuizbank = {
    bankName: data.bankName,
    description: data.description,
    quizes: data.quizes,
    tags: [],
    visibility: data.visibility,
  }

  // useEffect(() => {
  //   const data = props.data
  //   const newInitialValue: AddQuizbank = {
  //     bankName: data.bankName,
  //     description: data.description,
  //     quizes: data.quizes,
  //     tags: [],
  //     visibility: data.visibility,
  //   }

  //   setInitialValues(newInitialValue)
  // }, [props])

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
