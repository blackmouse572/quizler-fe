"use server"

import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"
import { Transaction } from "@/types/transaction-type"

type Props = {
  year: number
}

export default async function getAllTransactionsByYearAction({
  year,
}: Props) {
  const token = getToken().token
  const option: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: {
      revalidate: 1, // Revalidate every 60 second
    },
  }
  const url = getAPIServerURL(`/transaction/getbyyear/${year}`)
  const res = await fetch(url, option)
    .then(async (res) => {
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message)
      }
      return data
    })
    .then((res: Transaction) => {
      return {
        ok: true,
        message: "success",
        data: res,
      }
    })
    .catch((err) => {
      console.error(`[ERROR] getAllTransactionsByYearAction: `, err.message)
      return {
        ok: false,
        message: err.message,
        data: null,
      }
    })
  return res
}
