import _, { capitalize } from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
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

  const childURL = ['members', 'manage']
  const routes = childURL.map(url => ({url: `/classrooms/${id}/${url}`, name: capitalize(url)}))

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
