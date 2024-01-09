export async function refreshToken(token: string) {
  const res = await fetch(
    "https://api.escuelajs.co/api/v1/auth/refresh-token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    }
  )
  return (await res.json()) as { access_token: string; refresh_token: string }
}
