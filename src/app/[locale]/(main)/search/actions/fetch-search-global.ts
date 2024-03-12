import { getAPIServerURL } from "@/lib/utils"

export const fetchSearchGlobal = async (
  searchQuery: string,
  take: string | null,
  skip: string | null
) => {
  var apiUrl = `/searchglobal/searchglobal?search=${searchQuery}`

  if (take) {
    apiUrl += `&take=${take}`
  }
  if (skip) {
    apiUrl += `&skip=${skip}`
  }

  const URL = getAPIServerURL(apiUrl)

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }

  const res = await fetch(URL, options).then(async (response) => {
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message)
    }
    return response.json()
  })

  return res
}
