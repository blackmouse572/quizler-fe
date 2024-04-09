"use server"

import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"
import { Classroom } from "@/types"
import PagedResponse from "@/types/paged-response"
import { revalidatePath, revalidateTag } from "next/cache"

type Props = {
  id: string
}

export default async function deleteClassroomAction({ id }: Props) {
  const token = getToken().token
  const option: RequestInit = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: {
      revalidate: 60, // Revalidate every 60 second
    },
  }
  const url = getAPIServerURL(`/classrooms/${id}`)
  const res = await fetch(url, option)
    .then(async (res) => {
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message)
      }
      return data
    })
    .then((res: PagedResponse<Classroom>) => {
      revalidatePath('/admin/classrooms')
      revalidateTag(`AdminClassrooms`)
      return {
        ok: true,
        message: "success",
        data: res,
      }
    })
    .catch((err) => {
      console.error(`[ERROR] deleteClassroomAction: `, err.message)
      return {
        ok: false,
        message: err.message,
        data: null,
      }
    })
  return res
}
