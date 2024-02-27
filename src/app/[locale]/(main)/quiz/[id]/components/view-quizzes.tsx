import { Button } from "@/components/ui/button"
import QuizBank from "@/types/QuizBank"
import { useTranslations } from "next-intl"
import Image from "next/image"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { PiSparkle } from "react-icons/pi";

type Props = {
  data: QuizBank
}

export default function ViewQuizzes({ data }: Props) {
  const i18n = useTranslations("ViewQuizBank")

  return (
    <>
      <div className="z-10 mt-16 flex w-[849px] max-w-full items-start justify-between gap-5 px-5 max-md:mt-10 max-md:flex-wrap">
        <div className="flex-auto self-start text-xl font-bold leading-8 text-black">
          Terms in this bank (&123;total terms&125;)
        </div>
        <div className="mt-5 flex flex-col self-end whitespace-nowrap pb-2 font-medium text-white">
          <div className="mr-3 justify-center self-end rounded-lg bg-red-600 px-1.5 text-center text-xs leading-4 shadow-sm max-md:mr-2.5">
            BETA
          </div>
        </div>
      </div>

      <div className="mt-4 w-[849px] max-w-full rounded-xl border border-solid border-[color:var(--Colors-Neutral-300,#D4D4D4)] bg-white px-6 py-4 shadow-sm max-md:px-5">
        <div className="max-md: flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex w-6/12 flex-col max-md:ml-0 max-md:w-full">
            <div className="border-r-2 border-gray-300 text-base leading-6 text-black max-md:mt-10">
              A plant, such as an iris, that reproduces asexually most of the
              time probably:
              <div>A. is found in a changing environment.</div>
              <div>B. produces offspring that move into new environments.</div>
              <div>C. lacks the ability to make flowers.</div>
              <div>D. forms spores.</div>
              <div>
                E. has offspring that live in the same environment as the
                parents.
              </div>
            </div>
          </div>
          <div className="ml-5 flex w-6/12 flex-col max-md:ml-0 max-md:w-full">
            <div className="text-base leading-6 text-black max-md:mt-10">A</div>
          </div>
          <div className="ml-5">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="light"
                    color={null}
                  >
                    <PiSparkle />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{i18n("ViewQuizzes.view_AI_answer")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>

      <div className="mt-4 w-[849px] max-w-full rounded-xl border border-solid border-[color:var(--Colors-Neutral-300,#D4D4D4)] bg-white px-6 py-4 shadow-sm max-md:px-5">
        <div className="max-md: flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex w-6/12 flex-col max-md:ml-0 max-md:w-full">
            <div className="border-r-2 border-gray-300 text-base leading-6 text-black max-md:mt-10">
              A plant, such as an iris, that reproduces asexually most of the
              time probably:
              <div>A. is found in a changing environment.</div>
              <div>B. produces offspring that move into new environments.</div>
              <div>C. lacks the ability to make flowers.</div>
              <div>D. forms spores.</div>
              <div>
                E. has offspring that live in the same environment as the
                parents.
              </div>
            </div>
          </div>
          <div className="ml-5 flex w-6/12 flex-col max-md:ml-0 max-md:w-full">
            <div className="text-base leading-6 text-black max-md:mt-10">A</div>
          </div>
          <div className="ml-5">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="light"
                    color={null}
                  >
                    <PiSparkle />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{i18n("ViewQuizzes.view_AI_answer")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </>
  )
}
