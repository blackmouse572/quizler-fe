import { Skeleton } from "@/components/ui/skeleton"

function LoadingGameList() {
  const renderLoadingItem = () => {
    return <Skeleton className="h-48 w-full bg-white" />
  }
  const renderItem = (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4 ">
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i}>{renderLoadingItem()}</div>
      ))}
    </div>
  )
  return (
    <div>
      <div className="flex items-center justify-between py-5">
        <h1 className="text-lg font-medium">
          <Skeleton className="h-6 w-20" />
        </h1>
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-20" />
        </div>
        {renderItem}
      </div>
    </div>
  )
}

export default LoadingGameList
