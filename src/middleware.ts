import { refreshToken as rf } from "@/services/auth.service"
import createMiddleware from "next-intl/middleware"
import { NextRequest, NextResponse } from "next/server"

import {
  getRefreshToken,
  isAuthenticated,
  setAccessToken,
  setRefreshToken,
} from "@/lib/auth"

const publicPages = ["/"]

const authPages = ["/login", "/signup"]

const locales = ["en", "vi"]

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: "en",
  localePrefix: "as-needed",
})

export default async function middleware(req: NextRequest) {
  console.log("URL:", req.url)
  console.log("NEXT URL:", req.nextUrl)

  const publicPathnameRegex = RegExp(
    `^(/(${locales.join("|")}))?(${publicPages
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

  const isProxy = RegExp(`^\/api\/proxy\/.*$`).test(req.nextUrl.pathname)
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname)
  const isAuthPage = authPathnameRegex.test(req.nextUrl.pathname)
  const isAuth = isAuthenticated(req)

  //TODO: This is raw implementation without real server. Need to be verified!
  if (isProxy) {
    const refreshToken = getRefreshToken(req)

    if (!isAuth && refreshToken) {
      //Refresh token
      const { access_token, refresh_token } = await rf(refreshToken)

      if (access_token && refresh_token) {
        setAccessToken(access_token)
        setRefreshToken(refresh_token)
        return NextResponse.redirect(new URL(req.url), {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
      }

      return NextResponse.redirect(new URL("/login", req.url))
    }
  }

  if (isAuthPage && isAuth) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  return intlMiddleware(req)
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
}
