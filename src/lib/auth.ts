//Use server only !
import { cookies } from "next/headers"
import { NextRequest } from "next/server"

const TOKEN_KEY = "token"

export function setToken(token: string) {
  cookies().set(TOKEN_KEY, token, {
    path: "/",
    maxAge: 3600, // Expires after 1hr
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  })
}

export function getToken() {
  return cookies().get(TOKEN_KEY)
}

export function removeToken() {
  cookies().delete(TOKEN_KEY)
}

export function isAuthenticated(req?: NextRequest) {
  if (req) {
    return !!req.cookies.get(TOKEN_KEY)
  } else {
    return !!getToken()
  }
}
