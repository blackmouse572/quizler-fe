import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { InfoCircledIcon } from "@radix-ui/react-icons"
import { useTranslations } from "next-intl"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getShortName } from "@/lib/string-helper"
import CopyQuizBankDialog from "./copy-quizbank-dialog/copy-quizbank-dialog"
import { use } from "react"
import { getToken } from "@/lib/auth"
import { fetchClassroomCurrentUser } from "@/services/account.service"
import { Classroom } from "@/types"

type Props = {
  authorData: any
  classname?: string
}

export default function AuthorQuizBank({ authorData, classname }: Props) {
  const i18n = useTranslations("ViewQuizBank")
  const {token} = getToken()
  const userCurrentClass: Classroom[]  = use(fetchClassroomCurrentUser(token))

  return (
    <>
      <div className="mt-16 w-[849px] border-b-2 border-gray-300 text-xl font-bold leading-8 text-black max-md:mt-10 max-md:max-w-full" />
      <div className="mt-16 text-xl font-bold leading-8 text-black max-md:mt-10 max-md:max-w-full">
        {i18n("belong_to")}
      </div>
      {classname && (
        <div className="ml-3.5 mt-6 flex w-[874px] max-w-full justify-between gap-5 px-5 font-medium max-md:flex-wrap">
          <div className="flex-auto text-2xl leading-10 text-black">
            {i18n("author.class_title")}:{" "}
            <span className="font-bold">
              {i18n("author.class_title")} Biology {i18n("author.of")}{" "}
              {authorData.fullName}{" "}
            </span>
          </div>
        </div>
      )}

      <div className="ml-3.5 flex w-[874px] max-w-full justify-between gap-5 pr-6 max-md:flex-wrap max-md:pr-5">
        <div className="flex justify-between gap-2 whitespace-nowrap">
          <Avatar>
            <AvatarImage src={authorData?.avatar} alt={authorData?.fullName} />
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
        <div className="flex justify-between gap-2">
          <CopyQuizBankDialog buttonContent={i18n("author.copy_button")} classes={userCurrentClass} />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="light" color={null}>
                <InfoCircledIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{i18n("author.report_button")}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </>
  )
}
