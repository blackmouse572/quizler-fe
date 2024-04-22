import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

function AddClassroomLoadingPage() {
  return (
    <div className="h-screen space-y-2">
      <div className="grid h-72">
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
      <div className="grid h-72 pt-10">
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

export default AddClassroomLoadingPage
