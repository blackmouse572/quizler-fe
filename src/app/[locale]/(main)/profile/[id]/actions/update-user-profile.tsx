import { getAPIServerURL } from "@/lib/utils"
import { UpdateProfileForm } from "@/types/update-profile-form"

export const updateUserProfile = async (
  id: string,
  token: string,
  values: UpdateProfileForm
) => {
  const URL = getAPIServerURL(`/accounts/${id}`)

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(values),
  }

  return fetch(URL, options)
    .then(async (res) => {
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message)
      }
      return data
    })
    .then((res) => ({
      ok: true,
      message: "success",
      data: res,
    }))
    .catch((err) => {
      return {
        ok: false,
        message: err.message,
        data: null,
      }
    })
}
