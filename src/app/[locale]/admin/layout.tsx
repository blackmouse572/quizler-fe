import Sidebar from "@/app/[locale]/admin/components/sidebar"

function AdminLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-row bg-neutral-900/95 text-white">
      <div className="relative">
        <Sidebar />
      </div>
      <div className="m-3 ml-0 flex-1 rounded-md bg-background px-6 py-4 text-black">
        {children}
      </div>
    </div>
  )
}

export default AdminLayout
