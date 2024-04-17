import { Skeleton } from "@/components/ui/skeleton"

const renderLoading = (length?: number) => {
  return Array.from({ length: length ?? 5 }).map((_, index) => (
    <Skeleton key={index} className="h-40 w-full rounded-md" />
  ))
}

function CategorySearchLoadingPage() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
      {renderLoading()}
    </div>
  )
}

export default CategorySearchLoadingPage
