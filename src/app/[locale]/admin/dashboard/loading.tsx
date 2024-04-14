import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"
import { Skeleton } from "@/components/ui/skeleton"

function AdminDashboardLoadingPage() {
  return (
    <div className="h-screen space-y-2">
      <div className="grid grid-cols-2 gap-3 font-semibold text-black max-md:flex-wrap max-md:px-5 lg:grid-cols-4 lg:gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card className="transition-colors hover:bg-accent" key={index}>
            <CardHeader>
              <CardDescription className="flex items-center justify-between">
                <Skeleton className="h-5 w-20" />
                <Icons.ChevronRight />
              </CardDescription>
              <CardTitle className="">
                <Skeleton className="h-8 w-full" />
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
      <div className="grid h-72 grid-cols-1 gap-0 md:gap-5 lg:grid-cols-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-8 w-full" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="h-5 w-full" />
            </CardDescription>
          </CardHeader>
          <CardContent className="">
            <Skeleton className="mx-auto h-48 w-48 rounded-full" />
          </CardContent>
          <CardFooter className="space-x-5">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
          </CardFooter>
        </Card>
        <Card className="h-full">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-8 w-full" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Skeleton className="h-5 w-full" />
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default AdminDashboardLoadingPage
