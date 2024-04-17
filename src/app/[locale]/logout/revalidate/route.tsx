import { revalidatePath, revalidateTag } from "next/cache"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
const schema = z.object({
  path: z.string().optional(),
  tag: z.string().optional(),
})
export async function POST(req: NextRequest) {
  const { body } = req
  const { tag, path } = schema.parse(body)
  if (path) {
    revalidatePath(path)
  }
  if (tag) {
    revalidateTag(tag)
  }

  return NextResponse.json({
    ok: true,
    message: "success",
    data: null,
  })
}
