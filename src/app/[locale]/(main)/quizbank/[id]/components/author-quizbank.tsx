import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getShortName } from "@/lib/string-helper"
import { Classroom, User } from "@/types"
import { useTranslations } from "next-intl"
import { fetchClassroomCurrentUser } from "../actions/fetch-classroom"
import QuizBankActions from "./quizbank-options"
import { use } from "react"
import Link from "next/link"
import { getToken } from "@/lib/auth"
import { isEmpty } from "lodash"

type Props = {
  authorData: User
  classname?: string
  quizbankId: string
  isOwnQuizBank?: boolean
  quizBankVisibility: "Public" | "Private"
  numberOfQuiz: number
}

export default function AuthorQuizBank({
  authorData,
  classname,
  quizbankId,
  isOwnQuizBank,
  quizBankVisibility,
  numberOfQuiz
}: Props) {
  const i18n = useTranslations("ViewQuizBank")
  const { data: userCurrentClass }: { data: Classroom[] } = use(
    fetchClassroomCurrentUser()
  )
  const { token } = getToken()
  const isGuess = isEmpty(token) 
  
  return (
    <div className="space-y-4">
      <div className=" border-b-2 border-gray-300 text-xl font-bold leading-8 text-black max-md:mt-10 max-md:max-w-full" />
      <div className="mt-16 text-xl font-bold leading-8 text-black max-md:mt-10 max-md:max-w-full">
        {i18n("belong_to")}
      </div>

      <div className="flex max-w-full justify-between gap-5 pr-6 max-md:flex-wrap max-md:pr-5">
        <div className="flex justify-between gap-2 whitespace-nowrap">
          <Link href={`/users/${authorData?.id}`}>
            <Avatar>
              <AvatarImage
                src={authorData?.avatar ?? ""}
                alt={authorData?.fullName}
              />
              <AvatarFallback className="bg-gradient-to-bl ">
                <span className="text-white">
                  {getShortName(authorData.fullName)}
                </span>
              </AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex flex-1 flex-col">
            <Link
              href={`/users/${authorData?.id}`}
              className="text-sm font-medium leading-5 text-zinc-950"
            >
              {authorData.fullName}
            </Link>
            <div className="text-xs leading-4 text-zinc-500">
              {authorData.email}
            </div>
          </div>
        </div>
        <QuizBankActions
          isGuess={isGuess}
          quizbankId={quizbankId}
          quizBankVisibility={quizBankVisibility}
          isOwnQuizBank={isOwnQuizBank}
          userCurrentClass={userCurrentClass}
          numberOfQuiz={numberOfQuiz}
        />
      </div>
    </div>
  )
}
