// app/providers.jsx
"use client"

import { refreshTokenAction } from "@/app/[locale]/(auth)/login/actions/refresh-token-action"
import logoutAction from "@/components/logout-btn/logout-action"
import { useUser } from "@/hooks/useUser"
import { User } from "@/types"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental"
import { usePathname, useRouter } from "next/navigation"
import * as React from "react"
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000,
    },
  },
})
export function Providers(props: {
  children: React.ReactNode
  user: User | undefined
}) {
  const { setUser, user, isAuth, logout } = useUser()
  const router = useRouter()
  const pathName = usePathname()

  React.useEffect(() => {
    if (!props.user) return
    setUser(props.user)
  }, [props, setUser])

  const doLogout = React.useCallback(() => {
    logout()
    logoutAction()
    const from = pathName
    router.push(`/login?from=${from}`)
  }, [logout, pathName, router])

  const doRefreshToken = React.useCallback(async () => {
    // refresh token
    try {
      const res = await refreshTokenAction()
      setUser(res.data!)
    } catch (error) {
      logout()
      logoutAction()
      router.refresh()
      return
    }
  }, [logout, router, setUser])

  React.useEffect(() => {
    console.debug("[DEBUG] Set user from props.")
    if (user) {
      setUser(user)
    }
  }, [user, setUser])

  React.useEffect(() => {
    if (isAuth) {
      if (!user) {
        return doLogout()
      }
      const { accessToken, refreshToken } = user!
      const { expiredAt: axToken } = accessToken
      const { expiredAt: rxToken } = refreshToken

      if (Date.now() < axToken) {
        return
      }

      if (Date.now() > axToken && Date.now() > rxToken) {
        console.debug("[DEBUG] Cannot refresh token, redirect to login page.")
        doLogout()
      } else {
        console.log("[DEBUG] Refresh token...")
        doRefreshToken()
      }
    }
  }, [doLogout, doRefreshToken, isAuth, logout, router, setUser, user])

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        {props.children}
      </ReactQueryStreamedHydration>
    </QueryClientProvider>
  )
}
