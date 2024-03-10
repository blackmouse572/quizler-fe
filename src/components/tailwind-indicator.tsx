"use client"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { useUser } from "@/hooks/useUser"
import _ from "lodash"

export function TailwindIndicator() {
  const { user } = useUser()
  const { toast } = useToast()
  if (process.env.NODE_ENV === "production") return null
  const copyAccessToken = () => {
    const accessToken = user?.accessToken?.token
    if (accessToken) {
      navigator.clipboard.writeText(accessToken)
      toast({
        title: "Access token copied",
        variant: "light",
        color: "success",
      })
    }
  }
  return (
    <div className="fixed bottom-1 left-1 z-50 min-w-[200px] space-y-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button size="sm">
            Current user data
            <Icons.ChevronRight className="ml-2" />
            <span className="sr-only">User Data</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="font-mono text-xs">
          <pre className="text-wrap border-neutral-200 px-2 py-1.5">
            {JSON.stringify(
              _.omit(user, "accessToken", "refreshToken"),
              null,
              2
            )}
          </pre>
          <Separator className="my-5" />
          <Button size="sm" onClick={copyAccessToken} variant="ghost">
            Copy access token
          </Button>
        </PopoverContent>
      </Popover>
      <div className="flex cursor-default items-center justify-center rounded-full bg-gray-800 px-2 py-1.5 text-center font-mono text-xs text-white opacity-45 transition-all duration-500 ease-out hover:opacity-100">
        <p>Screen:&nbsp;</p>
        <div className="block sm:hidden">xs</div>
        <div className="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
          sm
        </div>
        <div className="hidden md:block lg:hidden xl:hidden 2xl:hidden">md</div>
        <div className="hidden lg:block xl:hidden 2xl:hidden">lg</div>
        <div className="hidden xl:block 2xl:hidden">xl</div>
        <div className="hidden 2xl:block">2xl</div>
      </div>
    </div>
  )
}
