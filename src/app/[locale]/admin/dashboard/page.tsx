import getUserProfileAction from "./actions/get-user-profile"
export const metadata = {
  title: "Dashboard",
  description: "Dashboard page, control your site",
}
async function AdminDashboardPage() {
  const data = await getUserProfileAction()

  return (
    <div className="">
      <article>
        <h3 className="font-heading text-2xl font-bold">Dashboard</h3>
        <h1 className="flex opacity-80">
          Welcome back <span className="animate-wave-hand">👋</span>,{" "}
          <span className="font-semibold opacity-100">{data.data?.fullName}</span>
        </h1>
      </article>
    </div>
  )
}

export default AdminDashboardPage
