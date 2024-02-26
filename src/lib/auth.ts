//Use server only !
import jwt from "jsonwebtoken"
import { Token, User } from "@/types/User"
import { cookies } from "next/headers"
import { NextRequest } from "next/server"

const TOKEN_KEY = {
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  accessTokenExp: "accessTokenExp",
  refreshTokenExp: "refreshTokenExp",
  user: "user",
}
export function setUser(user: User) {
  cookies().set(TOKEN_KEY.user, JSON.stringify(user), {
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 30 days
  })
}

export function getUser(): User {
  return JSON.parse(cookies().get(TOKEN_KEY.user)?.value || "{}")
}

export function removeUser() {
  cookies().delete(TOKEN_KEY.user)
}

export function setToken(token: Token) {
  cookies().set(TOKEN_KEY.accessToken, token.token, {
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 30 days
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  })

  cookies().set(TOKEN_KEY.accessTokenExp, token.expiredAt.toString(), {
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 30 days
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  })
}

export function getToken(): Token {
  return {
    expiredAt: parseInt(cookies().get(TOKEN_KEY.accessTokenExp)?.value || "0"),
    token: cookies().get(TOKEN_KEY.accessToken)?.value || "",
  }
}

export function removeAccesstoken() {
  cookies().delete(TOKEN_KEY.accessToken)
  cookies().delete(TOKEN_KEY.accessTokenExp)
}

export function getRefreshToken(): Token {
  return {
    expiredAt: parseInt(cookies().get(TOKEN_KEY.refreshTokenExp)?.value || "0"),
    token: cookies().get(TOKEN_KEY.refreshToken)?.value || "",
  }
}

export function setRefreshToken(token: Token) {
  cookies().set(TOKEN_KEY.refreshToken, token.token, {
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 30 days
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  })

  cookies().set(TOKEN_KEY.refreshTokenExp, token.expiredAt.toString(), {
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 30 days
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  })
}

export function removeRefreshToken() {
  cookies().delete(TOKEN_KEY.refreshToken)
  cookies().delete(TOKEN_KEY.refreshTokenExp)
}

export function isAuthenticated(req?: NextRequest) {
  if (req) {
    return !!req.cookies.get(TOKEN_KEY.accessToken)
  } else {
    return !!cookies().get(TOKEN_KEY.accessToken)
  }
}
const ISSUER = "Quizlearner"
export function signJWT(secret: string, data: Record<string, any>) {
  const token = jwt.sign(data, secret, {
    expiresIn: "1d",
    issuer: ISSUER,
  })

  return token
}

export function validateJWT(token: string, secret: string) {
  return jwt.verify(token, secret)
}

export function decodeJWT(token: string, secret: string) {
  return jwt.decode(token)
}
