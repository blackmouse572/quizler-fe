import Sidebar from "@/app/[locale]/admin/components/sidebar"
import logoutAction from "@/components/logout-btn/logout-action"
import { getUser } from "@/lib/auth"
import _ from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { redirect } from "next/navigation"

async function AdminLayout({ children }: React.PropsWithChildren) {
  const user = getUser()
  const m = await getMessages()
  if (!user.ok || !user.data) notFound()

  return (
    <div className="flex h-screen flex-row bg-neutral-900/95 text-white">
      <div className="relative">
        <NextIntlClientProvider messages={_.pick(m, "AdminSidebar")}>
          <Sidebar user={user} />
        </NextIntlClientProvider>
      </div>
      <div className="m-3 ml-0 max-h-screen flex-1 overflow-y-auto rounded-md bg-neutral-100 px-6 py-4 text-black">
        {children}
      </div>
    </div>
  )
}

export default AdminLayout
