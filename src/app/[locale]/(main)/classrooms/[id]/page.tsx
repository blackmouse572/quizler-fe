import getAllPostActions from "@/app/[locale]/(main)/classrooms/[id]/actions/get-all-posts-action"
import NewPostForm from "@/app/[locale]/(main)/classrooms/[id]/components/new-post"
import PostList from "@/app/[locale]/(main)/classrooms/[id]/components/post-list"
import getClassroomDetails from "@/app/[locale]/(main)/classrooms/actions/get-classroom-details-action"
import GenerateJoinDialog from "@/app/[locale]/(main)/classrooms/components/generate-join-dialog"
import SendInviteDialog from "@/app/[locale]/(main)/classrooms/components/send-invite-dialog"
import { Separator } from "@/components/ui/separator"
import { polyfill } from "interweave-ssr"
import _ from "lodash"
import { Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

type Props = {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params

  const { data } = await getClassroomDetails(id)
  return {
    title: data?.classname,
    description: data?.description,
  }
}
polyfill()

async function ClassroomDetailsPage({ params }: Props) {
  const { id } = params
  const messages = await getMessages()
  const t = await getTranslations("ClassroomDetails")
  const { ok, data } = await getClassroomDetails(id)
  const { ok: okPosts, data: posts } = await getAllPostActions({
    filter: { take: 10, skip: 0 },
    classroomId: id,
  })
  if (!ok || !okPosts) {
    return notFound()
  }

  return (
    <NextIntlClientProvider
      messages={_.pick(
        messages,
        "Invite_classroom",
        "Errors",
        "Validations",
        "ClassroomDetails",
        "Editor"
      )}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-4xl font-bold">{data?.classname}</h3>
          {data?.isStudentAllowInvite && (
            <div className="space-x-2">
              <GenerateJoinDialog classroomId={id} />
              <SendInviteDialog classroomId={id} />
            </div>
          )}
        </div>
        <p>{data?.studentNumber}</p>
        <Separator className="h-1 rounded-full [mask-image:radial-gradient(ellipse_at_center,var(--neutral-200)_70%),transparent_0%]" />
      </div>
      <div className="mt-6 space-y-12">
        <NewPostForm
          initialValues={{ classroomId: +id, title: "posts.post.index" }}
        />
        <PostList classroomId={id} initialData={posts!} />
      </div>
    </NextIntlClientProvider>
  )
}

export default ClassroomDetailsPage
