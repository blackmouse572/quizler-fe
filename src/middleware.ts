import createMiddleware from "next-intl/middleware"
import { NextRequest, NextResponse } from "next/server"

import { refreshTokenAction } from "@/app/[locale]/(auth)/login/actions/refresh-token-action"
import { getRefreshToken, getToken, isAuthenticated } from "@/lib/auth"
import { Token } from "@/types/User"

const authPages = ["/login", "/signup"]

const requireAuthPages = ["/logout"]

const locales = ["en", "vi"]

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: "en",
  localePrefix: "as-needed",
})

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

  if (isRequiredAuthPage && isAuth) {
    return intlMiddleware(req)
  }

  if (isAuth) {
    const refreshToken = getRefreshToken(req)
    const accessToken = getToken(req)

    if (accessToken.token === "0" || accessToken.expiredAt < Date.now()) {
      console.log("[TOKEN] access token expired or invalid")
      // do refresh
      if (!isRefreshTokenValid(refreshToken)) {
        const { ok } = await refreshTokenAction()

        if (ok) {
          console.log("[TOKEN] refreshed token")
          return intlMiddleware(req)
        } else {
          console.log("[TOKEN] refresh token expired or invalid, logging out")
          return NextResponse.redirect(new URL("/logout", req.url))
        }
      }
      console.log("[TOKEN] can not refresh token, logging out")
      return NextResponse.redirect(new URL("/logout", req.url))
    }
  }

  return intlMiddleware(req)
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}
