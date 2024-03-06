// app/providers.jsx
"use client"

import { refreshTokenAction } from "@/app/[locale]/(auth)/login/actions/refresh-token-action"
import logoutAction from "@/components/logout-btn/logout-action"
import { useUser } from "@/hooks/useUser"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental"
import { useRouter } from "next/navigation"
import * as React from "react"

export function Providers(props: { children: React.ReactNode }) {
  const { setUser, user, isAuth, logout } = useUser()
  const router = useRouter()
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 1000,
          },
        },
      })
  )

  const doLogout = React.useCallback(() => {
    logout()
    logoutAction()
    router.refresh()
  }, [logout, router])

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
    if (isAuth) {
      const { accessToken, refreshToken } = user!
      const { expiredAt: axToken } = accessToken
      const { expiredAt: rxToken } = refreshToken

      if (Date.now() < axToken) {
        return
      }

      if (Date.now() > axToken && Date.now() > rxToken) {
        doLogout()
      } else {
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
