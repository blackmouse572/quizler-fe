import createMiddleware from "next-intl/middleware"
import { NextRequest, NextResponse } from "next/server"

import {
  getRefreshToken,
  isAuthenticated,
  setRefreshToken,
  setToken,
} from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"
import { Token } from "@/types/User"

const authPages = ["/login", "/signup"]

const requireAuthPages = ["/as-needed"]

const locales = ["en", "vi"]

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: "en",
  localePrefix: "as-needed",
})

async function refresh(token: string) {
  const URL = getAPIServerURL("/auth/refresh-token")
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  }

  try {
    const response = await fetch(URL, options)
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const response_1 = await response.json()
    return {
      ok: true,
      accessToken: response_1.accessToken,
      refreshToken: response_1.refreshToken,
    }
  } catch (error: any) {
    return {
      ok: false,
      message: error.message,
    }
  }
}

function isRefreshTokenValid(refreshToken: Token): boolean {
  if (!refreshToken || refreshToken.expiredAt < Date.now()) {
    return false
  }
  return true
}

export default async function middleware(req: NextRequest) {
  const requireAuthRegex = RegExp(
    `^(/(${locales.join("|")}))?(${requireAuthPages
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i"
  )

  const authPathnameRegex = RegExp(
    `^(/(${locales.join("|")}))?(${authPages
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i"
  )
  const isRequiredAuthPage = requireAuthRegex.test(req.nextUrl.pathname)
  const isAuthPage = authPathnameRegex.test(req.nextUrl.pathname)
  const isAuth = isAuthenticated(req)

  if (isAuthPage && isAuth) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  if (isRequiredAuthPage) {
    if (!isAuth) {
      return NextResponse.redirect(new URL("/login", req.url))
    }
    const refreshToken = getRefreshToken()

    if (!isRefreshTokenValid(refreshToken)) {
      console.log("refresh token expired  ")
      const { ok, ...data } = await refresh(refreshToken.token)

      if (ok) {
        const { accessToken, refreshToken } = data
        setToken(accessToken)
        setRefreshToken(refreshToken)
        return intlMiddleware(req)
      } else {
        return NextResponse.redirect(new URL("/login", req.url))
      }
    }
    return NextResponse.redirect(new URL("/login", req.url))
  }

  return intlMiddleware(req)
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}
