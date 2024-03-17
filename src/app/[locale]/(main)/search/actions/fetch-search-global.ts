import { toURLSeachParams } from "@/lib/query"
import { getAPIServerURL } from "@/lib/utils"
import { Classroom, User } from "@/types"
import QuizBank, { Quiz } from "@/types/QuizBank"
import PagedRequest from "@/types/paged-request"

type SearchGlobalResults = {
  classrooms: Classroom[]
  posts: any[]
  quizzes: Quiz[]
  users: User[]
  quizBanks: QuizBank[]
}

export const fetchSearchGlobal: (
  filter: Partial<PagedRequest>
) => Promise<SearchGlobalResults> = async (filter) => {
  const fitler = toURLSeachParams(filter)

  const URL = getAPIServerURL(`/searchglobal/searchglobal?${fitler.toString()}`)

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }

  return fetch(URL, options)
    .then(async (response) => {
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message)
      }
      return response.json()
    })
    .then((data: SearchGlobalResults) => {
      return data
    })
}
