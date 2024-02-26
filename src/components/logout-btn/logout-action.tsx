"use server"

import { removeAccesstoken, removeRefreshToken, removeUser } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export default async function logoutAction() {
  removeAccesstoken()
  removeRefreshToken()
  removeUser()
  revalidatePath("/")
}
