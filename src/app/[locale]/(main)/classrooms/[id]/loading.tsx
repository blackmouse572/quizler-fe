import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

type Props = {}

function ClassroomLoading({}: Props) {
  return (
    <div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-14 w-2/3" />
        </div>
        <Skeleton className="h-5 rounded-full" />
        <Separator className="h-1 rounded-full [mask-image:radial-gradient(ellipse_at_center,var(--neutral-200)_70%),transparent_0%]" />
      </div>
      <div className="mt-6 space-y-12">
        <Card className="px-8 pt-8">
          <Skeleton className="h-28 w-full" />
          <div className="flex justify-between py-4">
            <div className="flex gap-2">
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-10" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-10" />
            </div>
          </div>
        </Card>
        <div className="space-y-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <Card key={i} className="px-8 pt-8">
              <CardHeader className="flex-row gap-2">
                <Skeleton className="h-12 w-12 rounded-full" />
                <Skeleton className="h-4 w-1/3" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-1/3" />
                  <Skeleton className="h-8 w-3/5" />
                </div>
              </CardContent>

              <CardFooter className="flex justify-between py-4">
                <div className="flex gap-2">
                  <Skeleton className="h-10 w-10" />
                  <Skeleton className="h-10 w-10" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-10 w-10" />
                  <Skeleton className="h-10 w-10" />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ClassroomLoading
