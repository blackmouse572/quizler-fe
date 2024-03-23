import getAllPostActions from "@/app/[locale]/(main)/classrooms/[id]/actions/get-all-posts-action"
import NewPostForm from "@/app/[locale]/(main)/classrooms/[id]/components/new-post"
import PostList from "@/app/[locale]/(main)/classrooms/[id]/components/post-list"
import getClassroomDetails from "@/app/[locale]/(main)/classrooms/actions/get-classroom-details-action"
import { polyfill } from "interweave-ssr"
import _ from "lodash"
import { Metadata } from "next"
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
  const {id} = params
  const { ok: okPosts, data: posts } = await getAllPostActions({
    filter: { take: 10, skip: 0 },
    classroomId: id,
  })
  if (!okPosts) {
    return notFound()
  }

  return (
    <div  className="mt-6 space-y-12">
      <NewPostForm
        initialValues={{ classroomId: +id, title: "posts.post.index" }}
      />
      <PostList classroomId={id} initialData={posts!} />
    </div>
  )
}

export default ClassroomDetailsPage
