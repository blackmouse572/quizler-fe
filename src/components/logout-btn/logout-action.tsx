"use server"

import { removeTokens } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export default async function logoutAction() {
  removeTokens()
  revalidatePath("/")
}
