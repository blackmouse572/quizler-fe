'use server'

import { removeToken } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export default async function logoutAction() {
    removeToken()
    revalidatePath('/')
}