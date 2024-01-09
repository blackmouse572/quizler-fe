export const getUserProfile = async (token: string) => {
  const res = await fetch("https://api.escuelajs.co/api/v1/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return await res.json()
}
