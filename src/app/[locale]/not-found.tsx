import { Input } from "@/components/ui/input"

export default function NotFound() {
  return (
    <div className="flex h-screen w-screen flex-row items-center justify-center text-center">
      <div className="flex flex-col space-y-11">
        <h2 className="text-4xl font-extrabold">You seem lost?</h2>
        <p className="font-medium">The page you seeks seem like terminated or not existed 😎😎</p>
        {/* <Link href="/">Return Home</Link> */}
        <Input placeholder="New quiz"/>
      </div>
    </div>
  )
}
