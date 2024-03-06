import { removeAccesstoken, removeRefreshToken, removeUser } from "@/lib/auth"
import { getAbsoluteURL } from "@/lib/utils"
import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  removeAccesstoken()
  removeRefreshToken()
  removeUser()
  revalidatePath("/")
  const res = NextResponse.redirect(getAbsoluteURL(""))
  return res
}
