import { getAPIServerURL } from "@/lib/utils"

export const fetchSearchGlobal = async (searchQuery: string) => {
  const URL = getAPIServerURL(`/searchglobal/searchglobal?search=${searchQuery}`)

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
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
