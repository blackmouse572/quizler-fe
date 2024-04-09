"use server"

import { removeAccesstoken, removeRefreshToken, removeUser } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export default async function logoutAction() {
  removeAccesstoken()
  removeRefreshToken()
  removeUser()
  revalidatePath("/")

  return
}
