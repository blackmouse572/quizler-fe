import { getAPIServerURL } from "@/lib/utils"

type ChangePasswordSchema = {
  token: string
  values: {
    oldPassword: string
    password: string
  }
}

export const ChangePassword = async ({
  token,
  values,
}: ChangePasswordSchema) => {
  const URL = getAPIServerURL(`/accounts/change-password`)

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
