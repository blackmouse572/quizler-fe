import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getShortName } from "@/lib/string-helper"
import { Classroom, User } from "@/types"
import { useTranslations } from "next-intl"
import { use, useCallback, useMemo } from "react"
import { fetchClassroomCurrentUser } from "../actions/fetch-classroom"
import QuizBankActions from "./quizbank-options"

type Props = {
  authorData: User
  classname?: string
  quizbankId: string
  isOwnQuizBank?: boolean
  quizBankVisibility: "Public" | "Private"
}

export default function AuthorQuizBank({
  authorData,
  classname,
  quizbankId,
  isOwnQuizBank,
  quizBankVisibility,
}: Props) {
  const i18n = useTranslations("ViewQuizBank")
  const { data: userCurrentClass }: { data: Classroom[] } = use(
    fetchClassroomCurrentUser()
  )
  return (
    <div className="space-y-4">
      <div className=" border-b-2 border-gray-300 text-xl font-bold leading-8 text-black max-md:mt-10 max-md:max-w-full" />
      <div className="mt-16 text-xl font-bold leading-8 text-black max-md:mt-10 max-md:max-w-full">
        {i18n("belong_to")}
      </div>
      {classname && (
        <div className="ml-3.5 mt-6 flex w-[874px] max-w-full justify-between gap-5 px-5 font-medium max-md:flex-wrap">
          <div className="flex-auto text-2xl leading-10 text-black">
            {i18n("author.class_title")}:{" "}
            <span className="font-bold">
              {i18n("author.class_title")} Biology {i18n("author.of")}{" "}
              {authorData.fullName}
            </span>
          </div>
        </div>
      )}

      <div className="flex max-w-full justify-between gap-5 pr-6 max-md:flex-wrap max-md:pr-5">
        <div className="flex justify-between gap-2 whitespace-nowrap">
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
          <div className="flex flex-1 flex-col">
            <div className="text-sm font-medium leading-5 text-zinc-950">
              {authorData.fullName}
            </div>
            <div className="text-xs leading-4 text-zinc-500">
              {authorData.email}
            </div>
          </div>
        </div>
        <QuizBankActions
          quizbankId={quizbankId}
          quizBankVisibility={quizBankVisibility}
          isOwnQuizBank={isOwnQuizBank}
          userCurrentClass={userCurrentClass}
        />
      </div>
    </div>
  )
}
