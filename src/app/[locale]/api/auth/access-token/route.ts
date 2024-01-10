import { getTokens } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const { accessToken, refreshToken } = getTokens(req)
  if (!accessToken) {
    return NextResponse.json(
      {
        ok: false,
      },
      {
        status: 404,
      }
    )
  }

  return NextResponse.json({
    ok: true,
    data: {
      accessToken,
      refreshToken,
    },
  })
}
