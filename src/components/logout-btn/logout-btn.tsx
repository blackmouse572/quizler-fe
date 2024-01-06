"use client"

import { useRouter } from "next/navigation"

import { Button, ButtonProps } from "@/components/ui/button"
import logoutAction from "@/components/logout-btn/logout-action"

type Props = ButtonProps

function LogoutButtonClient({}: Props) {
  const router = useRouter()

  function logout() {
    logoutAction().then(() => {
      router.refresh()
    })
  }

  return (
    <Button onClick={logout} color={"danger"}>
      Logout
    </Button>
  )
}

export default LogoutButtonClient
