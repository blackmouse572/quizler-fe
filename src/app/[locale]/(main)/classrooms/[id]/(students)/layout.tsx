import getClassroomDetails from "@/app/[locale]/(main)/classrooms/actions/get-classroom-details-action"
import { getUser } from "@/lib/auth"
import _, { capitalize } from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"
import { NavigationBar } from "./components/navigation-bar"

enum ChildURL {
  members = "members",
  manage = "manage",
}

export default async function Layout({
  children,
  params: { id },
}: {
  params: {
    id: string
  }
  children: React.ReactNode
}) {
  const messages = await getMessages()
  const user = getUser()
  const childURL = ["members", "manage"]
  const routes = childURL.map((url) => ({
    url: `/classrooms/${id}/${url}`,
    name: capitalize(url),
  }))

  const data = await getClassroomDetails(id)
  if (!data.ok) {
    throw Error(data.message)
  }

  if (!data.data || !user || data.data.author.id !== user.id) {
    return notFound()
  }

  return (
    <>
      <NextIntlClientProvider
        messages={_.pick(
          messages,
          "Errors",
          "Classroom_student",
          "Validations",
          "Table",
          "Invite_classroom",
          "ClassroomDetails",
          "Editor",
          "Members_classroom"
        )}
      >
        <NavigationBar routes={routes} />

        {children}
      </NextIntlClientProvider>
    </>
  )
}
