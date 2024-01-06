import { NextRequest, NextResponse } from "next/server"
import createMiddleware from "next-intl/middleware"

import { isAuthenticated } from "@/lib/auth"

const publicPages = ["/"]

const authPages = ["/login", "/signup"]

const locales = ["en", "vi"]

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: "en",
  localePrefix: "as-needed",
})

export default function middleware(req: NextRequest) {
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
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname)
  const isAuthPage = authPathnameRegex.test(req.nextUrl.pathname)
  const isAuth = isAuthenticated(req)

  if (isAuthPage && isAuth) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  return intlMiddleware(req)
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}
