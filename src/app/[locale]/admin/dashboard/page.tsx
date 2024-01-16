import { getTokens } from "@/lib/auth"
import { getUserProfile } from "@/services/account.service"
import { notFound } from "next/navigation"
export const metadata = {
  title: "Dashboard",
  description: "Dashboard page, control your site",
}
async function AdminDashboardPage() {
  const token = getTokens()
  if (!token.accessToken) {
    return notFound()
  }
  const user = await getUserProfile(token.accessToken)
  return (
    <div className="">
      <article>
        <h3 className="font-heading text-2xl font-bold">Dashboard</h3>
        <h1 className="flex opacity-80">
          Welcome back <span className="animate-wave-hand">👋</span>,{" "}
          <span className="font-semibold opacity-100">{user.name}</span>
        </h1>
      </article>
    </div>
  )
}

export default AdminDashboardPage
