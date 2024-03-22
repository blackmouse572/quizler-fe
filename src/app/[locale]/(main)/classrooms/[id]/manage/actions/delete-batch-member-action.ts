"use server"

import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"
import { revalidateTag } from "next/cache"

type Props = {
  classroomId: string
  memberIds: {
    memberIds: string[]
  }
}

export async function deleteBatchMemberAction({
  classroomId,
  memberIds,
}: Props) {
  const url = getAPIServerURL(`/classrooms/batchremovemember/${classroomId}`)
  const { token } = getToken()
  const options: RequestInit = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(memberIds)
  }

  return fetch(url, options)
    .then(async (res) => {
      if (!res.ok) {
        const json = await res.json()
        throw new Error(json.message)
      }
      return true
    })
    .then((data) => {
      revalidateTag(`classroom_management`)
      return {
        ok: true,
        message: "success",
        data: data,
      }
    })
    .catch((error) => {
      return {
        ok: false,
        message: error.message,
        data: null,
      }
    })
}
