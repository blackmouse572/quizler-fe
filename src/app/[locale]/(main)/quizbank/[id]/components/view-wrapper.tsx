"use client"
import ViewFlashcard from "@/app/[locale]/(main)/quizbank/[id]/components/view-flashcard"
import ViewQuizzes from "@/app/[locale]/(main)/quizbank/[id]/components/view-quizzes"
import { Quiz } from "@/types"
import QuizBank from "@/types/QuizBank"
import PagedResponse from "@/types/paged-response"
import { HotkeysProvider } from "react-hotkeys-hook"

type Props = {
  initialData: PagedResponse<Quiz>
  quizBankData: QuizBank
  id: string
}

function ViewWrapper({ id, initialData, quizBankData }: Props) {
  return (
    <div>
      <HotkeysProvider initiallyActiveScopes={["flashcard"]}>
        <ViewFlashcard
          quizBankData={quizBankData}
          initialData={initialData}
          id={id}
        />
      </HotkeysProvider>
      <ViewQuizzes initialData={initialData} id={id} />
    </div>
  )
}

export default ViewWrapper
