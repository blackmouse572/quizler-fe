"use server"

import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"
import { User } from "@/types"
import PagedResponse from "@/types/paged-response"
import { revalidatePath, revalidateTag } from "next/cache"

type Props = {
  id: string
}

export default async function banUserAction({ id }: Props) {
  const token = getToken().token
  const option: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: {
      revalidate: 60, // Revalidate every 60 second
    },
  }
  const url = getAPIServerURL(`/accounts/ban/${id}`)
  const res = await fetch(url, option)
    .then(async (res) => {
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message)
      }
      return data
    })
    .then((res: PagedResponse<User>) => {
      revalidatePath("/admin/users")
      revalidateTag("AdminUser")
      return {
        ok: true,
        message: "success",
        data: res,
      }
    })
    .catch((err) => {
      console.error(`[ERROR] banUserAction: `, err.message)
      return {
        ok: false,
        message: err.message,
        data: null,
      }
    })
  return res
}
