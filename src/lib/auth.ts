//Use server only !
import { cookies } from "next/headers"
import { NextRequest } from "next/server"

const ACCESS_TOKEN_KEY = "a_token"
const REFRESH_TOKEN_KEY = "r_token"

export function setAccessToken(token: string) {
  cookies().set(ACCESS_TOKEN_KEY, token, {
    maxAge: parseInt(process.env.ACCESS_TOKEN_EXP ?? "3600"), // Expires after 1hr
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  })
}

export function setRefreshToken(token: string, req?: NextRequest) {
  cookies().set(REFRESH_TOKEN_KEY, token, {
    maxAge: parseInt(process.env.REFRESH_TOKEN_EXP ?? "43200"), // Expires after 30 days
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  })
}

export function getAccessToken(req?: NextRequest) {
  if (req) {
    return req.cookies.get(ACCESS_TOKEN_KEY)?.value
  }
  return cookies().get(ACCESS_TOKEN_KEY)?.value
}

export function getRefreshToken(req?: NextRequest) {
  if (req) {
    return req.cookies.get(REFRESH_TOKEN_KEY)?.value
  }
  return cookies().get(REFRESH_TOKEN_KEY)?.value
}

export function getTokens(req?: NextRequest) {
  let accessToken = getAccessToken(req)
  let refreshToken = getRefreshToken(req)

  return {
    accessToken,
    refreshToken,
  }
}

export function removeTokens() {
  cookies().delete(ACCESS_TOKEN_KEY)
  cookies().delete(REFRESH_TOKEN_KEY)
}

export function isAuthenticated(req?: NextRequest) {
  if (req) {
    return !!req.cookies.get(ACCESS_TOKEN_KEY)
  } else {
    return !!getTokens().accessToken
  }
}
